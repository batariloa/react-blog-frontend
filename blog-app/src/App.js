import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Blog } from "./components/Blog";
import { Navbar } from "./components/Navbar";
import { CreateBlogPost } from "./components/CreateBlogPost";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  console.log(" USEER APP ", user);

  if (user) console.log("USER IS TRUE");
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={user ? <Blog></Blog> : <Login />}></Route>
        <Route path="/login" element={<Login></Login>} />
        <Route
          path="/blog/:username"
          element={user ? <Blog></Blog> : <Login />}
        />

        <Route path="/blog" element={user ? <Blog /> : <Login />} />

        <Route path="/new" element={user ? <CreateBlogPost /> : <Login />} />
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
