import isEqual from "lodash/isEqual";
import { deepFreeze } from "../utils";

export abstract class ValueObject<Value = any> {
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = deepFreeze(value);
  }

  public get value(): Value {
    return this._value;
  }

  public equals(object: this): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (object.value === undefined) {
      return false;
    }

    if (object.constructor.name !== this.constructor.name) {
      return false;
    }

    return isEqual(this.value, object.value);
  }

  public toString() {
    if (typeof this.value !== "object" || this.value === null) {
      try {
        return this.value.toString();
      } catch (e) {
        return this.value + "";
      }
    }

    const valueString = this.value.toString();
    return valueString === "[object Object]"
      ? JSON.stringify(this.value)
      : valueString;
  }
}

export default ValueObject;
