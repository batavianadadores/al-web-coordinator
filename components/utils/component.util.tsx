import React from "react";
import { message } from "antd";

import { ErrorModel } from "lib/common/error.model";
import { Arguments, Return } from "@lib/utils/function.util";
import { ResponseError } from "entities/common/response-error";

export async function executeDataAsync<F extends Function>(
    fn: F,
    setIsLoading?: (value: React.SetStateAction<boolean>) => void,
    ...args: Arguments<F>
): Promise<Awaited<Return<F>>> {
    setIsLoading?.(true);
    try {
        return await fn(...args);
    } catch (error) {
        if ((error as any).errorFields) {
            return undefined as Awaited<Return<F>>;
        } else if (error instanceof ErrorModel) {
            message.error(error.message);
        } else {
            message.error("No pudimos completar tu solicitud");
        }
        return undefined as Awaited<Return<F>>;
    } finally {
        setIsLoading?.(false);
    }
}

export async function wrapTryCatchOverAPICall(
    func: () => Promise<void>,
    userMessage: string = "No pudimos cargar los datos. Intenta nuevamente."
) {
    try {
        await func();
    } catch (error) {
        if ((error as ResponseError).errorCode) {
            message.error((error as ResponseError).userMessage);
        } else {
            message.error(userMessage);
            console.error(error);
        }
    }
}

export async function wrapTryCatchOverAPICallWithReturn<T>(
    func: () => Promise<T>,
    userMessage: string = "No pudimos cargar los datos. Intenta nuevamente."
) {
    try {
        return await func();
    } catch (error) {
        if ((error as ResponseError).errorCode) {
            message.error((error as ResponseError).userMessage);
        } else {
            message.error(userMessage);
            console.error(error);
        }
        return undefined;
    }
}
