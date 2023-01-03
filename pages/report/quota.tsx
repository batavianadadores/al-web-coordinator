import React, { useState } from "react";
import { Layout, Typography } from "antd";

import styles from "./quota.module.css";
import { PoolModel } from "@lib/pool/model/pool.model";
import { CourseModel } from "@lib/course/course.model";
import { ComponentWithAuth } from "@components/auth/utils";
import AlScheduleCapacityTable from "@components/report-quota/table";
import AlScheduleCapacityFilter from "@components/report-quota/filter";

const { Content } = Layout;
const { Title } = Typography;

type AlScheduleQuotaProps = {};

const AlScheduleQuota: ComponentWithAuth<AlScheduleQuotaProps> = (props) => {
    const [filter, setFilter] = useState<{
        pool: PoolModel;
        from: string;
        to: string;
    }>();

    const [coursesFilter, setCoursesFilter] = useState<CourseModel[]>([]);

    const handleOnFilterChange = (
        pool: PoolModel,
        from: string,
        to: string
    ) => {
        setFilter({ pool, from, to });
    };

    const handleOnCoursesFilterChange = (courses: CourseModel[]) => {
        setCoursesFilter(courses);
    };

    return (
        <Content style={{ margin: "0 16px" }}>
            <div className={styles["page-header"]}>
                <Title level={3}>Capacidad</Title>
            </div>
            <div className={styles["site-layout-background"]}>
                <Title level={5} style={{ margin: "0" }}>
                    Filtros
                </Title>
                <div className={styles["card-body-container"]}>
                    <AlScheduleCapacityFilter
                        onChange={handleOnFilterChange}
                        onCoursesChange={handleOnCoursesFilterChange}
                    />
                </div>
            </div>
            <div className={styles["site-layout-background"]}>
                <div className={styles["card-body-container"]}>
                    <AlScheduleCapacityTable
                        filter={filter}
                        coursesFilter={coursesFilter}
                    />
                </div>
            </div>
        </Content>
    );
};

AlScheduleQuota.auth = {
    role: ["admin", "seller", "coordinator"],
    unauthorized: "/auth/unauthorized",
    removeLayout: false,
};

export default AlScheduleQuota;
