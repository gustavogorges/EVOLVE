import { Property } from "./property";
import { Value } from "./property-values/value"

export class PropertyValue {
    id : number = 0;
    value : Array<Value> = [];
    property : Property = new Property();
}