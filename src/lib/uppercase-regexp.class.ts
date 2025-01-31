// Type.
import { RegExpFlags, UppercaseLetter } from "../type";
/**
 * @description
 * @export
 * @class UppercaseRegExp
 */
export class UppercaseRegExp<
  From extends UppercaseLetter = 'A',
  To extends UppercaseLetter = 'Z'
> extends RegExp {
  /**
   * @description
   * @static
   * @template {string} [From='A'] 
   * @template {string} [To='Z'] 
   * @param {From} from 
   * @param {To} to 
   * @returns {`[${From}-${To}]`} 
   */
  static #generate<
    From extends UppercaseLetter = 'A',
    To extends UppercaseLetter = 'Z'
  >(from: From, to: To): `[${From}-${To}]` {
    return `[${from.toUpperCase() as From}-${to.toUpperCase() as To}]`;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {RegExp}
   */
  public get pattern(): `[${From}-${To}]` {
    return super.source as `[${From}-${To}]`;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {`/[${From}-${To}]/g`}
   */
  public get regex(): `/[${From}-${To}]/g` {
    return `/${super.source}/g` as `/[${From}-${To}]/g`;
  }

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
   * Creates an instance of `UppercaseRegExp`.
   * @constructor
   * @param {From} [from='A' as From] 
   * @param {To} [to='Z' as To] 
   */
  constructor(from: From = 'A' as From, to: To = 'Z' as To, flags: RegExpFlags = 'g') {
    super(UppercaseRegExp.#generate(from, to), flags);
    this.#from = from.toUpperCase() as From;
    this.#to = to.toUpperCase() as To;
    this.#validate();
  }
  /**
   * @description
   * @private
   */
  #validate(): void {
    if (this.#from < 'A' || this.#to > 'Z' || this.#from as string > this.#to) {
      throw new Error(`Invalid uppercase range: '${this.#from}-${this.#to}'`);
    }
  }
}
