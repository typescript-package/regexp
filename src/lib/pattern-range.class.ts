/**
 * @description
 * @export
 * @class PatternRange
 * @template {number | string} From 
 * @template {number | string} To 
 */
export class PatternRange<
  From extends number | string,
  To extends number | string
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
   * @type {boolean}
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
   * @type {From}
   */
  #from: From;

  /**
   * @description
   * @type {boolean}
   */
  #negated: boolean;

  /**
   * @description
   * @type {To}
   */
  #to: To;

  /**
   * Creates an instance of `PatternRange`.
   * @constructor
   * @param {From} from 
   * @param {To} to 
   * @param {boolean} [negated=false] 
   */
  constructor(from: From, to: To, negated: boolean = false) {
    this.#from = from;
    this.#negated = negated;
    this.#to = to;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {boolean}
   */
  public get isNegated(): boolean {
    return this.#negated;
  }
  
  /**
   * @description Toggles the negation state.
   * @public
   * @returns {this} 
   */
  public negate(): this {
    this.#negated = !this.#negated;
    return this;
  }

  /**
   * @description
   * @public
   * @returns {(`[${'^' | ''}${From}-${To}]`)} 
   */
  public toString(): `[${'^' | ''}${From}-${To}]` {
    return `[${this.#negated ? "^" : ""}${this.#from}-${this.#to}]`;
  }
}
