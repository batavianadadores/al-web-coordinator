import styles from "./auth.module.css";
import React from "react";
import { AuthConfig } from "./utils";
import ALLayout from "@components/layout/layout";
import Router from "next/router";
import { Typography, Image } from "antd";
//import "antd/dist/antd.css";
import { Authenticator, Flex, useAuthenticator } from "@aws-amplify/ui-react";
import { DateTime } from "luxon";

import { I18n } from "aws-amplify";
import { translations } from "@aws-amplify/ui-react";
I18n.putVocabularies(translations);
I18n.setLanguage("es");
I18n.putVocabularies({
    es: {
        Username: "Nombre de usuario",
        "Username cannot be empty": "Indica un nombre de usuario",
        "Forgot your password?": "¿Olvidaste tu contraseña?",
        "Enter your username": "Nombre de usuario",
        "Send code": "Enviar código",
        "Your passwords must match": "Las contraseñas deben ser iguales",
        "Incorrect username or password.": "Usuario o contraseña incorrecto.",
        "Password does not conform to policy: Password not long enough":
            "La contraseña debe contener al menos 6 caracteres.",
    },
});
const { Text } = Typography;

type AlAuthProps = {
    children: JSX.Element;
    auth?: AuthConfig;
};

const components = {
    Header() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "1rem",
                }}
            >
                <Image
                    src="/img/logo.png"
                    preview={false}
                    width={200}
                    height={85.2}
                ></Image>
            </div>
        );
    },

    Footer() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "1rem",
                }}
            >
                <Text style={{ color: "#cccccc" }}>
                    &copy; Batavia Nadadores {DateTime.now().toFormat("yyyy")}
                </Text>
            </div>
        );
    },

    ResetPassword: {
        Header() {
            return (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ fontSize: "0.95rem" }}>
                        Ingresa tu nombre de usuario, te enviaremos un código de
                        recuperación a tu correo registrado.
                    </Text>
                </div>
            );
        },
    },
    ConfirmResetPassword: {
        Header() {
            return (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ fontSize: "0.95rem" }}>
                        Ingresa el código que te hemos enviado a tu correo
                        registrado.
                    </Text>
                </div>
            );
        },
    },
    ForceNewPassword: {
        FormFields() {
            return (
                <>
                    {/* Re-use default `Authenticator.SignUp.FormFields` */}
                    <Authenticator.ForceNewPassword.FormFields />
                    {/* Append & require Terms & Conditions field to sign up  */}
                    <Text>La clave debe tener al menos 6 digitos</Text>
                </>
            );
        },
    },
};

const AlAuth: React.FC<AlAuthProps> = ({ children, auth }) => {
    const { route, user } = useAuthenticator((context) => [
        context.route,
        context.user,
    ]);

    if (route === "signIn") {
        if (typeof window !== "undefined") {
            window.localStorage.clear();
        }
    }

    if (route === "authenticated") {
        const role = user?.attributes?.["custom:role"] ?? "";
        if ((auth?.role ?? []).includes(role)) {
            if (auth?.removeLayout) {
                return children;
            } else {
                return <ALLayout>{children}</ALLayout>;
            }
        } else {
            Router.push({
                pathname: auth?.unauthorized,
            });
            return <></>;
        }
    } else {
        return (
            <Authenticator
                hideSignUp={true}
                components={components}
                className={styles["authenticator-style"]}
            />
        );
    }
};

export default AlAuth;
