// Type.
import { CharacterRange } from "../type/character-range.type";
/**
 * @description
 * @export
 * @class RangePattern
 * @template {number | string} From 
 * @template {number | string} To 
 * @template {string} [Character=''] 
 * @template {boolean} [Negated=false] 
 */
export class RangePattern<
  From extends number | string,
  To extends number | string,
  Character extends string = '',
  Negated extends boolean = false
> {
  /**
   * @description
   * @public
   * @readonly
   * @type {Character}
   */
  public get character() {
    return this.#character;
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
   * @type {`[${Negated extends true ? "^" : ""}${From}-${To}${Escaped<Character>}]`}
   */
  public get range() {
    return this.toString();
  }

  /**
   * @description
   * @type {Character}
   */
  #character;

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
   * @param {Character} [character='' as Character] 
   * @param {Negated} [negated=false as Negated] 
   */
  constructor(
    from: From,
    to: To,
    character: Character = '' as Character,
    negated: Negated = false as Negated
  ) {
    this.#from = from;
    this.#character = character;
    this.#negated = negated;
    this.#to = to;
  }

  /**
   * @description Checks whether pattern is in the negated state.
   * @public
   * @returns {Negated extends true ? true : false} 
   */
  public isNegated(): Negated extends true ? true : false {
    return this.#negated as unknown as Negated extends true ? true : false;
  }

  /**
   * @description Toggles the negation state.
   * @public
   * @returns {RangePattern<From, To, Character, Negated extends true ? false : true>} 
   */
  public negate(): RangePattern<From, To, Character, Negated extends true ? false : true> {
    return new RangePattern(this.#from, this.#to, this.#character, !this.#negated) as any;
  }

  /**
   * @description
   * @public
   * @returns {CharacterRange<From, To, Character, Negated>} 
   */
  public toString() {
    return `[${this.#negated ? "^" : ""}${this.#from}-${this.#to}]` as CharacterRange<From, To, Character, Negated>;
  }
}
