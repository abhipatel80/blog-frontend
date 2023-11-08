import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { dateFormat } from "../utils/dateFormat";
import { deleteBlogAsync } from "../store/blogSlice";
import { useDispatch } from "react-redux";
import parse from "html-react-parser";
import Loading from "./Loading";
import NoBlog from "./NoBlog";

const Blog = ({ data, loading }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const navigate = useNavigate();

  const editBlog = (id) => {
    navigate(`/editblog/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (data.length <= 0) {
    return <NoBlog msg="No blog found" />;
  }

  return (
    <>
      {data?.map((val) => {
        return (
          <div className="justify-items-center grid my-10" key={val._id}>
            <div className="shadow-md bg-white md:w-4/6 w-full rounded-md p-7">
              <div className="md:text-2xl text-lg font-semibold pb-4 flex">
                {val.title}
                {location.pathname === "/myblog" ? (
                  <span className="ml-auto">
                    <button onClick={() => editBlog(val._id)}>
                      <i className="fa-solid fa-pen-to-square mr-7 hover:text-green-700 cursor-pointer"></i>
                    </button>
                    <button
                      onClick={() =>
                        dispatch(
                          deleteBlogAsync({ id: val._id, userId: val.userId })
                        )
                      }
                    >
                      <i className="fa-solid fa-trash cursor-pointer hover:text-red-600"></i>
                    </button>
                  </span>
                ) : (
                  ""
                )}
              </div>
              <h2 className="pb-4 text-sm md:text-lg text-gray-500">
                {val.userName}
                <span className="pl-1 text-2xl"> · </span>{" "}
                {dateFormat(val.createdAt)}
              </h2>
              <div className="text-sm md:text-lg">
                {parse(val.description.slice(0, 300))}
                <span>
                  {val.description.split("").length <= 300 ? "" : "..."}
                </span>
              </div>
              <NavLink to={`/${val._id}`}>
                <button className="py-2 px-6 text-sm text-white hover:bg-purple-700 mt-2 bg-purple-600 rounded-md">
                  Read More
                </button>
              </NavLink>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Blog;
