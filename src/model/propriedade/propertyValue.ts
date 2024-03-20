import { Property } from "./property";
import { Value } from "./property-values/value"

export class PropertyValue {
    id : number = 0;
    value : Value = new Value;
    property : Property = new Property();
}