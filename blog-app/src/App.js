import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Blog } from "./components/Blog";
import { Navbar } from "./components/Navbar";
import { CreateBlogPost } from "./components/CreateBlogPost";
import { useAuthContext } from "./hooks/useAuthContext";
import { EditBlogPost } from "./components/EditBlogPost";
import { DetailedBlogPost } from "./components/DetailedBlogPost";
import { setupInterceptors } from "./components/http/axios";

function App() {
  const { user, dispatch } = useAuthContext();
  setupInterceptors(dispatch);

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
        <Route path="/edit" element={user ? <EditBlogPost /> : <Login />} />
        <Route path="/post" element={user ? <DetailedBlogPost /> : <Login />} />
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
