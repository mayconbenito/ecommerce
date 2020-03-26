import crypto from 'crypto';

const generateHash = function(key: string, data: string): Promise<any> {
  return new Promise(resolve => {
    const hash = crypto.createHmac('sha512', key);
    hash.update(data);
    const hexHash = hash.digest('hex');
    resolve(hexHash);
  });
};

export default generateHash;
