// Type.
import { RegExpFlags } from "../type";
import { LowercaseLetter } from '@typedly/letter';
/**
 * @description
 * @export
 * @class LowercasePattern
 */
export class LowercaseRegExp<
  From extends LowercaseLetter = 'a',
  To extends LowercaseLetter = 'z'
> extends RegExp {
  /**
   * @description
   * @static
   * @template {string} [From='a'] 
   * @template {string} [To='z'] 
   * @param {From} from 
   * @param {To} to 
   * @returns {`[${From}-${To}]`} 
   */
  static #generate<
    From extends LowercaseLetter = 'a',
    To extends LowercaseLetter = 'z'
  >(from: From, to: To): `[${From}-${To}]` {
    return `[${from}-${to}]`;
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
   * Creates an instance of `LowercasePattern`.
   * @constructor
   * @param {From} [from='a' as From] 
   * @param {To} [to='z' as To] 
   */
  constructor(from: From = 'a' as From, to: To = 'z' as To, flags: RegExpFlags = 'g') {
    super(LowercaseRegExp.#generate(from, to), flags);
    this.#from = from.toLowerCase() as From;
    this.#to = to.toLowerCase() as To;
    this.#validate();
  }
  /**
   * @description
   * @private
   */
  #validate(): void {
    if (this.#from < 'a' || this.#to > 'z' || this.#from as string > this.#to) {
      throw new Error(`Invalid lowercase range: '${this.#from}-${this.#to}'`);
    }
  }
}
