import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchBlogAsync } from "../../store/blogSlice";
import Blog from "../../components/Blog";
import NoBlog from "../../components/NoBlog";

const Search = () => {
  const dispatch = useDispatch();
  const { searchData, loading } = useSelector((state) => state.blog);
  const { search } = useSelector((state) => state.input);

  useEffect(() => {
    dispatch(searchBlogAsync(search));
    // eslint-disable-next-line
  }, [search]);

  if (search === "") {
    return <NoBlog msg="No blog found" />;
  }

  return (
    <div className="mt-28">
      <Blog data={searchData} loading={loading} />
    </div>
  );
};

export default Search;
