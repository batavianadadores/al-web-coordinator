import APIError from "@dataprovider/api-error";
import { CourseDP } from "@lib/course/course.dp";
import { CourseResponse } from "@lib/course/course.response";
import { CourseModel } from "@lib/course/course.model";
import { PoolDataProvider } from "@lib/pool/dp/pool.dp";
import { APIPoolResponse } from "@lib/pool/entities/pool.entity";
import { PoolModel } from "@lib/pool/model/pool.model";
import { ProductsDataProvider } from "@lib/products/dp/products.dp";
import {
    APIProductListParameters,
    APIProductResponse,
} from "@lib/products/entities/product.entity";
import { ProductModel } from "@lib/products/model/product.model";
import { ErrorModel } from "../model/error.model";
import { OptionModel } from "../model/option.model";
import { CourseController } from "@lib/course/course.controller";

export class BaseController {
    courseController = new CourseController(
        process.env.NEXT_PUBLIC_API_URL_BASE
    );

    listCourseStatuses(): OptionModel[] {
        return [
            {
                id: "enabled",
                value: "Activo",
                description: "",
                isDefault: false,
            },
            {
                id: "disabled",
                value: "Inactivo",
                description: "",
                isDefault: false,
            },
        ];
    }

    listProductStates(): OptionModel[] {
        return [
            {
                id: "enabled",
                value: "Activo",
                description: "",
                isDefault: false,
            },
            {
                id: "disabled",
                value: "Inactivo",
                description: "",
                isDefault: false,
            },
        ];
    }

    listMonths(): OptionModel[] {
        return [
            { id: "1", value: "Enero", description: "", isDefault: false },
            { id: "2", value: "Febrero", description: "", isDefault: false },
            { id: "3", value: "Marzo", description: "", isDefault: false },
            { id: "4", value: "Abril", description: "", isDefault: false },
            { id: "5", value: "Mayo", description: "", isDefault: false },
            { id: "6", value: "Junio", description: "", isDefault: false },
            { id: "7", value: "Julio", description: "", isDefault: false },
            { id: "8", value: "Agosto", description: "", isDefault: false },
            { id: "9", value: "Septiembre", description: "", isDefault: false },
            { id: "10", value: "Octubre", description: "", isDefault: false },
            { id: "11", value: "Noviembre", description: "", isDefault: false },
            { id: "12", value: "Diciembre", description: "", isDefault: false },
        ];
    }

    listBonusStates(): OptionModel[] {
        return [
            {
                id: "enabled",
                value: "Activo",
                description: "",
                isDefault: false,
            },
            {
                id: "disabled",
                value: "Inactivo",
                description: "",
                isDefault: false,
            },
        ];
    }

    listExecutives(): OptionModel[] {
        return [
            {
                id: "fatima",
                value: "Fátima",
                description: "",
                isDefault: false,
            },
            {
                id: "lorena",
                value: "Lorena",
                description: "",
                isDefault: false,
            },
            {
                id: "mercadopago",
                value: "Mercado Pago",
                description: "",
                isDefault: false,
            },
            {
                id: "adriana",
                value: "Adriana",
                description: "",
                isDefault: false,
            },
            { id: "luz", value: "Luz", description: "", isDefault: false },
            { id: "admin", value: "Admin", description: "", isDefault: false },
            {
                id: "milene",
                value: "Milene",
                description: "",
                isDefault: false,
            },
            {
                id: "asistencia",
                value: "Asistencia",
                description: "",
                isDefault: false,
            },
            { id: "diana", value: "Diana", description: "", isDefault: false },
            {
                id: "yessenia",
                value: "Yessenia",
                description: "",
                isDefault: false,
            },
            {
                id: "danna",
                value: "Danna",
                description: "",
                isDefault: false,
            },
            {
                id: "genesis",
                value: "Genesis",
                description: "",
                isDefault: false,
            },
            {
                id: "margarita",
                value: "Margarita",
                description: "",
                isDefault: false,
            },
            {
                id: "brillith",
                value: "Brillith",
                description: "",
                isDefault: false,
            },
            {
                id: "jaqueline",
                value: "Jaqueline",
                description: "",
                isDefault: false,
            },
        ];
    }

    async listCourses(token: string): Promise<CourseModel[]> {
        try {
            const result = await this.courseController.list(token);
            return result;
        } catch (error) {
            if (error instanceof APIError) {
                throw new ErrorModel(
                    error.data.userMessage,
                    error.data.statusCode
                );
            } else {
                console.error(error);
                throw new ErrorModel(
                    "No pudimos completar tu solicitud intenta nuevamente"
                );
            }
        }
    }

    async listPools(): Promise<PoolModel[]> {
        try {
            const result = await PoolDataProvider.listPools();
            return result.items.map((e) =>
                this.transformAPIPoolResponseToPooModel(e)
            );
        } catch (error) {
            if (error instanceof APIError) {
                throw new ErrorModel(
                    error.data.userMessage,
                    error.data.statusCode
                );
            } else {
                console.error(error);
                throw new ErrorModel(
                    "No pudimos completar tu solicitud intenta nuevamente"
                );
            }
        }
    }

    async listProducts(
        parameters: APIProductListParameters,
        token: string
    ): Promise<{ totalItems: number; items: ProductModel[] }> {
        try {
            const result = await ProductsDataProvider.listProducts(
                parameters,
                token
            );

            const items = result.items.map((e) =>
                this.transformAPIProductResponseToProductModel(e)
            );
            const totalItems = result.totalItems;
            return {
                totalItems,
                items,
            };
        } catch (error) {
            if (error instanceof APIError) {
                throw new ErrorModel(
                    error.data.userMessage,
                    error.data.statusCode
                );
            } else {
                console.error(error);
                throw new ErrorModel(
                    "No pudimos completar tu solicitud intenta nuevamente"
                );
            }
        }
    }

    protected transformAPICourseResponseToCourseModel(
        response: CourseResponse
    ): CourseModel {
        const statuses = this.listCourseStatuses();
        return Object.assign(new CourseModel(), response, {
            statusOption: statuses.find((e) => e.id === response.status),
        });
    }

    protected transformAPIPoolResponseToPooModel(response: APIPoolResponse) {
        return Object.assign(new PoolModel(), response);
    }

    protected transformAPIProductResponseToProductModel(
        response: APIProductResponse
    ): ProductModel {
        const stateOptions = this.listProductStates();
        return Object.assign(new ProductModel(), response, {
            stateOption: stateOptions.find((e) => e.id === response.state),
        });
    }
}
