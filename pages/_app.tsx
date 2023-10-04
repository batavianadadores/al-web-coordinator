import "../styles/styles.css";
import { ConfigProvider } from "antd";
import esEs from "antd/lib/locale/es_ES";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
dayjs.locale("es-mx");

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

import { Provider } from "react-redux";
import { store } from "app/store";

type NextComponentWithAuth = NextComponentType<NextPageContext, any, {}> &
    Partial<AuthEnabledComponentConfig>;

const MyApp: ({}: AppProps) => JSX.Element = ({ Component, pageProps }) => {
    Amplify.configure(awsExports);

    return (
        <Authenticator.Provider>
            <ConfigProvider locale={esEs}>
                <Provider store={store}>
                    {(Component as NextComponentWithAuth).auth ? (
                        <AlAuth
                            auth={(Component as NextComponentWithAuth).auth}
                        >
                            <Component {...pageProps} />
                        </AlAuth>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </Provider>
            </ConfigProvider>
        </Authenticator.Provider>
    );
};

export default MyApp;
