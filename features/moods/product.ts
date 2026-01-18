import { modelFromObject } from "@entities/utils";
import Variation from "./variation";
import Stock from "./stock";

class Product {
    static NO_VARIATION_VALUE_ID = 1;

    productId: number | undefined;
    name: string | undefined;
    description: string | undefined;
    totalStock: number | undefined;
    createdBy: string | undefined;
    createdAt: string | undefined;
    updatedBy: string | undefined;
    updatedAt: string | undefined;
    variations: Variation[];
    stocks: Stock[];

    constructor() {
        this.productId = undefined;
        this.name = undefined;
        this.description = undefined;
        this.totalStock = undefined;
        this.createdBy = undefined;
        this.createdAt = undefined;
        this.updatedBy = undefined;
        this.updatedAt = undefined;
        this.updatedBy = undefined;
        this.variations = [];
        this.stocks = [];
    }

    static fromProduct(product: any) {
        return modelFromObject(product, Product);
    }
    static getDetailedDescription(
        product: Product,
        options: { separator: string; includeStock: boolean } = {
            separator: " : ",
            includeStock: true,
        }
    ): string {
        if (!product) {
            return "";
        }

        const response = [];
        response.push(product.name);
        if (
            product.variations[0].variationValueId !==
            this.NO_VARIATION_VALUE_ID
        ) {
            response.push(product.variations[0].variationType?.name);
            response.push(product.variations[0].variationValue?.value);
        }
        if (options.includeStock) {
            const isDisabled =
                product.stocks?.[0].available === undefined ||
                product.stocks[0].available === 0;
            const stock = isDisabled
                ? "(Sin stock)"
                : `(${product.stocks[0].available} ud.)${product.stocks[0].location?.name}`;
            response.push(stock);
        }
        return response.join(options.separator);
    }

    get priceFormatted() {
        if (!this.isNoVariation) {
            return "-";
        }

        return `S/ ${this.variations[0].price}`;
    }

    get price() {
        if (!this.isNoVariation) {
            return "0";
        }

        return this.variations[0].price!;
    }

    set price(value: string) {
        if (!this.isNoVariation) {
            return;
        }

        this.variations[0].price = value;
    }

    get sku() {
        if (!this.isNoVariation) {
            return "-";
        }

        return `${this.variations[0].sku}`;
    }

    set sku(value: string) {
        if (!this.isNoVariation) {
            return;
        }

        this.variations[0].sku = value;
    }

    get isNoVariation() {
        return (
            this.variations.length === 1 &&
            this.variations[0].variationValueId ===
                Product.NO_VARIATION_VALUE_ID
        );
    }
}

export default Product;
