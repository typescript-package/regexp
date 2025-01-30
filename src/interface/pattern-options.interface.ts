/**
 * @description
 * @export
 * @interface PatternOptions
 * @template {boolean} [Lowercase=boolean] 
 * @template {boolean} [Uppercase=boolean] 
 * @template {boolean} [Numeric=boolean] 
 * @template {boolean} [Special=boolean] 
 */
export interface PatternOptions<
  Lowercase extends boolean = boolean,
  Uppercase extends boolean= boolean,
  Numeric extends boolean= boolean,
  Special extends boolean= boolean,
> {
  lowercase?: Lowercase;
  uppercase?: Uppercase;
  numeric?: Numeric;
  special?: Special;
}
