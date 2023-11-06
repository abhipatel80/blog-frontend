import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBlogAsync } from "../../store/blogSlice";
import Blog from "../../components/Blog";
import { NavLink, useNavigate } from "react-router-dom";

const MyBlog = () => {
  const { myBlog, loading } = useSelector((state) => state.blog);

  const dispatch = useDispatch();
  const id = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(getMyBlogAsync(id));
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/user/login");
    }
    // eslint-disable-next-line
  }, [token]);

  if (myBlog.length <= 0) {
    return (
      <>
        <div className="bg-white w-[50rem] mx-auto h-[30rem] flex items-center justify-center rounded-md shadow-lg mt-28">
          <h2 className="text-center text-3xl">
            You have not posted any blog yet
          </h2>
          <NavLink to="/" className="mt-32 absolute">
            <button
              className="py-1.5 px-6 text-md text-white hover:bg-purple-700 bg-purple-600 
            rounded-md"
            >
              Home
            </button>
          </NavLink>
        </div>
      </>
    );
  }

  return (
    <div className="mt-28">
      <Blog data={myBlog} loading={loading} />
    </div>
  );
};

export default MyBlog;
