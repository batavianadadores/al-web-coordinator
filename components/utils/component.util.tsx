import React from "react";
import { message } from "antd";

import { ErrorModel } from "lib/common/error.model";
import { Arguments, Return } from "lib/utils/function.util";

export async function executeDataAsync<F extends Function>(
    fn: F,
    setIsLoading?: (value: React.SetStateAction<boolean>) => void,
    ...args: Arguments<F>
): Promise<Awaited<Return<F>>> {
    setIsLoading?.(true);
    try {
        return await fn(...args);
    } catch (error) {
        if (error.errorFields) {
            return undefined;
        } else if (error instanceof ErrorModel) {
            message.error(error.message);
        } else {
            message.error("No pudimos completar tu solicitud");
        }
        return undefined;
    } finally {
        setIsLoading?.(false);
    }
}
