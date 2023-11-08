import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleBlogAsync } from "../../store/blogSlice";
import { dateFormat } from "../../utils/dateFormat";
import { addCommentAsync, deleteCommentAsync } from "../../store/commentSlice";
import parse from "html-react-parser";
import Loading from "../../components/Loading";

const SingleBlog = () => {
  const [comment, setcomment] = useState();

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleBlog: data, loading } = useSelector((state) => state.blog);

  const postComment = () => {
    dispatch(addCommentAsync({ comment, blogId: id }));
    setcomment("");
  };

  useEffect(() => {
    dispatch(getSingleBlogAsync(id));
    // eslint-disable-next-line
  }, [id]);

  const deleteComment = (commentId) => {
    dispatch(deleteCommentAsync({ blogId: id, commentId }));
  };

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token) {
      navigate("/user/login");
    }
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="justify-items-center grid my-10 mt-28">
        <div className="shadow-md bg-white md:w-4/6 rounded-md p-7">
          <h1 className="md:text-2xl text-lg font-semibold pb-1 text-center">
            {data?.title}
          </h1>
          <div className="justify-center items-center w-full flex text-sm md:text-lg text-gray-500">
            {data?.userId?.image?.startsWith("https") ? (
              <img
                src={`${data.userId?.image}`}
                alt="user"
                className="md:w-12 w-10 md:h-12 h-10 rounded-full object-cover"
              />
            ) : (
              <img
                src="/default-profile-img.png"
                alt="user"
                className="md:w-12 w-10 md:h-12 h-10 rounded-full object-cover"
              />
            )}
            <p className="pl-4">{data.userName}</p>
            <p className="pl-1"> · {dateFormat(data.createdAt)}</p>
          </div>
          <div className="justify-items-center grid m-8">
            {data?.blogImage?.startsWith("https") ? (
              <img
                src={`${data.blogImage}`}
                alt="blog"
                className="md:w-2/3 rounded-md"
              />
            ) : (
              <img
                src="/default-blog.png"
                alt="blog"
                className="md:w-2/3 rounded-md"
              />
            )}
          </div>
          <p className="text-sm md:text-lg">
            {data?.description && typeof data?.description === "string"
              ? parse(data?.description)
              : ""}
          </p>
        </div>
        <div className="shadow-md bg-white md:w-4/6 w-full rounded-md p-7 mt-10">
          <h1 className="text-xl font-semibold pb-7">Add a new comment</h1>
          <div>
            <textarea
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
              className="border-slate-500 border-2 text-black-500 bg-gray-100 rounded-md 
                        px-4 py-2 w-full h-24 resize-none"
              placeholder="Type Your Comment"
            />
          </div>
          <button
            onClick={postComment}
            className="py-2 px-4 text-white hover:bg-purple-700
                     text-sm mt-5 bg-purple-600 rounded-md"
          >
            Post Comment
          </button>
        </div>
        <div className="shadow-md bg-white md:w-4/6 w-full rounded-md p-7 mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            {data.totalComments >= 1
              ? `Comments (${data.totalComments})`
              : "Comments"}
          </h2>
          <hr />
          {data?.comments?.map((val) => {
            return (
              <div
                className="border mt-2 p-3 rounded-md md:w-1/2 w-full"
                key={val._id}
              >
                <h2 className="font-semibold text-lg tracking-wide mb-1">
                  {val.name}
                  <span className="text-sm ml-2 text-gray-600 font-light">
                    {dateFormat(val.createdAt)}
                  </span>
                  {userId === val.userId ? (
                    <button onClick={() => deleteComment(val._id)}>
                      <i className="fa-solid fa-trash fa-md hover:text-red-600 ml-4"></i>
                    </button>
                  ) : (
                    ""
                  )}
                </h2>
                <p>{val.comment}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
