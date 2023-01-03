import PPFetch from "@dataprovider/fetch";
import { APIPoolResponse } from "../entities/pool.entity";

const ppfetch = new PPFetch(process.env.NEXT_PUBLIC_API_URL_BASE ?? "");

export const PoolDataProvider = {
    listPools(): Promise<APIPaginationResponse<APIPoolResponse>> {
        return ppfetch.get("/pool");
    },
};
