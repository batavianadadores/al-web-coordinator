import React from "react";
import { Typography } from "antd";
import { AlSize } from "./calendar";

const { Text } = Typography;

interface IAlReportQuotaCalendarQuotaItemEmpty {
    size: AlSize;
    content?: string;
}

const AlReportQuotaCalendarQuotaItemEmpty: React.FC<
    IAlReportQuotaCalendarQuotaItemEmpty
> = (props) => {
    const { content, size } = props;

    return (
        <div
            style={{
                width: size.width,
                height: size.height,
                background: "#FFFFFF",
                backgroundColor: "#FFFFFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.2rem",
            }}
        >
            <Text>{content ?? ""}</Text>
        </div>
    );
};

export default AlReportQuotaCalendarQuotaItemEmpty;
