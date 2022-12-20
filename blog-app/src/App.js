import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Blog } from "./components/Blog";
import { AuthContextProvider } from "./context/AuthContext";
import { useState, useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { CreateBlogPost } from "./components/CreateBlogPost";
function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/login" element={<Login></Login>} />
          <Route path="/blog" element={<Blog></Blog>} />
          <Route path="/new" element={<CreateBlogPost></CreateBlogPost>} />
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
