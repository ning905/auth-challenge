import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import MovieForm from "./components/MovieForm";
import RegisterForm from "./components/RegisterForm";
import { Paths, apiUrl } from "./utils";

function App() {
  // const [user, setUser] = useState({ username: "", password: "" });
  const [info, setInfo] = useState("Please register or login");
  const navigate = useNavigate();
  console.log("localStorage: ", localStorage.getItem("token"));

  function handleRegister(user) {
    fetch(`${apiUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setInfo(res.msg);
        localStorage.setItem("token", res.data);
        console.log(localStorage);
      })
      .then(() => navigate(Paths.movie));
  }

  function handleLogin(user) {
    fetch(`${apiUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.data);
      })
      .then(() => navigate(Paths.movie));
  }

  function handleAddMovie(movie) {
    fetch(`${apiUrl}/movie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(movie),
    })
      .then((res) => res.json())
      .then((res) => {
        setInfo(res.msg);
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate(Paths.home);
    setInfo("Please register or login");
  }

  return (
    <div className="App">
      {info && <p>{info}</p>}
      <Routes>
        <Route
          path={Paths.home}
          element={<LoginForm handleSubmit={handleLogin} />}
        />
        <Route
          path={Paths.register}
          element={<RegisterForm handleSubmit={handleRegister} />}
        />
        <Route
          path={Paths.movie}
          element={
            <MovieForm
              handleSubmit={handleAddMovie}
              handleLogout={handleLogout}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
