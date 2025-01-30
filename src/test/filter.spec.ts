import { Filter } from "../lib";

// Test string containing all character types
const testString = 'abcABC123!@#';

const filter = new Filter(testString, {lowercase: false, uppercase: true, numeric: true, special: true});

// Check if the string matches the filter
const result = filter.isValid(testString);

filter.setMode('allow');

console.log('Is Valid:', result); // Will check whether it matches the pattern
console.log('Pattern:', filter.pattern.value); // Display the RegExp value
console.log('Value:', filter.value); // Display the RegExp value

console.log(`filter.apply`, filter.apply(testString), filter.pattern.isRestricted());
