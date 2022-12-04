import React from "react";
import AlReportQuotaCalendarQuotaItem, {
    CalendarQuotaItem,
} from "./calendar-quota-item";
import AlReportQuotaCalendarQuotaItemEmpty from "./calendar-quota-item-empty";
import { Typography } from "antd";
import { DateTime } from "luxon";
import { AlSize } from "./calendar";

const { Text } = Typography;

interface IAlReportQuotaCalendarDayItem {
    size: AlSize;
    headerSize: AlSize;
    day: CalendarDayItem;
    hours: string[];
    onClick?: (item: CalendarQuotaItem, day: CalendarDayItem) => void;
}

export type CalendarDayItem = APIScheduleQuotaDayResponse & {
    hoursItem: CalendarQuotaItem[];
    dayMillis: number;
};

const AlReportQuotaCalendarDayItem: React.FC<IAlReportQuotaCalendarDayItem> = (
    props
) => {
    const { day, hours, size, headerSize, onClick } = props;

    const getQuotaHour = (hour: string): React.ReactNode => {
        const key = `${day.day}_${hour}`;
        switch (day.state) {
            case "holiday":
                return (
                    <AlReportQuotaCalendarQuotaItemEmpty
                        size={size}
                        content="Feriado"
                        key={key}
                    />
                );
            case "available":
                const date = DateTime.fromISO(day.day);
                const datetimeMillis = DateTime.fromISO(
                    `${date.toFormat("yyyy-MM-dd")}T${hour}`
                ).toMillis();
                const quotaHour = day.hoursItem.find(
                    (e) => e.datetimeMillis === datetimeMillis
                );

                if (quotaHour) {
                    return (
                        <AlReportQuotaCalendarQuotaItem
                            item={quotaHour}
                            size={size}
                            key={key}
                            onClick={(e) => {
                                if (onClick) onClick(e, day);
                            }}
                        ></AlReportQuotaCalendarQuotaItem>
                    );
                } else {
                    return (
                        <AlReportQuotaCalendarQuotaItemEmpty
                            size={size}
                            key={key}
                        />
                    );
                }

            case "unavailable":
                return (
                    <AlReportQuotaCalendarQuotaItemEmpty
                        size={size}
                        key={key}
                    />
                );
        }
    };
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div
                style={{
                    width: headerSize.width,
                    height: headerSize.height,
                    background: "#FFFFFF",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderStyle: "solid",
                    borderColor: "#EEEEEE",
                    borderWidth: "0.1rem",
                    fontSize: "1.2rem",
                }}
            >
                <Text>{DateTime.fromISO(day.day).toFormat("EEE")}</Text>
                <Text>{DateTime.fromISO(day.day).toFormat("dd MMM yyyy")}</Text>
            </div>
            {hours.map(getQuotaHour)}
        </div>
    );
};

export default AlReportQuotaCalendarDayItem;
