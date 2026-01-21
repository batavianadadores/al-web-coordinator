import type { Dayjs } from "dayjs";
import type { DatePickerProps } from "antd";
import React, { useEffect, useState } from "react";
import { Button, DatePicker, Select, Typography } from "antd";

import { PERSONALIZED_LEVEL } from "./constans";
import { PoolModel } from "@lib/pool/model/pool.model";
import useCognitoSession from "@hooks/useCognitoSession";
import { PoolController } from "@lib/pool/pool.controller";
import { useStudentLevels } from "@hooks/useStudentLevels";
import { executeDataAsync } from "@components/utils/component.util";
import { StudentLevel } from "@features/student/core/student-level-list-response";

const { Text } = Typography;

type AlScheduleCapacityFilterProps = {
    onChange: (pool: PoolModel, from: string, to: string) => void;
    onLevelsChange: (levels: StudentLevel[]) => void;
};

const AlScheduleCapacityFilter: React.FC<AlScheduleCapacityFilterProps> = ({
    onChange,
    onLevelsChange,
}) => {
    const { user } = useCognitoSession();

    const poolController = new PoolController(
        process.env.NEXT_PUBLIC_API_URL_BASE ?? ""
    );

    const [isLoading, setIsLoading] = useState(false);
    const [pools, setPools] = useState<PoolModel[]>([]);
    const [levels, setLevels] = useState<StudentLevel[]>([]);
    const [selectedPool, setSelectedPool] = useState<PoolModel>();
    const [selectedLevels, setSelectedLevels] = useState<StudentLevel[]>();
    const [selectedEndOfWeek, setSelectedEndOfWeek] = useState<Dayjs | null>();
    const { studentLevels } = useStudentLevels();

    /// Listing
    useEffect(() => {
        listData();
    }, [studentLevels]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const poolId = Number(user.attributes?.["custom:pool_id"]);
        const pool = pools.find((e) => e.poolId === poolId);
        setSelectedPool(pool);

        notifyChange(pool, selectedEndOfWeek as Dayjs);
    }, [user, pools]); // eslint-disable-line react-hooks/exhaustive-deps

    const listData = async () => {
        executeDataAsync(async () => {
            const poolsPromise = poolController.list();
            const levels = [...studentLevels];
            levels.push(PERSONALIZED_LEVEL);

            const [pools] = await Promise.all([poolsPromise]);

            setPools(pools);
            setLevels(levels);
        }, setIsLoading);
    };

    const handleOnLevelsChange = (changedLevels: number[]) => {
        const selected = levels.filter((e) =>
            changedLevels.includes(e.levelId)
        );
        setSelectedLevels(selected);
    };

    const handleOnFilterClic = () => {
        onLevelsChange(selectedLevels as any);
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
                        value={selectedLevels?.map((e) => e.levelId)}
                        onChange={handleOnLevelsChange}
                        loading={isLoading}
                        style={{
                            width: "100%",
                        }}
                        options={levels.map((e) => ({
                            value: e.levelId,
                            label: e.name,
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
