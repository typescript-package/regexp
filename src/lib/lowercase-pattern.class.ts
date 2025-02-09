// Type.
import { LowercaseLetter } from '@typedly/letter';
import { LowercaseLetterRange } from '@typedly/regexp';
import { RangePattern } from './range-pattern.class';
/**
 * @description
 * @export
 * @class RangePattern
 * @template {number | string} From 
 * @template {number | string} To 
 * @template {string} [Character=''] 
 * @template {boolean} [Negated=false] 
 */
export class LowercasePattern<
  From extends LowercaseLetter,
  To extends LowercaseLetter,
  Character extends string = '',
  Negated extends boolean = false
> extends RangePattern<From, To, Character, Negated> {
  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {LowercaseLetterRange<From, To, Character, Negated>}
   */
  public override get range() {
    return this.toString();
  }

  /**
   * Creates an instance of `RangePattern`.
   * @constructor
   * @param {From} from 
   * @param {To} to 
   * @param {Character} [character='' as Character] 
   * @param {Negated} [negated=false as Negated] 
   */
  constructor(
    from: From,
    to: To,
    character: Character = '' as Character,
    negated: Negated = false as Negated
  ) {
    super(from, to, character, negated);
  }

  /**
   * @description
   * @public
   * @returns {LowercaseLetterRange<From, To, Character, Negated>} 
   */
  public override toString() {
    return super.toString() as LowercaseLetterRange<From, To, Character, Negated>;
  }
}
