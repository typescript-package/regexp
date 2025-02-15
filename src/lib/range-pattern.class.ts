// Class.
import { FromTo } from './from-to.abstract';
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
> extends FromTo<From, To, "-"> {
  /**
   * @description Returns the `string` tag representation of the `RangePattern` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag]() { 
    return RangePattern.name;
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
   * @type {string}
   */
  public get negation() {
    return this.#negation as unknown as Negated extends true ? "^" : "";
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
   * @readonly
   * @type {string}
   */
  get #negation() {
    return `${this.#negated ? "^" : ""}`;
  }

  /**
   * @description
   * @type {Negated}
   */
  #negated: Negated;

  /**
   * Creates an instance of `RangePattern`.
   * @constructor
   * @param {From} from Start of the pattern range.
   * @param {To} to 
   * @param {Negated} [negated=false as Negated] 
   */
  constructor(
    from: From,
    to: To,
    negated: Negated = false as Negated
  ) {
    super(from, to, "-");
    this.#negated = negated;
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
    return new RangePattern(super.from, super.to, !this.#negated) as RangePattern<From, To, Negated extends true ? false : true>;
  }

  /**
   * @description Converts the `RangePattern` to a RegExp object with optional flags, anchors, and special character escaping.
   * @public
   * @param {string} [flags=''] - Optional flags to apply to the RegExp (e.g., 'g', 'i', 'm').
   * @param {boolean} [anchors=false] - Whether to include start (^) and end ($) anchors in the pattern.
   * @returns {RegExp} The regular expression representation of the pattern.
   */
  public toRegExp(
    flags: string = '',
    anchors: boolean = false,
  ) {
    let pattern: string = this.toString();
    anchors === true && (pattern = `^${pattern}$`);
    return new RegExp(pattern, flags);
  }

  /**
   * @description
   * @public
   * @returns {CharacterRange<From, To, "", Negated>} 
   */
  public override toString() {
    return `[${this.#negation}${this.fromTo}]` as CharacterRange<From, To, '', Negated>;
  }
}
