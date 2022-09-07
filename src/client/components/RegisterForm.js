import { useState } from "react";
import { Link } from "react-router-dom";
import { Paths } from "../utils";

export default function RegisterForm({ handleSubmit }) {
  const [input, setInput] = useState({ username: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  async function handleSubmitDecor(e) {
    e.preventDefault();
    handleSubmit(input);
  }

  return (
    <div>
      <form onSubmit={handleSubmitDecor}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={input.username}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
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
