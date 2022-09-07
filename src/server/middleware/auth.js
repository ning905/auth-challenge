const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

const auth = async (req, res, next) => {
  const [_, token] = req.get("Authorization").split(" ");
  console.log("token: ", token);
  const decoded = jwt.verify(token, jwtSecret);
  console.log("decoding");
  console.log("decoded", decoded);
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });
  console.log("user", user);
  req.user = user;

  next();
};

module.exports = auth;
