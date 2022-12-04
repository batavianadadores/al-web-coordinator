import styles from "./calendar.module.css";
import React, { useState, useEffect } from "react";
import DataProvider from "@dataprovider/data-provider";
import APIError from "@dataprovider/api-error";
import useCognitoSession from "@hooks/useCognitoSession";
import { DateTime } from "luxon";
import AlReportQuotaCalendarHourItem from "./calendar-hour-item";
import AlReportQuotaCalendarDayItem, {
    CalendarDayItem,
} from "./calendar-day-item";
import { message, Spin } from "antd";
import { CalendarQuotaItem } from "./calendar-quota-item";

interface IAlReportQuotaCalendar {
    size?: "small" | "large";
    poolId?: number;
    courseId?: number;
    shouldChangeState?: (
        e: CalendarQuotaItem,
        newState: "default" | "selected"
    ) => boolean;
    pickedDays?: CalendarQuotaItem[];
    setPickedDays?: React.Dispatch<React.SetStateAction<CalendarQuotaItem[]>>;
}

export type AlSize = {
    width: string;
    height: string;
};

export type AlPadding = {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
};

const AlReportQuotaCalendar: React.FC<IAlReportQuotaCalendar> = (props) => {
    // Props
    const { poolId, courseId, shouldChangeState, pickedDays, setPickedDays } =
        props;

    /// Data
    const { getIdTokenCallback } = useCognitoSession();
    const [courseHours, setCourseHours] = useState<string[]>([]);
    const [dayItems, setDayItems] = useState<CalendarDayItem[]>([]);
    const maximunLoadedMonths = 12;
    const [loadedMonth, setLoadedMonth] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /// Data
    useEffect(() => {
        if (poolId && courseId) {
            getCourseHours();
            getQuotas(0, true);
            setLoadedMonth(0);
        }
    }, [poolId, courseId]);

    const getCourseHours = async () => {
        try {
            const result = await DataProvider.listCourseHours(
                poolId!,
                courseId!
            );
            setCourseHours(result);
        } catch (error) {
            if (error instanceof APIError) {
                message.error(error.data.userMessage);
            } else {
                message.error(
                    "No pudimos cargar los horarios. Intenta nuevamente."
                );
            }
        }
    };

    const getQuotas = async (loadedMonth: number, clear: boolean) => {
        setIsLoading(true);
        try {
            const from = DateTime.now()
                .startOf("day")
                .plus({ month: loadedMonth });
            const to = from.plus({ month: 1, days: -1 }).endOf("day");
            const token = await getIdTokenCallback();
            const result = await DataProvider.listScheduleQuota(
                poolId!,
                courseId!,
                from.toISO(),
                to.toISO(),
                token
            );

            let days = result.days.map(
                convertAPIScheduleQuotaDayResponseToCalendarDayItem
            );

            if (!clear) {
                if (dayItems.length > 0) {
                    days = dayItems.concat(days);
                }
            }

            setDayItems(days);
        } catch (error) {
            if (error instanceof APIError) {
                message.error(error.data.userMessage);
            } else {
                message.error(
                    "No pudimos cargar los cupos. Intenta nuevamente."
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    /// Helper
    const convertAPIScheduleQuotaDayResponseToCalendarDayItem = (
        e: APIScheduleQuotaDayResponse
    ): CalendarDayItem => {
        const dayMillis = DateTime.fromISO(e.day).toMillis();
        return {
            ...e,
            dayMillis,
            hoursItem: e.hours.map(
                convertAPIScheduleQuotaHourResponseToCalendarQuotaItem
            ),
        };
    };

    const convertAPIScheduleQuotaHourResponseToCalendarQuotaItem = (
        e: APIScheduleQuotaHourResponse
    ): CalendarQuotaItem => {
        const datetimeMillis = DateTime.fromISO(e.datetime).toMillis();
        return {
            ...e,
            datetimeMillis,
            state: "default",
        };
    };

    const uploadMore = () => {
        if (dayItems.length > 0) {
            const newLoadedMonth = loadedMonth + 1;
            if (newLoadedMonth < maximunLoadedMonths) {
                if (!isLoading) {
                    getQuotas(newLoadedMonth, false);
                    setLoadedMonth(loadedMonth + 1);
                }
            }
        }
    };

    /// Draw
    const size: AlSize =
        (props.size ?? "large") === "large"
            ? { width: "10rem", height: "4rem" }
            : { width: "7.5rem", height: "3rem" };

    const headerSize: AlSize =
        (props.size ?? "large") === "large"
            ? { width: "10rem", height: "6.0rem" }
            : { width: "7.5rem", height: "4.5rem" };

    const padding: AlPadding =
        (props.size ?? "large") === "large"
            ? { top: "1.0rem" }
            : { top: "0.5rem" };

    const [totalHeight, setTotalHeight] = useState<string>("0rem");

    useEffect(() => {
        const headerHeight = Number(headerSize.height.replace("rem", ""));
        const cellHeight = Number(size.height.replace("rem", ""));
        const courseHoursLength = courseHours.length;
        const totalHeight =
            (courseHoursLength * cellHeight + headerHeight).toString() + "rem";

        setTotalHeight(totalHeight);
    }, [courseHours]);

    // Events
    const handleOnScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const threshold =
            (e.currentTarget.scrollWidth - e.currentTarget.offsetWidth) * 0.95;
        if (e.currentTarget.scrollLeft > threshold) {
            uploadMore();
        }
    };

    const handleOnSelect = (e: CalendarQuotaItem, d: CalendarDayItem) => {
        if (shouldChangeState && pickedDays && setPickedDays) {
            let newState: "selected" | "default";
            if (e.state === "default") {
                newState = "selected";
            } else {
                newState = "default";
            }

            if (shouldChangeState(e, newState)) {
                if (newState === "default") {
                    const pickedIndex = pickedDays.findIndex(
                        (ei) => ei.datetimeMillis === e.datetimeMillis
                    );
                    pickedDays.splice(pickedIndex, 1);
                } else {
                    pickedDays.push(e);
                }
                setPickedDays([...pickedDays]);
            }
        }
    };

    useEffect(() => {
        if (pickedDays) {
            for (const dayItem of dayItems) {
                for (const quotaItem of dayItem.hoursItem) {
                    quotaItem.state = "default";
                }
            }
            for (const pickedDay of pickedDays) {
                const pickedDayDateTime = DateTime.fromISO(pickedDay.datetime);
                const dayItem = dayItems.find(
                    (e) =>
                        e.dayMillis ===
                        pickedDayDateTime.startOf("day").toMillis()
                );
                const quota = dayItem?.hoursItem.find(
                    (ei) => ei.datetimeMillis === pickedDay.datetimeMillis
                );
                if (quota) {
                    quota.state = "selected";
                }
            }
            setDayItems([...dayItems]);
        }
    }, [pickedDays]);

    return (
        <Spin spinning={isLoading} style={{ maxWidth: "100%" }}>
            <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <AlReportQuotaCalendarHourItem
                            size={headerSize}
                            padding={padding}
                            content=""
                            key="are1"
                        ></AlReportQuotaCalendarHourItem>
                        {courseHours.map((e) => (
                            <AlReportQuotaCalendarHourItem
                                size={size}
                                padding={padding}
                                content={DateTime.fromISO(`2000-01-01T${e}`)
                                    .toFormat("h:mm a")
                                    .replace(":00", "")
                                    .replace("a. m.", "AM")
                                    .replace("p. m.", "PM")}
                                key={e}
                            ></AlReportQuotaCalendarHourItem>
                        ))}
                    </div>
                    <div
                        style={{
                            width: "100%",
                            overflowY: "hidden",
                            overflowX: "scroll",
                            height: totalHeight,
                        }}
                        onScroll={handleOnScroll}
                    >
                        <ul className={styles["nav"]}>
                            {dayItems.map((e) => {
                                return (
                                    <li key={`_${e.day}`}>
                                        <AlReportQuotaCalendarDayItem
                                            headerSize={headerSize}
                                            size={size}
                                            day={e}
                                            hours={courseHours}
                                            key={e.day}
                                            onClick={handleOnSelect}
                                        ></AlReportQuotaCalendarDayItem>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </Spin>
    );
};

export default AlReportQuotaCalendar;
