import type { Dayjs } from "dayjs";
import type { DatePickerProps } from "antd";
import React, { useEffect, useState } from "react";
import { Button, DatePicker, Select, Typography } from "antd";

import { LevelModel } from "@lib/student/level.model";
import { LevelFields, Level } from "@lib/student/student";
import { PoolModel } from "@lib/pool/model/pool.model";
import useCognitoSession from "@hooks/useCognitoSession";
import { PoolController } from "@lib/pool/pool.controller";
import { CourseController } from "@lib/course/course.controller";
import { executeDataAsync } from "@components/utils/component.util";

const { Text } = Typography;

type AlScheduleCapacityFilterProps = {
    onChange: (pool: PoolModel, from: string, to: string) => void;
    onLevelsChange: (levels: LevelModel[]) => void;
};

const AlScheduleCapacityFilter: React.FC<AlScheduleCapacityFilterProps> = ({
    onChange,
    onLevelsChange,
}) => {
    const { getIdTokenCallback, user } = useCognitoSession();

    const poolController = new PoolController(
        process.env.NEXT_PUBLIC_API_URL_BASE ?? ""
    );

    const [isLoading, setIsLoading] = useState(false);
    const [pools, setPools] = useState<PoolModel[]>([]);
    const [levels, setLevels] = useState<LevelModel[]>([]);
    const [selectedPool, setSelectedPool] = useState<PoolModel>();
    const [selectedLevels, setSelectedLevels] = useState<LevelModel[]>();
    const [selectedEndOfWeek, setSelectedEndOfWeek] = useState<Dayjs | null>();

    /// Listing
    useEffect(() => {
        listData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const poolId = Number(user.attributes?.["custom:pool_id"]);
        const pool = pools.find((e) => e.poolId === poolId);
        setSelectedPool(pool);

        notifyChange(pool, selectedEndOfWeek as Dayjs);
    }, [user, pools]); // eslint-disable-line react-hooks/exhaustive-deps

    const listData = async () => {
        executeDataAsync(async () => {
            const poolsPromise = poolController.list();
            const levels = LevelFields.all.map((field) => ({
                level: (LevelFields as any)[field]["value"],
                description: (LevelFields as any)[field]["description"],
            }));

            const [pools] = await Promise.all([poolsPromise]);

            setPools(pools);
            setLevels(levels);
        }, setIsLoading);
    };

    const handleOnLevelsChange = (changedLevels: Level[]) => {
        const selected = levels.filter((e) => changedLevels.includes(e.level));
        setSelectedLevels(selected);
    };

    const handleOnFilterClic = () => {
        if (selectedLevels && selectedLevels.length > 0) {
            onLevelsChange(selectedLevels);
        }
    };

    const onWeekChange = (value: Dayjs | null, dateString: string) => {
        setSelectedEndOfWeek(value);

        notifyChange(selectedPool, value);
    };

    const notifyChange = (
        pool: PoolModel | undefined,
        endOfWeek: Dayjs | null
    ) => {
        if (pool && endOfWeek) {
            const from = endOfWeek.clone().startOf("week").toISOString();
            const to = endOfWeek.clone().endOf("week").toISOString();
            onChange(pool, from, to);
        }
    };

    const weekFormat = "dddd, DD MMMM";
    const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
        `${value.format("YYYY")}-S${value.format("w")} | ${value
            .startOf("week")
            .format(weekFormat)} al ${value.endOf("week").format(weekFormat)}`;

    return (
        <div style={{ display: "block", width: "100%" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        padding: "0px 20px",
                    }}
                >
                    <Text>Piscina: </Text>
                    <b>{selectedPool?.name}</b>
                </div>
                <div
                    style={{
                        display: "block",
                        width: "100%",
                        padding: "0px 20px",
                    }}
                >
                    <Text>Semana: </Text>
                    <DatePicker
                        value={selectedEndOfWeek}
                        onChange={onWeekChange}
                        picker="week"
                        style={{ width: "100%" }}
                        format={customWeekStartEndFormat}
                    />
                </div>
            </div>
            <div
                style={{
                    display: "block",
                    width: "100%",
                    padding: "0px 20px",
                    marginTop: "10px",
                }}
            ></div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "0px 20px",
                    marginTop: "10px",
                }}
            >
                <div
                    style={{
                        display: "block",
                        width: "100%",
                        padding: "0px 20px 0px 0px",
                    }}
                >
                    <Text>Niveles: </Text>
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Selecciona los cursos"
                        value={selectedLevels?.map((e) => e.level)}
                        onChange={handleOnLevelsChange}
                        loading={isLoading}
                        style={{
                            width: "100%",
                        }}
                        options={levels.map((e) => ({
                            value: e.level,
                            label: e.description,
                        }))}
                    />
                </div>
                <div style={{ display: "flex", alignItems: "end" }}>
                    <Button onClick={handleOnFilterClic}>Filtrar</Button>
                </div>
            </div>
        </div>
    );
};

export default AlScheduleCapacityFilter;
