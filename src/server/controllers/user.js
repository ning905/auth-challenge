const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);
  res.status(200).json({ data: token });
}

async function login(req, res) {
  const { username, password } = req.body;
  const foundUser = await prisma.user.findUnique({
    where: { username },
  });

  if (!foundUser) {
    return res.status(404).json({ msg: "Invalid username or password." });
  }

  const passwordMatch = await bcrypt.compare(password, foundUser.password);
  if (!passwordMatch) {
    return res.status(404).json({ msg: "Invalid username or password." });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);

  res.status(200).json({ data: token });
}

module.exports = {
  register,
  login,
};
