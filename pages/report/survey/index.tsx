import dayjs from "dayjs";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import { Typography, Button, Layout } from "antd";
import { ComponentWithAuth } from "@components/auth/utils";

import useCognitoSession from "@hooks/useCognitoSession";
import styles from "./index.module.css";
import SurveyReport from "@components/survey/report";
import SurveyReportFilter, {
    ReportFilterSelectedValues,
} from "@components/survey/filter-report";

const { Content } = Layout;
const { Title } = Typography;

type AlReportSurveyResultsProps = {};
const AlReportSurveyResults: ComponentWithAuth<AlReportSurveyResultsProps> = (
    props
) => {
    const { user } = useCognitoSession();
    const wholeMonth: [dayjs.Dayjs, dayjs.Dayjs] = [
        dayjs(
            DateTime.now()
                .plus({ month: -1 })
                .startOf("month")
                .set({ day: 26 })
                .startOf("day")
                .toISO()
        ),
        dayjs(DateTime.now().endOf("day").toISO()),
    ];

    const [selectedValues, setSelectedValues] =
        useState<ReportFilterSelectedValues>({
            interval: wholeMonth,
        });

    useEffect(() => {
        const poolId = Number(user.attributes?.["custom:pool_id"]);
        setSelectedValues({ ...selectedValues, poolId });
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Content style={{ margin: "0 16px" }}>
            <div className={styles["page-header"]}>
                <Title level={3}>Encuestas</Title>
            </div>
            <div
                className={styles["site-layout-background"]}
                style={{
                    padding: 24,
                    marginBottom: 20,
                }}
            >
                <Title level={5} style={{ margin: "0" }}>
                    Filtros
                </Title>
                <SurveyReportFilter
                    selectedValues={selectedValues}
                    onSelectedValuesChanged={setSelectedValues}
                />
            </div>
            <div
                className={styles["site-layout-background"]}
                style={{
                    padding: 24,
                    marginBottom: 20,
                }}
            >
                <Title level={5} style={{ margin: "10px" }}>
                    Reporte
                </Title>
                <SurveyReport selectedValues={selectedValues} />
            </div>
        </Content>
    );
};

AlReportSurveyResults.auth = {
    role: ["admin", "seller"],
    unauthorized: "/auth/unauthorized",
    removeLayout: false,
};

export default AlReportSurveyResults;
