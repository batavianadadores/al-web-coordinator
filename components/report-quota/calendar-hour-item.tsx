import React from "react";
import { Typography } from "antd";
import { AlPadding, AlSize } from "./calendar";

const { Text } = Typography;

interface IAlReportQuotaCalendarHourItem {
    size: AlSize;
    padding: AlPadding;
    content: string;
}

const AlReportQuotaCalendarHourItem: React.FC<
    IAlReportQuotaCalendarHourItem
> = (props) => {
    const { size, padding } = props;

    return (
        <div
            style={{
                width: size.width,
                height: size.height,
                background: "#FFFFFF",
                backgroundColor: "#FFFFFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                borderStyle: "solid",
                borderColor: "#EEEEEE",
                borderWidth: "0rem 0.1rem 0rem 0rem",
                paddingTop: padding.top,
                fontSize: "1.2rem",
            }}
        >
            <Text>{props.content}</Text>
        </div>
    );
};

export default AlReportQuotaCalendarHourItem;
