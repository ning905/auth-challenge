import { useEffect, useState } from "react";
import { apiUrl } from "../utils";

export default function MovieForm({ handleSubmit, handleLogout }) {
  const init = { title: "", description: "", runtimeMins: 60 };
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState(init);

  console.log("localStorage: ", localStorage.getItem("token"));

  function getMovieList() {
    fetch(`${apiUrl}/movie`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setMovies(res.data);
      });
  }

  useEffect(() => {
    getMovieList();
    console.log("Movie list: ", movies);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  function handleSubmitDecor(e) {
    e.preventDefault();
    handleSubmit(input);
    getMovieList();
  }

  return (
    <div>
      <form onSubmit={handleSubmitDecor}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={input.title}
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleChange}
            value={input.description}
          />
        </div>
        <div>
          <label htmlFor="runtimeMins">RuntimeMins: </label>
          <input
            type="number"
            id="runtimeMins"
            name="runtimeMins"
            onChange={handleChange}
            value={input.runtimeMins}
          />
        </div>
        <button type="submit">Add to list</button>
      </form>

      <button onClick={handleLogout}>Logout</button>

      <div>
        <h2>Movie list</h2>
        <ul>
          {movies.map((movie, index) => {
            return (
              <li key={index}>
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <p>{movie.runtimeMins}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
