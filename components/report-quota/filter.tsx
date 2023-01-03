import type { Dayjs } from "dayjs";
import type { DatePickerProps } from "antd";
import React, { useEffect, useState } from "react";
import { Button, DatePicker, Select, Typography } from "antd";

import { PoolModel } from "@lib/pool/model/pool.model";
import { CourseModel } from "@lib/course/course.model";
import useCognitoSession from "@hooks/useCognitoSession";
import { PoolController } from "@lib/pool/pool.controller";
import { CourseController } from "@lib/course/course.controller";
import { executeDataAsync } from "@components/utils/component.util";

const { Text } = Typography;

type AlScheduleCapacityFilterProps = {
    onChange: (pool: PoolModel, from: string, to: string) => void;
    onCoursesChange: (courses: CourseModel[]) => void;
};

const AlScheduleCapacityFilter: React.FC<AlScheduleCapacityFilterProps> = ({
    onChange,
    onCoursesChange,
}) => {
    const { getIdTokenCallback } = useCognitoSession();

    const poolController = new PoolController(
        process.env.NEXT_PUBLIC_API_URL_BASE ?? ""
    );

    const courseController = new CourseController(
        process.env.NEXT_PUBLIC_API_URL_BASE ?? ""
    );

    const [isLoading, setIsLoading] = useState(false);
    const [pools, setPools] = useState<PoolModel[]>([]);
    const [courses, setCourses] = useState<CourseModel[]>([]);
    const [selectedPool, setSelectedPool] = useState<PoolModel>();
    const [selectedCourses, setSelectedCourses] = useState<CourseModel[]>();
    const [selectedEndOfWeek, setSelectedEndOfWeek] = useState<Dayjs | null>();

    /// Listing
    useEffect(() => {
        listData();
    }, []);

    const listData = async () => {
        executeDataAsync(async () => {
            const token = await getIdTokenCallback();

            const poolsPromise = poolController.list();
            const coursePromise = courseController.list(token);

            const [pools, courses] = await Promise.all([
                poolsPromise,
                coursePromise,
            ]);

            setPools(pools);
            setCourses(courses);
        }, setIsLoading);
    };

    const handleOnPoolChange = (poolId: number) => {
        const pool = pools.find((e) => e.poolId === poolId);
        setSelectedPool(pool);

        notifyChange(pool, selectedEndOfWeek as Dayjs);
    };

    const handleOnCourseChange = (courseIds: number[]) => {
        const selected = courses.filter((e) => courseIds.includes(e.courseId));
        setSelectedCourses(selected);
    };

    const handleOnFilterClic = () => {
        if (selectedCourses && selectedCourses.length > 0) {
            onCoursesChange(selectedCourses);
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
                        display: "block",
                        width: "100%",
                        padding: "0px 20px",
                    }}
                >
                    <Text>Piscina: </Text>
                    <Select
                        value={selectedPool?.poolId}
                        onChange={handleOnPoolChange}
                        loading={isLoading}
                        style={{
                            width: "100%",
                        }}
                        options={pools.map((e) => ({
                            value: e.poolId,
                            label: e.name,
                        }))}
                    />
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
                    <Text>Cursos: </Text>
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Selecciona los cursos"
                        value={selectedCourses?.map((e) => e.courseId)}
                        onChange={handleOnCourseChange}
                        loading={isLoading}
                        style={{
                            width: "100%",
                        }}
                        options={courses.map((e) => ({
                            value: e.courseId,
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
