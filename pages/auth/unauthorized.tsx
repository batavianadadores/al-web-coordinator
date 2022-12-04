import React from "react";
import { Result, Button } from "antd";
import { useAuthenticator } from "@aws-amplify/ui-react";

const AlUnauthorized = () => {
    const { user, signOut, route, toSignIn } = useAuthenticator((context) => [
        context.user,
    ]);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                height: "100vh",
                flexDirection: "column",
            }}
        >
            <Result
                status="403"
                title="403"
                subTitle="No estas autorizado para ingresar a esta página."
                extra={
                    <Button
                        type="primary"
                        onClick={async () => {
                            signOut();
                        }}
                    >
                        Cerrar sesión
                    </Button>
                }
            />
        </div>
    );
};

export default AlUnauthorized;
