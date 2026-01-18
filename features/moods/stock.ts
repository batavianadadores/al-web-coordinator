import Location from "./location";
import Variation from "./variation";

class Stock {
    stockId: number | undefined;
    productId: number | undefined;
    variationId: number | undefined;
    locationId: number | undefined;
    available: number | undefined;
    sold: number | undefined;
    updatedBy: string | undefined;
    updatedAt: string | undefined;
    variation: Variation | undefined;
    location: Location | undefined;
}

export default Stock;
