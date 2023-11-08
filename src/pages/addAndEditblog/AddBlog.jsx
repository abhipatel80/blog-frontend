import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlogAsync } from "../../store/blogSlice";
import { change } from "../../utils/change";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddBlog = () => {
  const [input, setinput] = useState({
    title: "",
    description: "",
  });

  const [blogImage, setBlogImage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, newBlog } = useSelector((state) => state.blog);

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", blogImage);
    formData.append("title", input.title);
    formData.append("description", input.description);
    dispatch(addBlogAsync(formData));
    if (newBlog === true || typeof error !== "string") {
      navigate("/myblog");
    }
  };

  const editorchange = (e, editor) => {
    const content = editor.getData();
    setinput({ ...input, description: content });
  };

  const token = localStorage.getItem("token");
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

  return (
    <div>
      <div className="grid justify-center items-center m-10 mt-28">
        <form
          onSubmit={submit}
          className="md:shadow-lg shadow-md lg:w-[40rem] md:w-[30rem] sm:w-[25rem] w-[15rem] px-10 rounded-md py-7 bg-white"
        >
          <p className="text-red-600">
            {typeof error === "string" ? error : ""}
          </p>
          <div className="inputs">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              required
              className="input"
              placeholder="title"
              onChange={(e) => change(e, setinput)}
              name="title"
              id="title"
            />
          </div>
          <div className="inputs">
            <h2 className="description">Description</h2>
            <div className="mt-2 mb-2">
              <CKEditor
                onChange={(e, editor) => editorchange(e, editor)}
                name="description"
                id="description"
                data={input.description}
                editor={ClassicEditor}
              />
            </div>
          </div>
          <div className="inputs">
            <label htmlFor="blogImage">Image</label>
            <input
              type="file"
              className="input"
              required
              placeholder="image"
              onChange={(e) => setBlogImage(e.target.files[0])}
              name="blogImage"
              id="blogImage"
            />
          </div>
          <p className="md:text-sm text-xs">
            Upload an image (JPG or PNG) with a maximum size of 2 MB.
          </p>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 md:text-base text-sm text-white px-5 py-1.5 
          rounded-md cursor-pointer mt-4"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
