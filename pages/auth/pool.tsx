import styles from "./signin.module.css";
import React, { useEffect, useState } from "react";
import { Form, Spin, Button, Select, Modal } from "antd";
import { useRouter } from "next/router";
import useGeneralData from "@hooks/useGeneralData";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
const { confirm } = Modal;

const AlAuthPool = () => {
    const generalData = useGeneralData();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        setIsLoading(!generalData);
    }, [generalData]);

    const onFinish = (values: any) => {
        if (values.poolId) {
            const pool = generalData.pools.find(
                (e) => e.poolId == values.poolId
            );
            window.localStorage.setItem("poolId", values.poolId);
            window.localStorage.setItem("poolName", pool?.name ?? "");

            const callbackUrl = (router.query["callbackUrl"] as string) ?? "";
            const baseUrl = window.location.origin;
            let redirectUrl = baseUrl;

            if (callbackUrl.startsWith(baseUrl)) {
                redirectUrl = callbackUrl;
            } else if (callbackUrl.startsWith("/")) {
                redirectUrl = new URL(callbackUrl, baseUrl).toString();
            }

            router.push(redirectUrl);
        }
    };

    const showConfirm = (values: any) => {
        if (values.poolId) {
            const pool = generalData.pools.find(
                (e) => e.poolId == values.poolId
            );
            confirm({
                title: `${pool?.name}`,
                icon: <ExclamationCircleOutlined />,
                content: `Estás ingresando a la sede: ${pool?.name}`,
                okText: "Ingresar",
                onOk() {
                    onFinish(values);
                },
                onCancel() {},
            });
        }
    };

    return (
        <Spin spinning={isLoading}>
            <div
                style={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Form
                    name="basic"
                    onFinish={showConfirm}
                    autoComplete="off"
                    layout={"vertical"}
                >
                    <Form.Item
                        label="Sede"
                        name="poolId"
                        rules={[
                            { required: true, message: "Selecciona una sede" },
                        ]}
                    >
                        <Select
                            style={{
                                width: "22rem",
                            }}
                        >
                            {generalData.pools.map((e) => (
                                <Option value={e.poolId} key={e.poolId}>
                                    {e.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: "100%" }}
                        >
                            Elegir
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Spin>
    );
};

export default AlAuthPool;
