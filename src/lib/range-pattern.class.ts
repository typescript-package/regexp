// Type.
import { CharacterRange } from '@typedly/regexp';
/**
 * @description
 * @export
 * @class RangePattern
 * @template {number | string} From 
 * @template {number | string} To 
 * @template {boolean} [Negated=false] 
 */
export class RangePattern<
  From extends number | string,
  To extends number | string,
  Negated extends boolean = false
> {
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
   * @type {Negated}
   */
  public get negated() {
    return this.#negated;
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
   * @public
   * @readonly
   * @type {CharacterRange<From, To, "", Negated>}
   */
  public get pattern() {
    return this.toString();
  }

  /**
   * @description
   * @type {From}
   */
  #from: From;

  /**
   * @description
   * @type {Negated}
   */
  #negated: Negated;

  /**
   * @description
   * @type {To}
   */
  #to: To;

  /**
   * Creates an instance of `RangePattern`.
   * @constructor
   * @param {From} from 
   * @param {To} to 
   * @param {Negated} [negated=false as Negated] 
   */
  constructor(
    from: From,
    to: To,
    negated: Negated = false as Negated
  ) {
    this.#from = from;
    this.#negated = negated;
    this.#to = to;
  }

  /**
   * @description Checks whether pattern is in the negated state.
   * @public
   * @returns {Negated extends true ? true : false} 
   */
  public isNegated() {
    return this.#negated as unknown as Negated extends true ? true : false;
  }

  /**
   * @description Toggles the negation state.
   * @public
   * @returns {RangePattern<From, To, Negated extends true ? false : true>} 
   */
  public negate() {
    return new RangePattern(this.#from, this.#to, !this.#negated) as RangePattern<From, To, Negated extends true ? false : true>;
  }

  /**
   * @description
   * @public
   * @returns {CharacterRange<From, To, "", Negated>} 
   */
  public toString() {
    return `[${this.#negated ? "^" : ""}${this.#from}-${this.#to}]` as CharacterRange<From, To, '', Negated>;
  }
}
