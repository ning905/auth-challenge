const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllMovies(req, res) {
  const user = req.user;

  const movies = await prisma.movie.findMany({
    where: { creatorId: user.id },
  });

  res.status(200).json({ data: movies });
}

async function createMovie(req, res) {
  const { title, description, runtimeMins } = req.body;

  const movie = await prisma.movie.create({
    data: { title, description, runtimeMins, creatorId: req.user.id },
  });

  res.status(200).json({ data: movie, msg: "Movie created successfully" });
}

module.exports = {
  getAllMovies,
  createMovie,
};
