import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import MovieForm from "./components/MovieForm";
import RegisterForm from "./components/RegisterForm";
import { Paths } from "./utils";

const apiUrl = "http://localhost:4000";

function App() {
  // const [user, setUser] = useState({ username: "", password: "" });

  function handleRegister(user) {
    fetch(`${apiUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => localStorage.setItem("token", res.data));
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
      .then((res) => localStorage.setItem("token", res.data));
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path={Paths.home}
          element={<LoginForm handleSubmit={handleLogin} />}
        />
        <Route
          path={Paths.register}
          element={<RegisterForm handleSubmit={handleRegister} />}
        />
        <Route path={Paths.movie} element={<MovieForm />} />
      </Routes>
    </div>
  );
}

export default App;
