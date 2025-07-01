import { webcrypto } from 'crypto';

export const generateRandomStr = (length = 15) => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$';

  return Array.from(webcrypto.getRandomValues(new Uint32Array(length)))
    .map((x) => characters[x % characters.length])
    .join('');
};
