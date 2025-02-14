// Type.
import { CharacterRange } from '@typedly/regexp';
import { RegExpSpecialCharacter } from '../type/regexp-special-character.type';
import { SpecialCharacterPattern } from './special-character-pattern.class';
/**
 * @description
 * @export
 * @class RangePattern
 * @template {number | string} From 
 * @template {number | string} To 
 * @template {[RegExpSpecialCharacter, ...RegExpSpecialCharacter[]]} Character 
 * @template {boolean} [Negated=false] 
 */
export class RangePattern<
  From extends number | string,
  To extends number | string,
  Character extends [RegExpSpecialCharacter, ...RegExpSpecialCharacter[]],
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
   * @type {Set<string>}
   */
  public get specialCharacter() {
    return this.#specialCharacter;
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
   * @type {CharacterRange<From, To, Character, Negated>}
   */
  public get pattern() {
    return this.toString();
  }

  /**
   * @description
   * @type {SpecialCharacterPattern}
   */
  #specialCharacter: SpecialCharacterPattern<Character>;

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
    character: Character,
    negated: Negated = false as Negated
  ) {
    this.#from = from;
    this.#specialCharacter = new SpecialCharacterPattern(...character);
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
    return new RangePattern(this.#from, this.#to, [...this.#specialCharacter.pattern] as any, !this.#negated) as any;
  }

  /**
   * @description
   * @public
   * @returns {CharacterRange<From, To, Character, Negated>} 
   */
  public toString() {
    return `[${this.#negated ? "^" : ""}${this.#from}-${this.#to}${this.#specialCharacter.pattern}]` as CharacterRange<From, To, Character, Negated>;
  }
}
