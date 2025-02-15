// Class.
import { LowercaseLetterRange } from '@typedly/regexp';
import { RangePattern } from './range-pattern.class';
// Type.
import { LowercaseLetter } from '@typedly/letter';
/**
 * @description
 * @export
 * @class LowercasePattern
 * @template {LowercaseLetter} From 
 * @template {LowercaseLetter} To 
 * @template {boolean} [Negated=false] 
 * @extends {RangePattern<From, To, Negated>}
 */
export class LowercasePattern<
  From extends LowercaseLetter,
  To extends LowercaseLetter,
  Negated extends boolean = false
> extends RangePattern<From, To, Negated> {  
  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {LowercaseLetterRange<From, To, "", Negated>}
   */
  public override get pattern() {
    return this.toString();
  }

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
    super(from, to, negated);
  }

  /**
   * @inheritdoc
   * @public
   * @returns {LowercaseLetterRange<From, To, "", Negated>} 
   */
  public override toString() {
    return super.toString() as LowercaseLetterRange<From, To, '', Negated>;
  }
}
