import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");

const headers = {
  Authorization: `Bearer ${token}`,
};

export const url = "https://blogify-backend-me.vercel.app";

export const getBlogAsync = createAsyncThunk("blog/getblog", async () => {
  try {
    const { data } = await axios.get(`${url}/blog/get`);
    return data;
  } catch (e) {
    return e;
  }
});

export const searchBlogAsync = createAsyncThunk(
  "blog/searchblog",
  async (name) => {
    try {
      const { data } = await axios.get(`${url}/blog/get?name=${name}`);
      return data;
    } catch (e) {
      return e;
    }
  }
);

export const getSingleBlogAsync = createAsyncThunk(
  "blog/getsingleblog",
  async (id) => {
    try {
      const { data } = await axios.get(`${url}/blog/get/${id}`);
      return data;
    } catch (e) {
      return e;
    }
  }
);

export const getMyBlogAsync = createAsyncThunk("blog/getmyblog", async (id) => {
  try {
    const { data } = await axios.get(`${url}/blog/get/me/${id}`, { headers });
    return data;
  } catch (e) {
    return e;
  }
});

export const addBlogAsync = createAsyncThunk(
  "blog/addblog",
  async (formData) => {
    try {
      const { data } = await axios.post(`${url}/blog/add`, formData, {
        headers,
      });
      return data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const deleteBlogAsync = createAsyncThunk(
  "blog/deleteblog",
  async ({ id, userId }) => {
    try {
      const { data } = await axios.delete(
        `${url}/blog/delete/${id}/${userId}`,
        { headers }
      );
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
);

export const editBlogAsync = createAsyncThunk(
  "blog/editblog",
  async ({ id, formData }) => {
    try {
      const { data } = await axios.put(`${url}/blog/edit/${id}`, formData, {
        headers,
      });
      return data;
    } catch (e) {
      return e;
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogData: [],
    loading: false,
    singleBlog: {},
    myBlog: [],
    error: "",
    searchData: [],
    newBlog: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getBlogAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBlogAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.blogData = action.payload;
    });

    builder.addCase(getSingleBlogAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSingleBlogAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.singleBlog = action.payload;
    });

    builder.addCase(getMyBlogAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMyBlogAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.myBlog = action.payload;
    });

    builder.addCase(addBlogAsync.pending, (state, action) => {
      state.newBlog = false;
    });
    builder.addCase(addBlogAsync.fulfilled, (state, action) => {
      state.newBlog = true;
      state.error = action.payload;
    });
    builder.addCase(addBlogAsync.rejected, (state, action) => {
      state.newBlog = false;
    });

    builder.addCase(searchBlogAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(searchBlogAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.searchData = action.payload;
    });
  },
});

export default blogSlice.reducer;
