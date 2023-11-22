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
import { ColumnType } from "antd/lib/table";
import { LevelFields } from "entities/student/student";

type SurveyReportProps = {
    selectedValues: ReportFilterSelectedValues;
};

type TableValue = {
    key: string;
    hour: string;
    [key: string]: any;
};

const SurveyReport: React.FC<SurveyReportProps> = ({ selectedValues }) => {
    //#region Fields and Properties

    const { updateTokenCallback } = useCognitoSession();
    const [getReportTrigger, getReportResult] = useLazyGetReportQuery();
    const [columns, setColums] = useState<ColumnType<TableValue>[]>([]);
    const [data, setData] = useState<TableValue[]>([]);
    const [scroll, setScroll] = useState<{ x: string }>({ x: "100vw" });
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
    }, [selectedValues]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (
            isUndefinedOrNull(getReportResult) ||
            isUndefinedOrNull(getReportResult.data)
        ) {
            return;
        }

        const resultsData = getReportResult.data;
        const questions = resultsData!.questions;
        const results = resultsData!.results;

        if (isUndefinedOrNull(results)) {
            setColums([]);
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

            const dayKey = time.set({ hour: 0, minute: 0, second: 0 }).toISO();
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
        const totalRow: TableValue = {
            key: "total",
            hour: "Total",
        };
        const totalCountRow: TableValue = {
            key: "totalCount",
            hour: "Total encuestas",
        };
        for (const hour of uniqueHours) {
            const row: TableValue = {
                key: hour,
                hour: DateTime.fromISO(hour).toFormat("HH:mm"),
            };
            for (const day of uniqueDays) {
                const total = dataSource[hour][day]?.reduce(
                    (prev, curr) => prev + Number(curr.total),
                    0
                );
                const totalCount = dataSource[hour][day]?.reduce(
                    (prev, curr) => prev + Number(curr.totalCount),
                    0
                );
                const level = Array.from(
                    new Set(dataSource[hour][day]?.flatMap((e) => e.level))
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

                    row[day] = {
                        value: new Decimal(total)
                            .dividedBy(totalCount)
                            .toFixed(2),
                        level: level,
                    };
                    continue;
                }
                row[day] = { value: "-", level: [] };
            }
            rows.push(row);
        }
        rows.push(totalRow);
        for (const day of uniqueDays) {
            const total = totalRow[day];
            const totalCount = totalCountRow[day];
            totalRow[day] = new Decimal(total).dividedBy(totalCount).toFixed(2);
            totalCountRow[day] = new Decimal(totalCount)
                .dividedBy(questions.length)
                .toString();
        }

        const columns: ColumnType<TableValue>[] = uniqueDays.map((day) => {
            const dayDate = DateTime.fromISO(day);
            return {
                title: dayDate.toFormat("ccc dd"),
                dataIndex: day,
                key: day,
                render: (value, record, index) => {
                    if (typeof value === "string") {
                        return (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <span>{value}</span>
                            </div>
                        );
                    }
                    const levels = value.level.map(
                        (e: keyof typeof LevelFields) =>
                            (LevelFields[e] as any).description
                    );
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <span>{value.value}</span>
                            </div>
                            <div>
                                {levels.map((e: string, i: number) => (
                                    <span
                                        key={i}
                                        style={{
                                            fontSize: "10px",
                                            whiteSpace: "nowrap",
                                            color: "gray",
                                        }}
                                    >
                                        {e}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                },
            };
        });
        columns.splice(0, 0, {
            title: "Hora",
            dataIndex: "hour",
            key: "hour",
            width: 75,
            fixed: "left",
        });

        setScroll({ x: `${columns.length * 85}px` });
        setColums(columns);
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
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={scroll}
        />
    );
};

export default SurveyReport;
