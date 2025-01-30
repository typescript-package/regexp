// Interface.
import { PatternOptions } from "../interface";
/**
 * @description
 * @export
 * @class Pattern
 * @template {boolean} [Lowercase=boolean] 
 * @template {boolean} [Uppercase=boolean] 
 * @template {boolean} [Numeric=boolean] 
 * @template {boolean} [Special=boolean] 
 */
export class Pattern<
  Lowercase extends boolean = boolean,
  Uppercase extends boolean = boolean,
  Numeric extends boolean = boolean,
  Special extends boolean = boolean,
> {
  public static lowercase: boolean = false;
  public static uppercase: boolean= false;
  public static numeric: boolean = false;
  public static special: boolean= false;

  public get lowercase() {
    return this.#lowercase;
  }

  public get numeric() {
    return this.#numeric;
  }

  public get special() {
    return this.#special;
  }

  public get value() {
    return this.#value;
  }

  public get uppercase() {
    return this.#uppercase;
  }

  #lowercase: boolean = Pattern.lowercase;
  #numeric: boolean = Pattern.numeric;
  #special: boolean = Pattern.special;
  #uppercase: boolean = Pattern.uppercase;
  #value!: RegExp;

  #restricted = false;

  constructor({
    lowercase,
    uppercase,
    numeric,
    special,
  }: PatternOptions<Lowercase, Uppercase, Numeric, Special> = {}) {
    typeof lowercase !== 'undefined' && this.setLowercase(lowercase);
    typeof numeric !== 'undefined' && this.setNumeric(numeric);
    typeof special !== 'undefined' && this.setSpecial(special);
    typeof uppercase !== 'undefined' && this.setUppercase(uppercase);

    // Builds the RegExp.
    this.#build();
  }

  public isAllowed() {
    return this.#restricted === false;
  }

  public isLowercase() {
    return this.#lowercase === true;
  }

  public isNumeric(){
    return this.#numeric === true;
  }

  public isRestricted() {
    return this.#restricted === true;
  }

  public isSpecial() {
    return this.#special === true;
  }

  public isUppercase() {
    return this.#uppercase === true;
  }

  public allow() {
    this.#restricted = false;
    this.#build();
    return this;
  }

  public restrict(): this {
    this.#restricted = true;
    this.#build();
    return this;
  }

  public setLowercase(lowercase: Lowercase): this {
    typeof lowercase !== 'undefined' && (this.#lowercase = lowercase);
    return this;
  }

  public setNumeric(numeric: Numeric): this {
    typeof numeric !== 'undefined' && (this.#numeric = numeric);
    return this;
  }

  public setSpecial(special: Special): this {
    typeof special !== 'undefined' && (this.#special = special);
    return this;
  }

  public setUppercase(uppercase: Uppercase): this {
    typeof uppercase !== 'undefined' && (this.#uppercase = uppercase);
    return this;
  }
  
  /**
   * @description Builds the `RegExp` value based on the options.
   */
  #build() {
    const pattern: string[] = [];

    this.#restricted === false && pattern.push('^');
    this.#lowercase && pattern.push('a-z');
    this.#uppercase && pattern.push('A-Z');
    this.#numeric && pattern.push('0-9');
    this.#special && pattern.push('\\W');

    const patternString = `[${pattern.join('')}]`;

    this.#value = new RegExp(patternString, 'g');
  }
}
