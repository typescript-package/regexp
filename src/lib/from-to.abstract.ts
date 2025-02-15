// Class.
import { Value } from '@typescript-package/core';
/**
 * @description
 * @export
 * @abstract
 * @class FromTo
 * @template {number | string} From 
 * @template {number | string} To 
 * @template {string} [Delimiter=''] 
 * @extends {Value<string>}
 */
export abstract class FromTo<
  From extends number | string,
  To extends number | string,
  Delimiter extends string = ''
> extends Value<`${From}${Delimiter}${To}`> {
  /**
   * @description Returns the `string` tag representation of the `FromTo` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag]() { 
    return FromTo.name;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {Delimiter}
   */
  public get delimiter() {
    return this.#delimiter
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {From}
   */
  public get from() {
    return this.#from;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {`${From}${Delimiter}${To}`}
   */
  public get fromTo() {
    return `${this.#from}${this.#delimiter}${this.#to}` as `${From}${Delimiter}${To}`;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {To}
   */
  public get to() {
    return this.#to;
  }

  /**
   * @description
   * @type {Delimiter}
   */
  #delimiter;

  /**
   * @description
   * @type {From}
   */
  #from: From;

  /**
   * @description
   * @type {To}
   */
  #to: To;

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {From} from Start of the pattern range.
   * @param {To} to End of the pattern range.
   * @param {Delimiter} delimiter The character between the `from` and `to`.
   */
  constructor(
    from: From,
    to: To,
    delimiter: Delimiter
  ) {
    super(`${from}${delimiter}${to}`);
    this.#delimiter = delimiter;
    this.#from = from;
    this.#to = to;
  }
}
