import BaseController from "lib/common/base.controller";
import { PoolDataProvider } from "./dp/pool.dp";
import { PoolModel } from "./model/pool.model";

export class PoolController extends BaseController {
    protected dataProvider: Extract<typeof PoolDataProvider, unknown>;

    constructor(urlBase: string) {
        super(urlBase);

        this.dataProvider = PoolDataProvider;
    }

    list(): Promise<PoolModel[]> {
        return this.executeDataProviderAsync(async () => {
            const response = await this.dataProvider.listPools();
            const model = response.items.map((e) =>
                this.transformResponseToModel(e, PoolModel)
            );
            return model;
        });
    }
}
