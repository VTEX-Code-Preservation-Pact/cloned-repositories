// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypt = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'pTYL1sdmp9WjRRIqCc7rdxs01lwr2dn2';

export const encrypt = (text) => {
  try {
    const iv = crypt.randomBytes(16);
    const cipher = crypt.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return Buffer.from(
      `${iv.toString('hex')}|${encrypted.toString('hex')}`,
    ).toString('base64');
  } catch {
    return null;
  }
};

export const decrypt = (hash) => {
  try {
    const data = Buffer.from(hash, 'base64').toString('ascii');

    const decipher = crypt.createDecipheriv(
      algorithm,
      secretKey,
      Buffer.from(data.split('|')[0], 'hex'),
    );

    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(data.split('|')[1], 'hex')),
      decipher.final(),
    ]);
    return decrpyted.toString();
  } catch {
    return hash;
  }
};
