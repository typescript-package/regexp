import { RangePattern } from "../lib";

const rangePattern = new RangePattern('a', 'z', true);

console.group(`RangePattern`);

console.debug(rangePattern);
console.debug(rangePattern.pattern);

console.groupEnd();

let range = new RangePattern('a', 'z');
let rangeNegation = new RangePattern('a', 'z', true);

describe('RangePattern', () => {
  beforeEach(() => {
    range = new RangePattern('a', 'z');
    rangeNegation = new RangePattern('a', 'z', true);
  });
  it('should create a RangePattern with the correct from and to values', () => {
    expect(range.from).toBe('a');
    expect(range.to).toBe('z');
  });

  it('should create a RangePattern with negated set to false by default', () => {
    expect(range.negated).toBe(false);
  });

  it('should create a RangePattern with negated set to true', () => {
    expect(rangeNegation.negated).toBe(true);
  });

  it('should toggle the negation state correctly', () => {
    const negatedRange = rangeNegation.negate();
    expect(negatedRange.negated).toBe(false);

    const reNegatedRange = negatedRange.negate();
    expect(reNegatedRange.negated).toBe(true);
  });

  it('should correctly output the pattern string', () => {
    expect(range.toString()).toBe('[a-z]');
  });

  it('should output the negated pattern string', () => {
    expect(rangeNegation.toString()).toBe('[^a-z]');
  });

  it('should toggle negation and update the pattern string', () => {
    expect(rangeNegation.toString()).toBe('[^a-z]');
    expect(rangeNegation.negate().toString()).toBe('[a-z]');
  });

  describe('toRegExp()', () => {
    it('should create a valid regex from the range', () => {
      const regex = range.toRegExp();
      expect(regex.test('a')).toBeTrue();
      expect(regex.test('z')).toBeTrue();
      expect(regex.test('m')).toBeTrue();
      expect(regex.test('1')).toBeFalse(); // Not in the range
      expect(regex.test('A')).toBeFalse(); // Case-sensitive
    });

    it('should apply the case-insensitive flag', () => {
      const regex = range.toRegExp('i'); // 'i' flag for case-insensitivity
      expect(regex.test('A')).toBeTrue();
      expect(regex.test('Z')).toBeTrue();
    });

    it('should include anchors when specified', () => {
      const regex = range.toRegExp('', true); // With anchors (^ and $)
      expect(regex.test('a')).toBeTrue();
      expect(regex.test('z')).toBeTrue();
      expect(regex.test('az')).toBeFalse(); // Should fail due to anchors
      expect(regex.test('za')).toBeFalse();
    });

    it('should escape special characters when required', () => {
      const specialRange = new RangePattern('[', ']');
      const regex = specialRange.toRegExp('', false, true); // Escape special chars
      console.log(regex);
      expect(regex.test('[')).toBeTrue();
      // expect(regex.test(']')).toBeTrue();
      expect(regex.test('-')).toBeFalse(); // Not in range
    });

    it('should correctly negate the range', () => {
      const negatedRange = new RangePattern('a', 'z', true);
      const regex = negatedRange.toRegExp();
      expect(regex.test('1')).toBeTrue(); // Should match anything outside 'a' to 'z'
      expect(regex.test('A')).toBeTrue(); // Case-sensitive
      expect(regex.test('m')).toBeFalse(); // Inside the range, so should not match
    });
  });

});
