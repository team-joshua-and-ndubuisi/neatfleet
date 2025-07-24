import dotenv from 'dotenv';
import fs from 'fs';
import jsonwebtoken from 'jsonwebtoken';
import path from 'path';
dotenv.config();

const rootDir = process.cwd();
const pathToPrivKey = path.join(rootDir, 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf8');

function issueJWT(user: { id: string }) {
  const id = user.id;

  const expiresIn = '2h';

  const payload = {
    sub: id,
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: 'RS256',
  });

  return {
    token: signedToken,
    expiresIn: expiresIn,
  };
}

export default issueJWT;
