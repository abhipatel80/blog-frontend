import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBlogAsync } from "../../store/blogSlice";
import Blog from "../../components/Blog";
import { useNavigate } from "react-router-dom";
import NoBlog from "../../components/NoBlog";

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
    return <NoBlog msg="You have not posted any blog yet" />;
  }

  return (
    <div className="mt-28">
      <Blog data={myBlog} loading={loading} />
    </div>
  );
};

export default MyBlog;
