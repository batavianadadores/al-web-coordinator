import styles from "./quota.module.css";
import React, { useState } from "react";
import { ComponentWithAuth } from "@components/auth/utils";
import AlReportQuotaCalendar from "@components/report-quota/calendar";
import AlReportQuotaStudentSchedule from "@components/report-quota/student-schedule";
import { CalendarQuotaItem } from "@components/report-quota/calendar-quota-item";
import useGeneralData from "@hooks/useGeneralData";
import { Layout, Form, Select, Divider } from "antd";
const { Content } = Layout;
const { Option } = Select;

type AlReportQuotaProps = {};

type FormValues = {
    poolId?: number;
    courseId?: number;
};

const AlReportQuota: ComponentWithAuth<AlReportQuotaProps> = (props) => {
    const generalData = useGeneralData();
    const [form] = Form.useForm<FormValues>();
    const [poolId, setPoolId] = useState<number>();
    const [courseId, setCourseId] = useState<number>();

    const handleValuesChange = (
        changedValues: FormValues,
        values: FormValues
    ) => {
        if (changedValues.courseId) {
            setCourseId(changedValues.courseId);
        }
        if (changedValues.poolId) {
            setPoolId(changedValues.poolId);
        }
    };

    const [pickedDays, setPickedDays] = useState<CalendarQuotaItem[]>([]);
    const shouldChangeState = (
        e: CalendarQuotaItem,
        newState: "default" | "selected"
    ): boolean => {
        setPickedDays([e]);
        return false;
    };

    return (
        <Content style={{ margin: "0 16px" }}>
            <div
                className={styles["site-layout-background"]}
                style={{ padding: 24, minHeight: 360 }}
            >
                <Form
                    layout="inline"
                    form={form}
                    onValuesChange={handleValuesChange}
                    scrollToFirstError={true}
                >
                    <Form.Item
                        name="poolId"
                        label="Piscina"
                        rules={[{ required: true }]}
                    >
                        <Select style={{ width: "20rem" }}>
                            {generalData.pools?.map((e) => (
                                <Option value={e.poolId} key={e.poolId}>
                                    {e.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="courseId"
                        label="Curso"
                        rules={[{ required: true }]}
                    >
                        <Select style={{ width: "20rem" }}>
                            {generalData.courses?.map((e) => (
                                <Option value={e.courseId} key={e.courseId}>
                                    {e.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
                <Divider />
                <AlReportQuotaCalendar
                    poolId={poolId}
                    courseId={courseId}
                    shouldChangeState={shouldChangeState}
                    pickedDays={pickedDays}
                    setPickedDays={setPickedDays}
                />
                <Divider />
                <AlReportQuotaStudentSchedule
                    poolId={poolId}
                    courseId={courseId}
                    datetime={
                        pickedDays.length > 0
                            ? pickedDays[0].datetime
                            : undefined
                    }
                />
            </div>
        </Content>
    );
};

AlReportQuota.auth = {
    role: ["seller", "coordinator", "admin"],
    unauthorized: "/auth/unauthorized",
    removeLayout: false,
};

export default AlReportQuota;
