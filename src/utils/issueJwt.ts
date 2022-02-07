import jsonwebtoken from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { UserDoc } from '@models/user';

const pathToKey = path.join(__dirname, '../keys', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

export const issueJWT = (user: UserDoc) => {
  const id = user.id;
  const expiresIn = 1;

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: 'RS256',
  });

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  };
};
