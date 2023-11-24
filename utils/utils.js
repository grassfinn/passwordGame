export default function randomLetter(ascii = 97,letterIndex) {
  const randomLetter = Math.floor(Math.random() * 26) + ascii;
  let char = String.fromCharCode(randomLetter);
  return char;
}
