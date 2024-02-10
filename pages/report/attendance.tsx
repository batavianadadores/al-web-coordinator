import React, { useState } from "react";
import { Layout, Typography } from "antd";

import styles from "./quota.module.css";
import { PoolModel } from "@lib/pool/model/pool.model";
import { ComponentWithAuth } from "@components/auth/utils";
import AlAttendanceFilter from "@components/report-attendance/filter";
import AttedanceReport from "@components/report-attendance/report";

const { Content } = Layout;
const { Title } = Typography;

type AlAttendanceProps = {};

const AlAttedance: ComponentWithAuth<AlAttendanceProps> = (props) => {
    const [filter, setFilter] = useState<{
        pool: PoolModel;
        from: string;
        to: string;
    }>();

    const handleOnFilterChange = (
        pool: PoolModel,
        from: string,
        to: string
    ) => {
        setFilter({ pool, from, to });
    };

    return (
        <Content style={{ margin: "0 16px" }}>
            <div className={styles["page-header"]}>
                <Title level={3}>Asistencia</Title>
            </div>
            <div className={styles["site-layout-background"]}>
                <Title level={5} style={{ margin: "0" }}>
                    Filtros
                </Title>
                <div className={styles["card-body-container"]}>
                    <AlAttendanceFilter onChange={handleOnFilterChange} />
                </div>
            </div>
            <div className={styles["site-layout-background"]}>
                <div className={styles["card-body-container"]}>
                    <AttedanceReport
                        poolId={filter?.pool.poolId!}
                        startDate={filter?.from!}
                        endDate={filter?.to!}
                    />
                </div>
            </div>
        </Content>
    );
};

AlAttedance.auth = {
    role: ["admin", "seller", "coordinator"],
    unauthorized: "/auth/unauthorized",
    removeLayout: false,
};

export default AlAttedance;
