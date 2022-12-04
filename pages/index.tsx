import styles from "./index.module.css";
import React from "react";
import { ComponentWithAuth } from "@components/auth/utils";
import { Layout, Typography } from "antd";
import { DateTime } from "luxon";

const { Text } = Typography;
const { Content } = Layout;

type AlHomeProps = {};

const AlHome: ComponentWithAuth<AlHomeProps> = (props: AlHomeProps) => {
    return (
        <Content style={{ margin: "1.6rem" }}>
            <div
                className={styles["site-layout-background"]}
                style={{ padding: 24, minHeight: 360 }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "1rem",
                    }}
                >
                    <Text style={{ color: "#cccccc" }}>
                        &copy; Batavia Nadadores{" "}
                        {DateTime.now().toFormat("yyyy")}
                    </Text>
                </div>
            </div>
        </Content>
    );
};

AlHome.auth = {
    role: ["coordinator", "seller", "admin"],
    unauthorized: "/auth/unauthorized",
    removeLayout: false,
};

export default AlHome;
