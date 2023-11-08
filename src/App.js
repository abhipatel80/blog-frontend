import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import "./App.css";

const BlogPost = lazy(() => import("./pages/blog/BlogPost"));
const MyBlog = lazy(() => import("./pages/blog/MyBlog"));
const SingleBlog = lazy(() => import("./pages/blog/SingleBlog"));
const EditBlog = lazy(() => import("./pages/addAndEditblog/EditBlog"));
const AddBlog = lazy(() => import("./pages/addAndEditblog/AddBlog"));

const Profile = lazy(() => import("./pages/profile/Profile"));
const Search = lazy(() => import("./pages/search/Search"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<BlogPost />} />
            <Route path="/:id" element={<SingleBlog />} />

            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/myprofile" element={<Profile />} />

            <Route path="/myblog" element={<MyBlog />} />
            <Route path="/addblog" element={<AddBlog />} />
            <Route path="/editblog/:id" element={<EditBlog />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
