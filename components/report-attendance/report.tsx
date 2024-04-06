import { Space, Table } from "antd";
import Decimal from "decimal.js";
import { DateTime } from "luxon";
import { ColumnType } from "antd/lib/table";
import React, { useEffect, useState } from "react";

import { isUndefinedOrNull } from "entities/validators";
import useCognitoSession from "@hooks/useCognitoSession";
import { useLazyListAttedanceQuery } from "@features/attedance/attedance-api.slice";
import { wrapTryCatchOverAPICallWithReturn } from "@components/utils/component.util";
import { AttendanceListResponse } from "entities/club/attendance/attendance-list-response.dto";

type AttedanceReportProps = {
    poolId: number;
    startDate: string;
    endDate: string;
    isPReTeam?: boolean;
};

type TableValue = {
    key: string;
    studentFullname: string;
    percentageAttendace: string;
    [key: string]: any;
};
const ATTENDANCE_THRESHOLD = 80;
const DAYS_TO_ATTENDANCE = 3;

const AttedanceReport: React.FC<AttedanceReportProps> = ({
    poolId,
    startDate,
    endDate,
    isPReTeam = false,
}) => {
    //#region Fields and Properties
    const { updateTokenCallback } = useCognitoSession();
    const [getReportTrigger, getReportResult] = useLazyListAttedanceQuery();
    const [columns, setColums] = useState<ColumnType<TableValue>[]>([]);
    const [data, setData] = useState<TableValue[]>([]);
    const [scroll, setScroll] = useState<{ x: string }>({ x: "100vw" });
    const [noCountDays, setNoCountDays] = useState<{ [key: string]: number }>(
        {}
    );
    //#endregion

    //#region Effects

    useEffect(() => {
        if (
            isUndefinedOrNull(startDate) ||
            isUndefinedOrNull(endDate) ||
            isUndefinedOrNull(poolId)
        ) {
            return;
        }

        getReportAPI(startDate, endDate, poolId);
    }, [poolId, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (
            isUndefinedOrNull(getReportResult) ||
            isUndefinedOrNull(getReportResult.data)
        ) {
            return;
        }

        const resultsData = getReportResult.data;
        const items = resultsData!.items;

        if (isUndefinedOrNull(items)) {
            setColums([]);
            setData([]);
            return;
        }

        const studentIdsSet: { [key: string]: string } = {};
        const daySet: { [key: string]: number } = {};
        const dataSource: {
            [key: string]: { [key: string]: AttendanceListResponse[] };
        } = {};

        for (const result of items) {
            const studentId = result.studentId;

            const studentIdKey = studentId;
            studentIdsSet[studentIdKey] = result.fullName;

            const dayKey = DateTime.fromISO(result.createdAt)
                .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                .toISO();
            if (isUndefinedOrNull(daySet[dayKey])) {
                daySet[dayKey] = 0;
            }
            daySet[dayKey]++;

            if (isUndefinedOrNull(dataSource[studentIdKey])) {
                dataSource[studentIdKey] = {};
            }
            if (isUndefinedOrNull(dataSource[studentIdKey][dayKey])) {
                dataSource[studentIdKey][dayKey] = [];
            }
            dataSource[studentIdKey][dayKey].push(result);
        }
        const uniqueStudentIds = Object.keys(studentIdsSet);
        const uniqueDays = Object.keys(daySet);

        const rows = [];
        for (const studentId of uniqueStudentIds) {
            const row: TableValue = {
                key: studentId.toString(),
                studentFullname: studentIdsSet[studentId],
                percentageAttendace: "",
            };
            let attendedDays = 0;
            for (const day of uniqueDays) {
                const isAttended =
                    (dataSource[studentId][day]?.length ?? 0) > 0;
                if (isAttended && daySet[day] >= DAYS_TO_ATTENDANCE) {
                    attendedDays++;
                }
                row[day] = { value: isAttended };
            }
            const totalDays = uniqueDays.length;
            const noCountDays = uniqueDays.filter(
                (day) => daySet[day] < DAYS_TO_ATTENDANCE
            ).length;
            const attendancePercentage = new Decimal(attendedDays)
                .dividedBy(totalDays - noCountDays)
                .times(100)
                .toFixed(2);
            row.percentageAttendace = attendancePercentage;
            rows.push(row);
        }

        const columns: ColumnType<TableValue>[] = uniqueDays.map((day) => {
            const dayDate = DateTime.fromISO(day);
            return {
                title: dayDate.toFormat("ccc dd"),
                dataIndex: day,
                key: day,
                render: (value, record, index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <span>{value.value ? "✅" : "❌"}</span>
                        </div>
                    );
                },
            };
        });
        columns.splice(0, 0, {
            title: "Alumno",
            dataIndex: "studentFullname",
            key: "studentFullname",
            width: 150,
            fixed: "left",
        });
        columns.splice(1, 0, {
            title: "%",
            dataIndex: "percentageAttendace",
            key: "percentageAttendace",
            width: 100,
            fixed: "left",
            render: (value, record, index) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <span>{`${value}%`}</span>
                    </div>
                );
            },
        });

        setNoCountDays(daySet);
        setScroll({ x: `${columns.length * 85}px` });
        setColums(columns);
        setData(rows);
    }, [getReportResult]);
    //#endregion

    //#region API calls
    const getReportAPI = (
        startDate: string,
        endDate: string,
        poolId: number
    ) => {
        wrapTryCatchOverAPICallWithReturn(async () => {
            await updateTokenCallback();
            const result = await getReportTrigger({
                startDate,
                endDate,
                poolId,
                isPreTeam: isPReTeam,
            }).unwrap();
            return result;
        });
    };
    //#endregion
    return (
        <div style={{ display: "block", width: "100%" }}>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={scroll}
                onRow={(record, rowIndex) => {
                    const passThreshold =
                        new Decimal(record.percentageAttendace).comparedTo(
                            ATTENDANCE_THRESHOLD
                        ) > 0;

                    if (passThreshold) {
                        return {
                            style: { backgroundColor: "#d4edda" },
                        };
                    } else {
                        return {
                            style: { backgroundColor: "#f8d7da" },
                        };
                    }
                }}
            />
            <Space style={{ marginTop: "10px" }}>
                <span>
                    <b>Días no tomados en cuenta</b>
                </span>
                {Object.keys(noCountDays)
                    .filter((day) => noCountDays[day] < DAYS_TO_ATTENDANCE)
                    .map((day) => {
                        return (
                            <span key={day}>
                                {DateTime.fromISO(day).toFormat("ccc dd yyyy")}
                            </span>
                        );
                    })}
            </Space>
        </div>
    );
};

export default AttedanceReport;
