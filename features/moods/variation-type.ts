import VariationValue from "./variation-value";

class VariationType {
    variationTypeId: number | undefined;
    name: string | undefined;
    values: VariationValue[];

    constructor() {
        this.variationTypeId = undefined;
        this.name = undefined;
        this.values = [];
    }
}

export default VariationType;
