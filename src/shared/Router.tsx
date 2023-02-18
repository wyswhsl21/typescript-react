import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Todo from "../components/Todo";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
