require("dotenv").config();
import fs from "fs";
import path from "path";
import jsonwebtoken from "jsonwebtoken";

const rootDir = process.cwd();
const pathToPrivKey = path.join(rootDir, "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToPrivKey, "utf8");

function issueJWT(user: { id: string }) {
  const _id = user.id;

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

export { issueJWT };
