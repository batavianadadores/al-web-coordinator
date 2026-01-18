import Product from "./product";
import { Pagination } from "@entities/common/pagination";

type ProductListResponse = Pagination<Product>;

export default ProductListResponse;
