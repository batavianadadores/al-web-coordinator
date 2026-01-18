import VariationType from "./variation-type";
import VariationValue from "./variation-value";

class Variation {
    variationId: number | undefined;
    productId: number | undefined;
    variationValueId: number | undefined;
    price: string | undefined;
    sku: string | undefined;
    createdBy: string | undefined;
    createdAt: string | undefined;
    updatedBy: string | undefined;
    updatedAt: string | undefined;
    variationValue: VariationValue | undefined;
    variationType: VariationType | undefined;
}

export default Variation;
