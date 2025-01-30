import { Pattern } from "../lib";

const pattern = new Pattern({
  lowercase: false,
  uppercase: true,
  special: false
});

console.log('abc DEF 1 2 3 $$$ ###'.replace(pattern.value!, ''), pattern.value);

