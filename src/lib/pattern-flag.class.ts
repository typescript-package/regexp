// Class.
import { Value } from "@typescript-package/core";
// Type.
import { FlagString } from "../type/regexp-flag-string.type";
import { RegExpFlag } from "@typedly/regexp";
import { AppendFlag } from "../type/append-flag.type";
import { RemoveFlag } from "../type/remove-flag.type";
/**
 * @description
 * @export
 * @class PatternFlag
 * @template {RegExpFlag[]} [Value=[]] 
 * @extends {Value<Set<RegExpFlag>>}
 */
export class PatternFlag<Value extends RegExpFlag[] = []> extends Value<Set<RegExpFlag>> {
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
   * @description Adds the 's' (dotAll) flag.
   * @public
   * @returns {PatternFlag<[...Value, 's']>} 
   */
  public any(): PatternFlag<AppendFlag<Value, 's'>> {
    return new PatternFlag(...([...super.value, 's'] as AppendFlag<Value, 's'>));
  }

  /**
   * @description the 'g' (global) flag.
   * @public
   * @returns {PatternFlag<[...Value, 'g']>}
   */
  public global(): PatternFlag<AppendFlag<Value, 'g'>> {
    return new PatternFlag(...[...super.value, 'g'] as AppendFlag<Value, 'g'>);
  }

  /**
   * @description Adds the 'i' (ignore case) flag.
   * @public
   * @returns {PatternFlag<[...Value, 'i']>}
   */
  public ignore(): PatternFlag<AppendFlag<Value, 'i'>> {
    return new PatternFlag(...([...super.value, 'i'] as AppendFlag<Value, 'i'>));
  }

  /**
   * @description Adds the 'm' (multiline) flag.
   * @public
   * @returns {PatternFlag<[...Value, 'm']>} 
   */
  public multiline(): PatternFlag<AppendFlag<Value, 'm'>> {
    return new PatternFlag(...([...super.value, 'm'] as AppendFlag<Value, 'm'>));
  }

  /**
   * @description Adds the 'u' (unicode) flag.
   * @public
   * @returns {PatternFlag<[...Value, 'u']>} 
   */
  public unicode(): PatternFlag<AppendFlag<Value, 'u'>> {
    return new PatternFlag(...([...super.value, 'u'] as AppendFlag<Value, 'u'>));
  }

  /**
   * @description Adds the 'y' (sticky) flag.
   * @public
   * @returns {PatternFlag<[...Value, 'y']>} 
   */
  public sticky(): PatternFlag<AppendFlag<Value, 'y'>> {
    return new PatternFlag(...([...super.value, 'y'] as AppendFlag<Value, 'y'>));
  }

  //#region Remove.
  /**
   * @description Removes the 's' (dotAll) flag.
   * @public
   * @returns {PatternFlag<Exclude<Value[number], 'g'>[]>}
   */
  public removeAny(): PatternFlag<RemoveFlag<Value, 's'>> {
    return this.removeFlag('s');
  }

  /**
   * @description Removes the 'g' (global) flag.
   * @public
   * @returns {PatternFlag<Exclude<Value[number], 'g'>[]>}
   */
  public removeGlobal(): PatternFlag<RemoveFlag<Value, 'g'>> {
    return this.removeFlag('g');
  }

  /**
   * @description Removes the 'i' (ignore case) flag.
   * @public
   * @returns {PatternFlag<Exclude<Value[number], 'g'>[]>}
   */
  public removeIgnore(): PatternFlag<RemoveFlag<Value, 'i'>> {
    return this.removeFlag('i');
  }

  /**
   * @description Removes the 'm' (multiline) flag.
   * @public
   * @returns {PatternFlag<Exclude<Value[number], 'g'>[]>}
   */
  public removeMultiline(): PatternFlag<RemoveFlag<Value, 'm'>> {
    return this.removeFlag('m');
  }

  /**
   * @description Removes the 'u' (unicode) flag.
   * @public
   * @returns {PatternFlag<Exclude<Value[number], 'g'>[]>}
   */
  public removeUnicode(): PatternFlag<RemoveFlag<Value, 'u'>> {
    return this.removeFlag('u');
  }

  /**
   * @description Removes the 'y' (sticky) flag.
   * @public
   * @returns {PatternFlag<Exclude<Value[number], 'g'>[]>}
   */
  public removeSticky(): PatternFlag<RemoveFlag<Value, 'y'>> {
    return this.removeFlag('y');
  }
  //#endregion

  /**
   * @description Generic method to remove a flag while keeping tuple order.
   * @public
   * @param {RegExpFlag} flag - The flag to remove.
   * @returns {PatternFlag<RemoveFlag<Value, typeof flag>>}
   */
  public removeFlag<Flag extends RegExpFlag>(flag: Flag): PatternFlag<RemoveFlag<Value, Flag>> {
    const updatedFlags = super.value.has(flag)
      ? (super.value as Set<RegExpFlag>).delete(flag) && Array.from(super.value)
      : Array.from(super.value);

    return new PatternFlag(...(updatedFlags as RemoveFlag<Value, Flag>));
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
