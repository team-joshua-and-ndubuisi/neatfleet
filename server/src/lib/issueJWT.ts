import dotenv from "dotenv";
import fs from "fs";
import jsonwebtoken from "jsonwebtoken";
import path from "path";
dotenv.config();

const rootDir = process.cwd();
const pathToPrivKey = path.join(rootDir, "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToPrivKey, "utf8");

function issueJWT(user: { _id: string }) {
  const _id = user._id;

  const expiresIn = "2h";

  const payload = {
    sub: _id,
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: signedToken,
    expires: expiresIn,
  };
}

module.exports = {
  issueJWT,
};
