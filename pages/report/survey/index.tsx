import { DateTime } from "luxon";
import React, { useState } from "react";
import { Typography, Button, Layout } from "antd";
import { ComponentWithAuth } from "@components/auth/utils";

import styles from "./index.module.css";
import moment, { Moment } from "moment";
import SurveyFilter from "@components/survey/filter";
import SurveyResults from "@components/survey/results";
import SurveyReportFilter, {
    ReportFilterSelectedValues,
} from "@components/survey/filter-report";
import SurveyReport from "@components/survey/report";

const { Content } = Layout;
const { Title } = Typography;

type AlReportSurveyResultsProps = {};
const AlReportSurveyResults: ComponentWithAuth<AlReportSurveyResultsProps> = (
    props
) => {
    /// Date interval
    const wholeMonth: [Moment, Moment] = [
        moment(DateTime.now().startOf("month").toISO()),
        moment(DateTime.now().endOf("day").toISO()),
    ];
    const [selectedInterval, setSelectedInterval] =
        useState<[Moment, Moment]>(wholeMonth);

    const [selectedValues, setSelectedValues] =
        useState<ReportFilterSelectedValues>({
            interval: wholeMonth,
        });

    return (
        <Content style={{ margin: "0 16px" }}>
            <div className={styles["page-header"]}>
                <Title level={3}>Encuestas</Title>
                <Button type="primary"></Button>
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
                <SurveyFilter
                    selectedInterval={selectedInterval}
                    onSelectedIntervalChange={setSelectedInterval}
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
                    Resultados
                </Title>
                <SurveyResults interval={selectedInterval} />
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
