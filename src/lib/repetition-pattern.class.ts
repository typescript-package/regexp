// Interface.
import { Repetition } from "@typedly/regexp";
import { MinMax } from "../interface";
/**
 * @description
 * @export
 * @class RepetitionPattern
 * @template {number | ''} [Min=''] 
 * @template {number | ''} [Max=''] 
 */
export class RepetitionPattern<
  Min extends number | '' = '',
  Max extends number | '' = '',
> {  
  /**
   * @description
   * @public
   * @readonly
   * @type {Max}
   */
  public get max() {
    return this.#max;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {Min}
   */
  public get min() {
    return this.#min;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {Repetition<Min, Max>}
   */
  public get repetition(): Repetition<Min, Max> {
    return `{${this.#min},${this.#max}}` as Repetition<Min, Max>;
  }

  /**
   * @description
   * @type {Max}
   */
  #max: Max = '' as Max;

  /**
   * @description
   * @type {Min}
   */
  #min: Min = '' as Min;

  /**
   * Creates an instance of `RepetitionPattern`.
   * @constructor
   * @param {MinMax<Min, Max>} [param0={min: '' as Min, max: '' as Max}] 
   * @param {MinMax<Min, Max>} param0.min 
   * @param {MinMax<Min, Max>} param0.max 
   */
  constructor(
    {min, max}: MinMax<Min, Max> = {min: '' as Min, max: '' as Max},
  ) {
    max && (this.#max = max);
    min && (this.#min = min);
  }
}

