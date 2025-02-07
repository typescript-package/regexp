// Class.
import { RangePattern } from "./range-pattern.class";
import { RepetitionPattern } from "./repetition-pattern.class";
// Interface.
import { MinMax } from "../interface";
// Type.
import { CharacterRangeRepetition } from "../type/character-range.type";
/**
 * @description
 * @export
 * @class RangeRepetitionPattern
 * @template {number | string} From 
 * @template {number | string} To 
 * @template {string} [Character=''] 
 * @template {boolean} [Negated=false] 
 * @template {number | ''} [Min=''] 
 * @template {number | ''} [Max=''] 
 * @extends {RangePattern<From, To, Character, Negated>}
 */
export class RangeRepetitionPattern<
  From extends number | string,
  To extends number | string,
  Character extends string = '',
  Negated extends boolean = false,
  Min extends number | '' = '',
  Max extends number | '' = '',
> extends RangePattern<From, To, Character, Negated> {  
  /**
   * @description
   * @public
   * @readonly
   * @type {Max}
   */
  public get max() {
    return this.#repetition.max;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {Min}
   */
  public get min() {
    return this.#repetition.min;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {CharacterRangeRepetition<From, To, Character, Negated, Min, Max>}
   */
  public get rangeRepetition(): CharacterRangeRepetition<From, To, Character, Negated, Min, Max> {
    return `${super.range}${this.#repetition.repetition}`
  }

  /**
   * @description
   * @type {RepetitionPattern<Min, Max>}
   */
  #repetition: RepetitionPattern<Min, Max>;

  /**
   * Creates an instance of `RangeRepetitionPattern`.
   * @constructor
   * @param {From} from 
   * @param {To} to 
   * @param {Character} character 
   * @param {?Negated} [negated] 
   * @param {MinMax<Min, Max>} [param0={min: '' as Min, max: '' as Max}] 
   * @param {MinMax<Min, Max>} param0.min 
   * @param {MinMax<Min, Max>} param0.max 
   */
  constructor(
    from: From,
    to: To,
    character: Character,
    negated?: Negated,
    {min, max}: MinMax<Min, Max> = {min: '' as Min, max: '' as Max},
  ) {
    super(from, to, character, negated);
    this.#repetition = new RepetitionPattern({min, max});
  }
}

