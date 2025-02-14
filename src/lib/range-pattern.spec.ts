import { RangePattern } from "../lib";

const rangePattern = new RangePattern('a', 'z', true);

console.group(`RangePattern`);

console.debug(rangePattern);
console.debug(rangePattern.pattern);

console.groupEnd();

describe('RangePattern', () => {
  it('should create a RangePattern with the correct from and to values', () => {
    const range = new RangePattern('a', 'z');
    expect(range.from).toBe('a');
    expect(range.to).toBe('z');
  });

  it('should create a RangePattern with negated set to false by default', () => {
    const range = new RangePattern('a', 'z');
    expect(range.negated).toBe(false);
  });

  it('should create a RangePattern with negated set to true', () => {
    const range = new RangePattern('a', 'z', true);
    expect(range.negated).toBe(true);
  });

  it('should toggle the negation state correctly', () => {
    const range = new RangePattern('a', 'z', true);
    const negatedRange = range.negate();
    expect(negatedRange.negated).toBe(false);

    const reNegatedRange = negatedRange.negate();
    expect(reNegatedRange.negated).toBe(true);
  });

  it('should correctly output the pattern string', () => {
    const range = new RangePattern('a', 'z');
    expect(range.toString()).toBe('[a-z]');
  });

  it('should output the negated pattern string', () => {
    const range = new RangePattern('a', 'z', true);
    expect(range.toString()).toBe('[^a-z]');
  });

  it('should toggle negation and update the pattern string', () => {
    const range = new RangePattern('a', 'z', true);
    expect(range.toString()).toBe('[^a-z]');

    const negatedRange = range.negate();
    expect(negatedRange.toString()).toBe('[a-z]');
  });
});
