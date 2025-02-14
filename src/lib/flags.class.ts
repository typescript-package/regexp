// Class.
import { Value } from "@typescript-package/core";
// Type.
import { AppendFlag, FlagString, RegExpFlag, RemoveFlag } from "@typedly/regexp";
/**
 * @description
 * @export
 * @class PatternFlag
 * @template {RegExpFlag[]} [Value=[]] 
 * @extends {Value<Set<RegExpFlag>>}
 */
export class Flags<Value extends RegExpFlag[] = []> extends Value<Set<RegExpFlag>> {
  /**
   * Creates an instance of `PatternFlag`.
   * @constructor
   * @param {...Value} flags - Initial flags to set.
   */
  constructor(...flags: Value) {
    super(new Set(flags) as Set<RegExpFlag>);
  }

  /**
   * @description The flags as a concatenated string type.
   * @public
   * @returns {FlagString<Value>}
   */
  public get flags(): FlagString<Value> {
    return this.toString() as FlagString<Value>;
  }

  //#region Add.
  /**
   * @description
   * @public
   * @template {RegExpFlag} Flag 
   * @param {Flag} flag 
   * @returns {Flags<AppendFlag<Value, Flag>>} 
   */
  public add<Flag extends RegExpFlag>(flag: Flag): Flags<AppendFlag<Value, Flag>> {
    return new Flags(...([...super.value, flag] as AppendFlag<Value, Flag>));
  }

  /**
   * @description Adds the 's' (dotAll) flag.
   * @public
   * @returns {Flags<[...Value, 's']>} 
   */
  public any(): Flags<AppendFlag<Value, 's'>> {
    return this.add('s');
  }

  /**
   * @description the 'g' (global) flag.
   * @public
   * @returns {Flags<[...Value, 'g']>}
   */
  public global(): Flags<AppendFlag<Value, 'g'>> {
    return this.add('g');
  }

  /**
   * @description Adds the 'i' (ignore case) flag.
   * @public
   * @returns {Flags<[...Value, 'i']>}
   */
  public ignore(): Flags<AppendFlag<Value, 'i'>> {
    return this.add('i');
  }

  /**
   * @description Adds the 'm' (multiline) flag.
   * @public
   * @returns {Flags<[...Value, 'm']>} 
   */
  public multiline(): Flags<AppendFlag<Value, 'm'>> {
    return this.add('m');
  }

  /**
   * @description Adds the 'u' (unicode) flag.
   * @public
   * @returns {Flags<[...Value, 'u']>} 
   */
  public unicode(): Flags<AppendFlag<Value, 'u'>> {
    return this.add('u');
  }

  /**
   * @description Adds the 'y' (sticky) flag.
   * @public
   * @returns {Flags<[...Value, 'y']>} 
   */
  public sticky(): Flags<AppendFlag<Value, 'y'>> {
    return this.add('y');
  }

  //#region Remove.
  /**
   * @description Removes the 's' (dotAll) flag.
   * @public
   * @returns {Flags<Exclude<Value[number], 's'>[]>}
   */
  public removeAny(): Flags<RemoveFlag<Value, 's'>> {
    return this.remove('s');
  }

  /**
   * @description Removes the 'g' (global) flag.
   * @public
   * @returns {Flags<Exclude<Value[number], 'g'>[]>}
   */
  public removeGlobal(): Flags<RemoveFlag<Value, 'g'>> {
    return this.remove('g');
  }

  /**
   * @description Removes the 'i' (ignore case) flag.
   * @public
   * @returns {Flags<Exclude<Value[number], 'i'>[]>}
   */
  public removeIgnore(): Flags<RemoveFlag<Value, 'i'>> {
    return this.remove('i');
  }

  /**
   * @description Removes the 'm' (multiline) flag.
   * @public
   * @returns {Flags<Exclude<Value[number], 'm'>[]>}
   */
  public removeMultiline(): Flags<RemoveFlag<Value, 'm'>> {
    return this.remove('m');
  }

  /**
   * @description Removes the 'u' (unicode) flag.
   * @public
   * @returns {Flags<Exclude<Value[number], 'u'>[]>}
   */
  public removeUnicode(): Flags<RemoveFlag<Value, 'u'>> {
    return this.remove('u');
  }

  /**
   * @description Removes the 'y' (sticky) flag.
   * @public
   * @returns {Flags<Exclude<Value[number], 'y'>[]>}
   */
  public removeSticky(): Flags<RemoveFlag<Value, 'y'>> {
    return this.remove('y');
  }
  //#endregion

  /**
   * @description Generic method to remove a flag while keeping tuple order.
   * @public
   * @param {RegExpFlag} flag - The flag to remove.
   * @returns {Flags<RemoveFlag<Value, typeof flag>>}
   */
  public remove<Flag extends RegExpFlag>(flag: Flag): Flags<RemoveFlag<Value, Flag>> {
    const updatedFlags = super.value.has(flag)
      ? (super.value as Set<RegExpFlag>).delete(flag) && Array.from(super.value)
      : Array.from(super.value);

    return new Flags(...(updatedFlags as RemoveFlag<Value, Flag>));
  }

  /**
   * @description Returns the flags as a concatenated string.
   * @public
   * @returns {FlagString<Value>} 
   */
  public override toString(): FlagString<Value> {
    return [...super.value].join('') as FlagString<Value>;
  }
}
