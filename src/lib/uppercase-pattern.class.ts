// Class.
import { RangePattern } from './range-pattern.class';
// Type.
import { UppercaseLetter } from '@typedly/letter';
import { UppercaseLetterRange } from '@typedly/regexp';
/**
 * @description
 * @export
 * @class UppercasePattern
 * @template {UppercaseLetter} From 
 * @template {UppercaseLetter} To 
 * @template {boolean} [Negated=false] 
 * @extends {RangePattern<From, To, Negated>}
 */
export class UppercasePattern<
  From extends UppercaseLetter,
  To extends UppercaseLetter,
  Negated extends boolean = false
> extends RangePattern<From, To, Negated> {
  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {UppercaseLetterRange<From, To, "", Negated>}
   */
  public override get pattern() {
    return this.toString();
  }

  /**
   * Creates an instance of `UppercasePattern`.
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
    super(from, to, negated);
  }

  /**
   * @inheritdoc
   * @public
   * @returns {UppercaseLetterRange<From, To, "", Negated>} 
   */
  public override toString() {
    return super.toString() as UppercaseLetterRange<From, To, "", Negated>;
  }
}
