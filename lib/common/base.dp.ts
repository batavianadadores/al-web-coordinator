import BNFetch from "@dataprovider/fetch";

export default class BaseDataProvider {
    protected fetch: BNFetch;
    constructor(protected urlBase: string) {
        this.fetch = new BNFetch(urlBase);
    }
}