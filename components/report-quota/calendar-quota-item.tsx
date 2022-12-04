import styles from "./calendar-quota-item.module.css";
import React from "react";
import { Typography } from "antd";
import { AlSize } from "./calendar";

const { Text } = Typography;

interface IAlReportQuotaCalendarQuotaItem {
    size: AlSize;
    item: CalendarQuotaItem;
    onClick?: (item: CalendarQuotaItem) => void;
}

export type CalendarQuotaItem = APIScheduleQuotaHourResponse & {
    state: "selected" | "default";
    datetimeMillis: number;
};

const AlReportQuotaCalendarQuotaItem: React.FC<
    IAlReportQuotaCalendarQuotaItem
> = (props) => {
    const { item, size, onClick } = props;
    const handleOnClick = () => {
        if (onClick) onClick(item);
    };

    const className =
        item.state === "selected"
            ? "item__selected"
            : item.quota >= item.capacity
            ? "item__full"
            : item.quota >= item.capacity * 0.75
            ? "item__almost-full"
            : "item__available";
    return (
        <div
            style={{
                width: size.width,
                height: size.height,
            }}
            className={`${styles["item"]} ${styles[className]}`}
            onClick={handleOnClick}
        >
            <Text>{`${item.quota}/${item.capacity}`}</Text>
        </div>
    );
};

export default AlReportQuotaCalendarQuotaItem;
