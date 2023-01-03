export default class BaseModel {
    clone() {
        throw new Error("Method 'clone()' must be implemented");
    }
}