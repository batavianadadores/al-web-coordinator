import BaseModel from "@lib/common/base.model";

export class PoolModel extends BaseModel {
    poolId: number;
    name: string;
    description: string;
    address: string;
}
