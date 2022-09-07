const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function auth(req, res, next) {
  const [_, token] = req.get("Authorization");

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await prisma.user.findUnique({
    where: { username: decoded.username },
  });
  req.user = user;

  next();
}

module.exports = auth;
