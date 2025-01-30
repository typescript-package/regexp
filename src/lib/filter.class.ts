// Class.
import { Pattern } from "./pattern.class";
import { Value } from "@typescript-package/core";
// Interface.
import { PatternOptions } from "../interface";
// Type.
import { FilterMode } from "../type";
/**
 * @description The class to filter the value with the pattern built of options.
 * @export
 * @class Filter
 */
export class Filter<
  Value extends string = string,
  Lowercase extends boolean = boolean,
  Uppercase extends boolean = boolean,
  Numeric extends boolean = boolean,
  Special extends boolean = boolean,
> extends Value<Value> {
  /**
   * @description Returns the mode of the filter, defaults to 'allow'.
   * @public
   * @readonly
   * @type {FilterMode}
   */
  public get mode() {
    return this.#mode;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {Pattern<Lowercase, Uppercase, Numeric, Special>}
   */
  public get pattern() {
    return this.#pattern;
  }

  /**
   * @description Privately stored mode of the filter.
   * @type {FilterMode}
   */
  #mode: FilterMode = 'restrict'; 

  /**
   * @description
   * @type {Pattern}
   */
  #pattern;

  /**
   * Creates an instance of `Filter`.
   * @constructor
   * @param {Value} value The value of generic type variable `Value` to be filtered with specified `options`.
   * @param {PatternOptions<Lowercase, Uppercase, Numeric, Special>} [options={}] 
   * @param {FilterMode} [mode='restrict'] 
   */
  constructor(
    value: Value,
    options: PatternOptions<Lowercase, Uppercase, Numeric, Special> = {},
    mode: FilterMode = 'restrict'
  ) {
    super(value);
    this.#pattern = new Pattern(options);
    this.setMode(mode).setValue(value);
  }

  /**
   * @description Sets the `Filter` to `allow` mode. Allows the characters on `true`.
   * @public
   * @returns {this} 
   */
  public allow(): this {
    this.setMode('allow');
    return this;
  }

  /**
   * @description Sets the `Filter` to `restrict` mode. Restricts the characters on `true`.
   * @public
   * @returns {this} 
   */
  public restrict(): this {
    this.setMode('restrict');
    return this;
  }

  /**
   * @description Sets the filtering mode 'allow' or 'restrict'.
   * @public
   * @param {FilterMode} value 
   * @returns {this} 
   */
  public setMode(value: FilterMode): this {
    ['allow', 'restrict'].includes(value)
      && (this.#mode = value) && (value === 'allow'
        ? this.#pattern.allow()
        : this.#pattern.restrict());
    return this;
  }

  /**
   * @description Applies the filter of instance on the `value`.
   * @public
   * @param {string} value The value of `string` type.
   * @returns {string} The returned value is a `string` type filtered `value`.
   */
  public apply(value: string) {
    return value.replace(this.#pattern.value, '');
  }

  /**
   * @description Filters out values from array that don't match the pattern.
   * @public
   * @param {string[]} value The array of `string` type to be filtered.
   * @returns {string[]} 
   */
  public array(value: string[]): string[] {
    return value.filter(value => this.isValid(value));
  }

  /**
   * @description Checks whether the value matches the pattern's regular expression.
   * @public
   * @param {string} value The value of `string` type to determine is valid against the regular expression.
   * @returns {boolean} 
   */
  public isValid(value: string): boolean {
    return this.#pattern.value?.test(value) ?? false;
  }

  /**
   * @description Sets the filtered value.
   * @public
   * @param {string} value The value of `string` type to set.
   * @returns {this} 
   */
  public override setValue(value: string): this {
    super.setValue(value.replace(this.#pattern.value, '') as Value);
    return this;
  }
}
