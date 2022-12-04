import styles from "./lateral-menu.module.css";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, Avatar, Layout, Typography } from "antd";
import {
    UserOutlined,
    FileAddOutlined,
    AppstoreOutlined,
    CalendarOutlined,
} from "@ant-design/icons";
//import "antd/dist/antd.css";
import { useRouter } from "next/router";

import useCognitoSession from "@hooks/useCognitoSession";
import { ItemType } from "antd/lib/menu/hooks/useItems";

const { Sider } = Layout;
const { Text } = Typography;

const ALLateralMenu = () => {
    const router = useRouter();
    const [state, setState] = useState({
        collapsed: false,
    });

    const onCollapse = (collapsed: boolean) => {
        setState({ collapsed: collapsed });
    };

    const { user } = useCognitoSession();

    const items: ItemType[] = [
        {
            key: "g3",
            label: "Reportes",
            children: [
                {
                    key: "g3_1",
                    label: <Link href="/report/quota">Cupos de piscina</Link>,
                    icon: <AppstoreOutlined />,
                },
            ],
            type: "group",
        },
        {
            key: "g5",
            label: state.collapsed
                ? ""
                : `Versión ${process.env.NEXT_PUBLIC_VERSION}`,
            children: [],
            type: "group",
        },
    ];

    return (
        <Sider
            collapsible
            collapsed={state.collapsed}
            onCollapse={onCollapse}
            theme="light"
            width="25rem"
        >
            <Avatar
                size={state.collapsed ? 32 : 64}
                style={{ margin: "2.0rem" }}
            >
                {user?.attributes?.name?.charAt(0) ?? "-"}
            </Avatar>
            <Text>{state.collapsed ? "" : user?.attributes?.name ?? "-"}</Text>
            <Menu
                defaultSelectedKeys={[]}
                mode="inline"
                multiple={false}
                items={items}
            />
        </Sider>
    );
};

export default ALLateralMenu;
