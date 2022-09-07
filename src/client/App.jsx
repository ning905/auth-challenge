import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import MovieForm from "./components/MovieForm";
import RegisterForm from "./components/RegisterForm";
import { Paths } from "./utils";

const apiUrl = "http://localhost:4000";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={Paths.home} element={<LoginForm />} />
        <Route path={Paths.register} element={<RegisterForm />} />
        <Route path={Paths.movie} element={<MovieForm />} />
      </Routes>
    </div>
  );
}

export default App;
