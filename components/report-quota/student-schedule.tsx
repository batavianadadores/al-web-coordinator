import React, { useEffect, useState } from "react";
import DataProvider from "@dataprovider/data-provider";
import APIError from "@dataprovider/api-error";
import useCognitoSession from "@hooks/useCognitoSession";
import { Table, Typography, Tag, message } from "antd";
import { DateTime } from "luxon";
import { ColumnsType } from "antd/lib/table";

interface IAlReportQuotaStudentSchedule {
    poolId?: number;
    courseId?: number;
    datetime?: string;
}

const { Text, Link } = Typography;

type TableValues = {
    name: string;
    schedule: string;
    state: string;
    attendanceTime?: string;
    item: APIQuotaStudentScheduleItemResponse;
};

const AlReportQuotaStudentSchedule: React.FC<IAlReportQuotaStudentSchedule> = (
    props
) => {
    const { poolId, courseId, datetime } = props;
    const columns: ColumnsType<TableValues> = [
        {
            title: "Nombre",
            dataIndex: "name",
            key: "name",
            render: (value, record, index) => {
                return (
                    <Link
                        href={`/student?t=registration&studentId=${record.item.studentId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {value}
                    </Link>
                );
            },
        },
        {
            title: "Horario",
            dataIndex: "schedule",
            key: "schedule",
        },
        {
            title: "Estado",
            dataIndex: "state",
            key: "state",
            render: (tag, record, index) => {
                const state = states.find((e) => e.value === tag);
                let description = state?.description;
                if (state?.value === "pending") {
                    description = "Matriculado";
                } else if (state?.value === "to_recover") {
                    description = "Reprogramado";
                }
                let color = "";
                switch (state?.value) {
                    case "canceled":
                        color = "red";
                        break;
                    case "attended":
                        color = "green";
                        break;
                    case "to_recover":
                        color = "yellow";
                        break;
                    case "missed":
                        color = "red";
                        break;
                    case "pending":
                        color = "yellow";
                        break;
                    case "recovered":
                        color = "green";
                        break;
                }

                return (
                    <Tag color={color} key={index}>
                        {description}
                    </Tag>
                );
            },
        },
        {
            title: "Hora de ingreso",
            dataIndex: "attendanceTime",
            key: "attendanceTime",
        },
    ];
    const { getIdTokenCallback } = useCognitoSession();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<APIQuotaStudentScheduleItemResponse[]>(
        []
    );
    const states = DataProvider.listLessonStates();

    useEffect(() => {
        if (poolId && courseId && datetime) {
            getStudentSchedule();
        }
    }, [poolId, courseId, datetime]);

    const getStudentSchedule = async () => {
        setIsLoading(true);
        try {
            const token = await getIdTokenCallback();
            const result = await DataProvider.listQuotaStudentSchedule(
                poolId!,
                courseId!,
                datetime!,
                token
            );
            setResult(result);
        } catch (error) {
            if (error instanceof APIError) {
                message.error(error.data.userMessage);
            } else {
                message.error(
                    "No pudimos cargar los alumnos. Intenta nuevamente."
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const dataSource: TableValues[] = result.map((e) => {
        const name = `${e.names} ${e.fatherFamilyName} ${e.motherFamilyName}`;
        const _init = DateTime.fromISO(e.init);
        const _end = DateTime.fromISO(e.end);
        const schedule = `${_init.toFormat("hh:mm a")} a ${_end.toFormat(
            "hh:mm a"
        )}`;
        const attendanceTime = e.attendanceTime ?? "-";
        return {
            name,
            schedule,
            state: e.state,
            attendanceTime,
            item: e,
        };
    });

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            loading={isLoading}
            locale={{
                emptyText: "No se encontraron resultados.",
            }}
            pagination={{
                pageSize: 10,
                // hideOnSinglePage: true,
                // total: result.length,
                // showSizeChanger: false,
            }}
        ></Table>
    );
};

export default AlReportQuotaStudentSchedule;
