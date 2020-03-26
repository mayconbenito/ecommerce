import crypto from 'crypto';
import { promisify } from 'util';

export default async function(): Promise<any> {
  const hash = await promisify(crypto.randomBytes)(16);

  const hex = hash.toString('hex');
  return Promise.resolve(hex);
}
