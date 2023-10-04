import { DateTime } from "luxon";
import { ColumnsType } from "antd/lib/table";
import { Divider, Table, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { ReloadOutlined } from "@ant-design/icons";

import style from "./table.module.css";
import { LevelFields } from "@lib/student/student";
import { LevelModel } from "@lib/student/level.model";
import { PoolModel } from "@lib/pool/model/pool.model";
import useCognitoSession from "@hooks/useCognitoSession";
import { executeDataAsync } from "@components/utils/component.util";
import { StudentScheduleModel } from "@lib/student-schedule/student-schedule.model";
import { StudentScheduleController } from "@lib/student-schedule/student-schedule.controller";

import {
    CellValueItem,
    DayTableValue,
    HourTableValue,
    TableValues,
} from "./table.entities";
import { CapacityTypes, CapacityTypeDescription } from "@lib/course/course";

const { Title, Text } = Typography;

type AlScheduleCapacityTableProps = {
    filter?: {
        pool: PoolModel;
        from: string;
        to: string;
    };
    levelsFilter: LevelModel[];
};

const AlScheduleCapacityTable: React.FC<AlScheduleCapacityTableProps> = ({
    filter,
    levelsFilter,
}) => {
    const { getIdTokenCallback } = useCognitoSession();

    const ssController = new StudentScheduleController(
        process.env.NEXT_PUBLIC_API_URL_BASE ?? ""
    );

    const [isLoading, setIsLoading] = useState(false);

    const [studentSchedules, setStudentSchedules] = useState<
        StudentScheduleModel[]
    >([]);
    const [levels, setLevels] = useState<LevelModel[]>([]);

    /// Events
    useEffect(() => {
        (async () => {
            const levels = LevelFields.all.map((e) => ({
                level: (LevelFields as any)[e]["value"],
                description: (LevelFields as any)[e]["description"],
            }));
            setLevels(levels);
        })();
    }, []);

    useEffect(() => {
        if (filter) {
            (async () => {
                const items = await listSS(
                    filter.from,
                    filter.to,
                    filter.pool.poolId
                );
                setStudentSchedules(items);
            })();
        }
    }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setDataSource([...dataSource]);
    }, [levelsFilter]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleOnReload = () => {};

    /// Data
    const listSS = async (
        from: string,
        to: string,
        poolId: number
    ): Promise<StudentScheduleModel[]> => {
        return executeDataAsync(
            async (from: string, to: string, poolId: number) => {
                const token = await getIdTokenCallback();

                const items = await ssController.list(token, from, to, poolId);
                return items;
            },
            setIsLoading,
            from,
            to,
            poolId
        );
    };

    /// Columns
    const days: DayTableValue[] = [
        {
            id: 1,
            value: "monday",
            description: "Lunes",
        },
        {
            id: 2,
            value: "tuesday",
            description: "Martes",
        },
        {
            id: 3,
            value: "wednesday",
            description: "Miércoles",
        },
        {
            id: 4,
            value: "thursday",
            description: "Jueves",
        },
        {
            id: 5,
            value: "friday",
            description: "Viernes",
        },
        {
            id: 6,
            value: "saturday",
            description: "Sábado",
        },
        {
            id: 7,
            value: "sunday",
            description: "Domingo",
        },
    ];

    const renderHourCell = (value: any, record: TableValues, index: number) => {
        const _value = value as HourTableValue;
        return (
            <div className={style["cell"]}>
                <Text>{_value.description}</Text>
            </div>
        );
    };

    const renderCell = (value: any, record: TableValues, index: number) => {
        const _value = value as CellValueItem[];

        const quotas: { cellValueItem: CellValueItem[]; total: number }[] = [];
        if (levelsFilter && levelsFilter.length > 0) {
            const levelIds = levelsFilter.map((e) => e.level);
            const items = _value.filter((e) =>
                levelIds.includes(e.level.level)
            );
            const total = items.reduce(
                (pre, cuv, cui) => pre + cuv.ss.length,
                0
            );
            if (total > 0) {
                quotas.push({ cellValueItem: items, total });
            }
        } else {
            const total = _value.reduce(
                (pre, cuv, cui) => pre + cuv.ss.length,
                0
            );
            if (total > 0) {
                quotas.push({ cellValueItem: _value, total });
            }
        }

        return (
            <div className={style["cell"]}>
                {quotas.map((e, i) => (
                    <div key={i} className={style["cell"]}>
                        {e.cellValueItem.map((e) => (
                            <div
                                key={e.level.level}
                                style={{
                                    background: legend.find(
                                        (l) => l.level.level === e.level.level
                                    )?.color,
                                    width: "20%",
                                    textAlign: "center",
                                }}
                            >
                                <div>
                                    <Text
                                        style={{
                                            color: "#FFFFFF",
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        {e.ss.length}
                                    </Text>
                                </div>
                            </div>
                        ))}
                        <Divider style={{ margin: "5px 0px" }} />
                        <Text>{e.total}</Text>
                    </div>
                ))}
            </div>
        );
    };

    const defaultColumns: (ColumnsType<TableValues>[number] & {
        editable?: boolean;
        dataIndex: string;
    })[] = [
        {
            title: (
                <div className={style["cell-header"]}>
                    <Text>Hora</Text>
                </div>
            ),
            dataIndex: "hour",
            key: "hour",
            width: "16%",
            render: renderHourCell,
        },
    ].concat(
        days.map((e) => ({
            title: (
                <div className={style["cell-header"]}>
                    <Text>{e.description}</Text>
                </div>
            ),
            dataIndex: e.value,
            key: e.value,
            editable: true,
            width: "12%",
            render: renderCell,
        }))
    );

    /// Data source
    const [legend, setLegend] = useState<
        { level: LevelModel; color: string }[]
    >([]);
    const [dataSource, setDataSource] = useState<TableValues[]>([]);
    useEffect(() => {
        if (
            !levels ||
            levels.length <= 0 ||
            !studentSchedules ||
            studentSchedules.length <= 0
        ) {
            setDataSource([]);
            setLegend([]);
        }

        const legendLevels = levels;

        const legend = [];
        const colors = [
            "#bdc3c7",
            "#ea5545",
            "#f46a9b",
            "#ef9b20",
            "#edbf33",
            "#ede15b",
            "#bdcf32",
            "#87bc45",
            "#27aeef",
            "#b33dc6",
        ];

        for (let i = 0; i < legendLevels.length; i++) {
            legend.push({
                level: legendLevels[i],
                color: colors[i % colors.length],
            });
        }
        setLegend(legend);

        const uniqueHours = Array.from(
            new Set(studentSchedules?.map((e) => e.initHourString ?? ""))
        )
            .map((e) => {
                const value = DateTime.fromISO(`2000-01-01T${e}`);
                return {
                    id: value.toMillis(),
                    stringValue: e,
                    value,
                    description: value.toFormat("HH:mm"),
                    millis: value.toMillis(),
                };
            })
            .sort((a, b) => a.millis - b.millis);

        const rows: TableValues[] = [];
        const levelsObject = transformArrayToObjectLevels(levels);
        for (const hour of uniqueHours) {
            const row: TableValues = {
                key: hour.millis.toString(),
                hour: hour,
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: [],
            };
            const ssAtHour = studentSchedules.filter(
                (e) => e.initHourString === hour.stringValue
            );

            for (const ss of ssAtHour) {
                switch (ss.initWeekDay) {
                    case 1:
                        fillItem(row.monday, ss, levelsObject);
                        break;
                    case 2:
                        fillItem(row.tuesday, ss, levelsObject);
                        break;
                    case 3:
                        fillItem(row.wednesday, ss, levelsObject);
                        break;
                    case 4:
                        fillItem(row.thursday, ss, levelsObject);
                        break;
                    case 5:
                        fillItem(row.friday, ss, levelsObject);
                        break;
                    case 6:
                        fillItem(row.saturday, ss, levelsObject);
                        break;
                    case 7:
                        fillItem(row.sunday, ss, levelsObject);
                        break;
                }
            }

            for (const day in row) {
                if (day === "key" || day === "hour") {
                    continue;
                }
                if (Object.prototype.hasOwnProperty.call(row, day)) {
                    const element = row[
                        day as keyof TableValues
                    ] as CellValueItem[];
                    sortCell(element);
                }
            }

            rows.push(row);
        }

        setDataSource(rows);
    }, [studentSchedules, levels]);

    const fillItem = (
        day: CellValueItem[],
        ss: StudentScheduleModel,
        levelsObject: { [key: string]: LevelModel }
    ) => {
        const item = day.find((e) => e.level.level === ss.level);
        if (item) {
            item.ss.push(ss);
        } else {
            day.push({
                level: levelsObject[ss.level ?? 0],
                ss: [ss],
            });
        }
    };

    const sortCell = (cell: CellValueItem[]) => {
        cell.sort((a, b) => a.level.level.localeCompare(b.level.level));
    };

    const transformArrayToObjectLevels = (
        levels: LevelModel[]
    ): { [key: string]: LevelModel } => {
        const response: { [key: string]: LevelModel } = {};
        for (const level of levels) {
            response[level.level] = level;
        }
        return response;
    };

    return (
        <div style={{ display: "block", width: "100%" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Title level={5} style={{ margin: "0" }}>
                    Capacidad
                </Title>
                <ReloadOutlined onClick={handleOnReload} />
            </div>
            <Divider />
            <div
                style={{
                    display: "flex",
                    flexFlow: "row wrap",
                    width: "100%",
                }}
            >
                {legend.map((e, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            width: "20%",
                            marginBottom: "5px",
                        }}
                    >
                        <div
                            style={{
                                width: "20px",
                                height: "20px",
                                background: e.color,
                                borderRadius: "2px",
                                marginRight: "2px",
                            }}
                        ></div>
                        <Text>{e.level.description}</Text>
                    </div>
                ))}
            </div>
            <div style={{ margin: "10px 0" }}>
                {CapacityTypes.map((e, i) => (
                    <Text key={i} style={{ padding: "0px 5px" }}>
                        <b>{e}:</b>
                        {
                            CapacityTypeDescription[
                                e as keyof typeof CapacityTypeDescription
                            ]
                        }
                    </Text>
                ))}
            </div>
            <Divider />
            <Table
                loading={isLoading}
                rowClassName={style["editable-row"]}
                columns={defaultColumns as ColumnsType<TableValues>}
                dataSource={dataSource}
                style={{
                    width: "100%",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                }}
                pagination={{
                    hideOnSinglePage: true,
                    pageSize: 50,
                }}
                size="small"
            />
        </div>
    );
};

export default AlScheduleCapacityTable;
