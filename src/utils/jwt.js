import jwt from "jsonwebtoken";

function createJWT(data) {
  return jwt.sign(data, "my-secret");
}

export default createJWT;
