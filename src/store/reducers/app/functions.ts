const symbols = ['@', '!', '-', '#', '(', ')', '+'];
const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generateToastID = (): string => {
  const random5Digits = Math.ceil(Math.random() * 10000 + 1);
  const randomSymbol = Math.floor(Math.random() * symbols.length);
  const randomHex = Math.ceil(Math.random() * 100 + 1);
  const randomAlpha = Math.floor(Math.random() * (alpha.length - 3));

  return `${random5Digits}-${randomHex}${randomSymbol}${randomAlpha}`;
}