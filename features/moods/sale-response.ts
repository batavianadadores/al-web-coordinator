import { Response } from "@components/common/response";

type SaleResponseData = {
    saleId: number;
    isSuccess: boolean;
    invoiceURL: string;
};

export type SaleResponse = Response<SaleResponseData | null>;
