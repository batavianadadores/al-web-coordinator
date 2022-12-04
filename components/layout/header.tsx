//import "antd/dist/antd.css";
import styles from "./header.module.css";

import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Layout, Typography, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;
// rgb(46, 196, 245)
const ALHeader = () => {
    const { signOut } = useAuthenticator((context) => [context.user]);

    return (
        <Header
            style={{ padding: "0 1.6rem", background: "rgb(46, 196, 245)" }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <Dropdown
                    overlay={
                        <Menu
                            onClick={() => {
                                signOut();
                            }}
                        >
                            <Menu.Item key={"1"}>
                                <a>Cerrar Sesión</a>
                            </Menu.Item>
                        </Menu>
                    }
                    trigger={["click"]}
                >
                    <UserOutlined
                        style={{ color: "#FFFFFF", fontSize: "2.2rem" }}
                    />
                </Dropdown>
            </div>
        </Header>
    );
};

export default ALHeader;
