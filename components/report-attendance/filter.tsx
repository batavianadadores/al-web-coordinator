import type { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { DatePicker, Spin, Typography } from "antd";

import { PoolModel } from "@lib/pool/model/pool.model";
import useCognitoSession from "@hooks/useCognitoSession";
import { PoolController } from "@lib/pool/pool.controller";
import { executeDataAsync } from "@components/utils/component.util";

const { RangePicker } = DatePicker;
const { Text } = Typography;

type AlAttendanceFilterProps = {
    onChange: (pool: PoolModel, from: string, to: string) => void;
};

const AlAttendanceFilter: React.FC<AlAttendanceFilterProps> = ({
    onChange,
}) => {
    const { user } = useCognitoSession();

    const poolController = new PoolController(
        process.env.NEXT_PUBLIC_API_URL_BASE ?? ""
    );

    const [isLoading, setIsLoading] = useState(false);
    const [pools, setPools] = useState<PoolModel[]>([]);
    const [selectedPool, setSelectedPool] = useState<PoolModel>();
    const [selectedEndOfWeek, setSelectedEndOfWeek] = useState<Dayjs | null>();
    const [range, setRange] =
        useState<[Dayjs | null | undefined, Dayjs | null | undefined]>();

    /// Listing
    useEffect(() => {
        listData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const poolId = Number(user.attributes?.["custom:pool_id"]);
        const pool = pools.find((e) => e.poolId === poolId);
        setSelectedPool(pool);

        notifyChange(
            pool,
            range?.[0]?.toISOString(),
            range?.[1]?.toISOString()
        );
    }, [user, pools]); // eslint-disable-line react-hooks/exhaustive-deps

    const listData = async () => {
        executeDataAsync(async () => {
            const poolsPromise = poolController.list();
            const [pools] = await Promise.all([poolsPromise]);
            setPools(pools);
        }, setIsLoading);
    };

    const onDateChange = (
        dates: [Dayjs | null, Dayjs | null] | null,
        dateStrings: [string, string]
    ) => {
        setRange([dates?.[0], dates?.[1]]);

        notifyChange(
            selectedPool,
            dates?.[0]?.toISOString(),
            dates?.[1]?.toISOString()
        );
    };

    const notifyChange = (
        pool: PoolModel | undefined,
        startDate: string | undefined,
        endDate: string | undefined
    ) => {
        if (pool && startDate && endDate) {
            onChange(pool, startDate, endDate);
        }
    };

    return (
        <div style={{ display: "block", width: "100%" }}>
            <Spin
                spinning={isLoading}
                style={{ width: "100%", display: "block" }}
            >
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
                        <Text>Intervalo: </Text>
                        <RangePicker
                            value={range as any}
                            onChange={onDateChange}
                            style={{ width: "100%" }}
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
            </Spin>
        </div>
    );
};

export default AlAttendanceFilter;
