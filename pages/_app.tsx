import "../styles/styles.css";
import { ConfigProvider } from "antd";
import esEs from "antd/lib/locale/es_ES";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

import { Settings } from "luxon";
import { NextComponentType, NextPageContext } from "next";
import { AuthEnabledComponentConfig } from "@components/auth/utils";
import { AppProps } from "next/app";
import AlAuth from "@components/auth/auth";
Settings.defaultLocale = "es";
Settings.defaultZone = "america/lima";

import { Amplify } from "aws-amplify";
import awsExports from "@components/auth/aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

type NextComponentWithAuth = NextComponentType<NextPageContext, any, {}> &
    Partial<AuthEnabledComponentConfig>;

const MyApp: ({}: AppProps) => JSX.Element = ({ Component, pageProps }) => {
    Amplify.configure(awsExports);

    return (
        <Authenticator.Provider>
            <ConfigProvider locale={esEs}>
                {(Component as NextComponentWithAuth).auth ? (
                    <AlAuth auth={(Component as NextComponentWithAuth).auth}>
                        <Component {...pageProps} />
                    </AlAuth>
                ) : (
                    <Component {...pageProps} />
                )}
            </ConfigProvider>
        </Authenticator.Provider>
    );
};

export default MyApp;
