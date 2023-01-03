import APIError from "@dataprovider/api-error";
import { Arguments, Return } from "lib/utils/function.util";
import BaseModel from "./base.model";
import BaseResponse from "./base.response";
import { ErrorModel } from "./error.model";

export default class BaseController {
    constructor(protected urlBase: string) {}

    protected async executeDataProviderAsync<F extends Function>(
        fn: F,
        ...args: Arguments<F>
    ): Promise<Awaited<Return<F>>> {
        try {
            return await fn(...args);
        } catch (error) {
            if (error instanceof APIError) {
                throw new ErrorModel(
                    error.data.userMessage,
                    error.data.errorCode
                );
            } else {
                console.error(error);
                throw new ErrorModel(
                    "No pudimos completar tu solicitud intenta nuevamente"
                );
            }
        }
    }

    protected transformResponseToModel<
        R extends BaseResponse,
        M extends BaseModel
    >(response: R, to: new () => M): M {
        return Object.assign(new to(), response);
    }
}
