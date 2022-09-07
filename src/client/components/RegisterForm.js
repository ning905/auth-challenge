import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../utils";

export default function RegisterForm() {
  const [input, setInput] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  function handleSubmitDecor(e) {
    e.preventDefault();
    handleSubmit(input);
    navigate(Paths.movie);
  }

  return (
    <div>
      <form onSubmit={handleSubmitDecor}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={input.username}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={input.password}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? Go to <Link to={Paths.home}>login</Link>
      </p>
    </div>
  );
}
