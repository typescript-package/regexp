// Type.
import { Escaped } from "@typedly/regexp";
import { RegExpSpecialCharacter } from "../type/regexp-special-character.type";
import { RemoveFromArray } from "../type/remove-from-array.type";
/**
 * @description
 * @export
 * @class SpecialCharacterPattern
 * @template {RegExpSpecialCharacter[]} Character 
 */
export class SpecialCharacterPattern<Character extends RegExpSpecialCharacter[]> {
  /**
   * @description
   * @public
   * @readonly
   * @type {Set<string>}
   */
  public get character() {
    return this.#character;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {Escaped<Character>}
   */
  public get pattern() {
    return Array.from(this.#character).map(char => this.#escape([char as RegExpSpecialCharacter])).join('') as Escaped<Character>;
  }

  /**
   * @description
   * @type {Set<string>}
   */
  #character: Set<string>;

  /**
   * @description
   * @readonly
   * @type {RegExpSpecialCharacter[]}
   */
  #specialChars: RegExpSpecialCharacter[] = [
    '*', 'd', 'D', 'w', 'W', 's', 'S', '+', '?', '^', '$',
    '(', ')', '[', ']', '|', '{', '}'
  ];

  /**
   * Creates an instance of `SpecialCharacterPattern`.
   * @constructor
   * @param {...Character} character 
   */
  constructor(...character: Character) {
    this.#character = new Set(character.filter(char => this.#specialChars.includes(char)));
  }

  /**
   * @description Returns a new instance with a new special chars.
   * @public
   * @template {RegExpSpecialCharacter[]} AddedCharacter 
   * @param {...AddedCharacter} character 
   * @returns {SpecialCharacterPattern<[...Character, ...AddedCharacter]>} 
   */
  public add<AddedCharacter extends RegExpSpecialCharacter[]>(...character: AddedCharacter) {
    return character.forEach(value => this.#character.add(value)),
      new SpecialCharacterPattern(...Array.from(this.#character) as [...Character, ...AddedCharacter]);
  }

  /**
   * @description Returns a new instance with a removed special chars of `character`.
   * @public
   * @template {RegExpSpecialCharacter[]} RemovedCharacter 
   * @param {...RemovedCharacter} character 
   * @returns {SpecialCharacterPattern<RemoveFromArray<Character, RemovedCharacter[number]>>} 
   */
  public remove<RemovedCharacter extends RegExpSpecialCharacter[]>(...character: RemovedCharacter) {
    return character.forEach(value => this.#character.delete(value)),
      new SpecialCharacterPattern(...Array.from(this.#character) as RemoveFromArray<Character, RemovedCharacter[number]>);
  }

  /**
   * @description 
   * @template {RegExpSpecialCharacter | RegExpSpecialCharacter[]} Character 
   * @param {Character} character 
   * @returns {Escaped<Character>} 
   */
  #escape<
    Character extends RegExpSpecialCharacter | RegExpSpecialCharacter[]
  >(character: Character): Escaped<Character> {
    let result = '';
    for (let i = 0; i < character.length; i++) {
      const char = character[i];
      switch (char) {
        case '*': result += '\\*'; break;
        case 'd': result += '\\d'; break;
        case 'D': result += '\\D'; break;
        case 'w': result += '\\w'; break;
        case 'W': result += '\\W'; break;
        case 's': result += '\\s'; break;
        case 'S': result += '\\S'; break;
        case '+': result += '\\+'; break;
        case '?': result += '\\?'; break;
        case '^': result += '\\^'; break;
        case '$': result += '\\$'; break;
        case '(': result += '\\('; break;
        case ')': result += '\\)'; break;
        case '[': result += '\\['; break;
        case ']': result += '\\]'; break;
        case '|': result += '\\|'; break;
        case '{': result += '\\{'; break;
        case '}': result += '\\}'; break;
        default: result += char; // if it's not a special character, add it as is
      }
    }
    return result as Escaped<Character>; // Assert the return type to match `Escaped<T>`
  }
}
