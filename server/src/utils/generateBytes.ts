import crypto from 'crypto';
import { promisify } from 'util';

async function generateBytes(): Promise<string> {
  const hash = await promisify(crypto.randomBytes)(16);

  const hex = hash.toString('hex');
  return Promise.resolve(hex);
}

export default generateBytes;
