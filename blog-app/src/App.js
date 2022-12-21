import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Blog } from "./components/Blog";
import { AuthContextProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { CreateBlogPost } from "./components/CreateBlogPost";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route
            path="/"
            element={user ? <Blog></Blog> : <Navigate to="/login" />}
          ></Route>
          <Route path="/login" element={<Login></Login>} />
          <Route
            path="/blog/:username"
            element={user ? <Blog></Blog> : <Navigate to="/login" />}
          />

          <Route
            path="/blog"
            element={user ? <Blog></Blog> : <Navigate to="/login" />}
          />

          <Route
            path="/new"
            element={
              user ? (
                <CreateBlogPost></CreateBlogPost>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
