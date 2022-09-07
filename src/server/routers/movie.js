const express = require("express");
const { getAllMovies, createMovie } = require("../controllers/movie");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllMovies);
router.post("/", auth, createMovie);

module.exports = router;
