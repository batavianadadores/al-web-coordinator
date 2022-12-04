import styles from "./layout.module.css";

import React, { PropsWithChildren } from "react";
import { Layout } from "antd";
import ALLateralMenu from "./lateral-menu";
import ALHeader from "./header";
import ALFooter from "./footer";

const ALLayout: React.FC<PropsWithChildren> = (props) => {
    const { children } = props;
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <ALLateralMenu></ALLateralMenu>
            <Layout className={styles["site-layout"]}>
                <ALHeader />
                {children}
                <ALFooter />
            </Layout>
        </Layout>
    );
};

export default ALLayout;
