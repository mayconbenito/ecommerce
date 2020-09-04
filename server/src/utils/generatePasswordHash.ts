import crypto from 'crypto';

function generateHash(key: string, data: string): Promise<string> {
  return new Promise(resolve => {
    const hash = crypto.createHmac('sha512', key);
    hash.update(data);

    const hexHash = hash.digest('hex');
    resolve(hexHash);
  });
}

export default generateHash;
