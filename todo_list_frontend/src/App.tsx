import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages/AuthForm";
import Layout from "./pages/Layout";
import { Todos } from "./pages/Todos";
import LoginPersistent from "./pages/AuthForm/LoginPersistent";
import { About } from "./pages/About";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<LoginPersistent />}>
            <Route path="/" element={<Todos />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
export default App;
