const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

const auth = async (req, res, next) => {
  const [_, token] = req.get("Authorization").split(" ");
  const decoded = jwt.verify(token, jwtSecret);
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });
  req.user = user;

  next();
};

module.exports = auth;
