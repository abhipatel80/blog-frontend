import { createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
}

export const addCommentAsync = createAsyncThunk(
    "comment/addcomment",
    async ({ comment, blogId }) => {
        try {
            const { data } = await fetch("http://localhost:4000/blog/comment", {
                method: "PUT",
                headers,
                body: JSON.stringify({ comment, blogId })
            });
            return data;
        } catch (e) {
            return e;
        }
    }
)

export const deleteCommentAsync = createAsyncThunk(
    "comment/deletecomment",
    async ({ blogId, commentId: id }) => {
        try {
            const { data } = await fetch(`http://localhost:4000/blog/comment?blogId=${blogId}&id=${id}`, {
                method: "DELETE",
                headers,
            });
            return data;
        } catch (e) {
            return e;
        }
    }
)
