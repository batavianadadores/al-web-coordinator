import { Table } from "antd";
import Decimal from "decimal.js";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";

import { isUndefinedOrNull } from "entities/validators";
import useCognitoSession from "@hooks/useCognitoSession";
import { ReportFilterSelectedValues } from "./filter-report";
import { useLazyGetReportQuery } from "@features/survey/survey-api.slice";
import { wrapTryCatchOverAPICallWithReturn } from "@components/utils/component.util";
import { SurveyGetReportResults } from "entities/survey/survey/survey-get-report-response.dto";

type SurveyReportProps = {
    selectedValues: ReportFilterSelectedValues;
};

const SurveyReport: React.FC<SurveyReportProps> = ({ selectedValues }) => {
    //#region Fields and Properties

    const { updateTokenCallback } = useCognitoSession();
    const [getReportTrigger, getReportResult] = useLazyGetReportQuery();
    const columns = [
        {
            title: "Hora",
            dataIndex: "hour",
            key: "hour",
            width: "150px",
        },
        {
            title: "Lunes",
            dataIndex: "1",
            key: "1",
        },
        {
            title: "Martes",
            dataIndex: "2",
            key: "2",
        },
        {
            title: "Miércoles",
            dataIndex: "3",
            key: "3",
        },
        {
            title: "Jueves",
            dataIndex: "4",
            key: "4",
        },
        {
            title: "Viernes",
            dataIndex: "5",
            key: "5",
        },
        {
            title: "Sábado",
            dataIndex: "6",
            key: "6",
        },
        {
            title: "Domingo",
            dataIndex: "7",
            key: "7",
        },
    ];
    const [data, setData] = useState<any[]>([]);
    //#endregion

    //#region Effects

    useEffect(() => {
        if (
            isUndefinedOrNull(selectedValues.interval) ||
            isUndefinedOrNull(selectedValues.interval[0]) ||
            isUndefinedOrNull(selectedValues.interval[1]) ||
            isUndefinedOrNull(selectedValues.poolId)
        ) {
            return;
        }

        const from = selectedValues.interval[0].toISOString();
        const to = selectedValues.interval[1].toISOString();
        const poolId = selectedValues.poolId!;
        const questionId = selectedValues.questionId;
        getReportAPI(from, to, poolId, questionId);
    }, [selectedValues]);

    useEffect(() => {
        if (
            isUndefinedOrNull(getReportResult) ||
            isUndefinedOrNull(getReportResult.data)
        ) {
            return;
        }

        const resultsData = getReportResult.data;
        if (isUndefinedOrNull(resultsData)) {
            setData([]);
            return;
        }

        const survey = resultsData!.survey;
        const pools = resultsData!.pools;
        const questions = resultsData!.questions;
        const results = resultsData!.results;

        if (isUndefinedOrNull(results)) {
            setData([]);
            return;
        }

        const hoursSet = new Set<string>();
        const daySet = new Set<string>();
        const dataSource: {
            [key: string]: { [key: string]: SurveyGetReportResults[] };
        } = {};

        for (const result of results) {
            const time = DateTime.fromISO(result.time);

            const hourKey = time.set({ year: 2000, month: 1, day: 1 }).toISO();
            hoursSet.add(hourKey);

            const dayKey = time.get("weekday").toString();
            daySet.add(dayKey);

            if (isUndefinedOrNull(dataSource[hourKey])) {
                dataSource[hourKey] = {};
            }
            if (isUndefinedOrNull(dataSource[hourKey][dayKey])) {
                dataSource[hourKey][dayKey] = [];
            }
            dataSource[hourKey][dayKey].push(result);
        }
        const uniqueHours = Array.from(hoursSet).sort();
        const uniqueDays = Array.from(daySet).sort();

        const rows = [];
        const totalRow: { [key: string]: any } = {
            key: "total",
            hour: "Total",
        };
        const totalCountRow: { [key: string]: any } = {
            key: "totalCount",
            hour: "Total encuestas",
        };
        for (const hour of uniqueHours) {
            const row: { [key: string]: any } = {};
            row["hour"] = DateTime.fromISO(hour).toFormat("HH:mm");
            row["key"] = hour;
            for (const day of uniqueDays) {
                const total = dataSource[hour][day]?.reduce(
                    (prev, curr) => prev + Number(curr.total),
                    0
                );
                const totalCount = dataSource[hour][day]?.reduce(
                    (prev, curr) => prev + Number(curr.totalCount),
                    0
                );
                if (
                    !isUndefinedOrNull(total) &&
                    !isUndefinedOrNull(totalCount)
                ) {
                    if (!isUndefinedOrNull(totalRow[day])) {
                        totalRow[day] = new Decimal(totalRow[day])
                            .plus(total)
                            .toFixed(2);
                    } else {
                        totalRow[day] = new Decimal(total);
                    }

                    if (!isUndefinedOrNull(totalCountRow[day])) {
                        totalCountRow[day] =
                            Number(totalCountRow[day]) + Number(totalCount);
                    } else {
                        totalCountRow[day] = Number(totalCount);
                    }

                    row[day] = new Decimal(total)
                        .dividedBy(totalCount)
                        .toFixed(2);
                    continue;
                }
                row[day] = "-";
            }
            rows.push(row);
        }
        rows.push(totalRow);
        rows.push(totalCountRow);
        for (const day of uniqueDays) {
            const total = totalRow[day];
            const totalCount = totalCountRow[day];
            totalRow[day] = new Decimal(total).dividedBy(totalCount).toFixed(2);
            totalCountRow[day] = new Decimal(totalCount)
                .dividedBy(questions.length)
                .toString();
        }

        setData(rows);
    }, [getReportResult]);
    //#endregion

    //#region API calls
    const getReportAPI = (
        from: string,
        to: string,
        poolId: number,
        questionId?: number
    ) => {
        wrapTryCatchOverAPICallWithReturn(async () => {
            await updateTokenCallback();
            const result = await getReportTrigger({
                from,
                to,
                poolId,
                questionId: questionId as any,
            }).unwrap();
            return result;
        });
    };
    //#endregion
    return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default SurveyReport;
