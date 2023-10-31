import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { url } from "./blogSlice";

const token = localStorage.getItem("token");

const headers = {
    "Authorization": `Bearer ${token}`
}

export const registerAsync = createAsyncThunk(
    "user/register",
    async (formData) => {
        try {
            const { data } = await axios.post(`${url}/user/register`, formData);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user._id);
            return data;
        } catch (e) {
            return e.response.data;
        }
    }
)

export const logoutAsync = createAsyncThunk(
    "user/logout",
    async () => {
        try {
            await axios.delete(`${url}/user/logout`, { headers });
            localStorage.clear();
        } catch (e) {
            return e.response.data;
        }
    }
)

export const loginAsync = createAsyncThunk(
    "user/login",
    async (input) => {
        try {
            const { data } = await axios.post(`${url}/user/login`, input);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user._id);
            return data;
        } catch (e) {
            return e.response.data;
        }
    }
)

export const getUserAsync = createAsyncThunk(
    "user/getuser",
    async (id) => {
        try {
            const { data } = await axios.get(`${url}/user/${id}`, { headers });
            return data;
        } catch (e) {
            return e.response.data;
        }
    }
)

export const editUserAsync = createAsyncThunk(
    "user/edituser",
    async ({ userId: id, formData }) => {
        try {
            const { data } = await axios.put(`${url}/user/edit/${id}`, formData, { headers });
            return data;
        } catch (e) {
            return e.response.data;
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        error: "",
        activeUser: {},
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            state.error = action.payload
        })
        builder.addCase(registerAsync.fulfilled, (state, action) => {
            state.error = action.payload
        })
        builder.addCase(getUserAsync.fulfilled, (state, action) => {
            state.activeUser = action.payload
        })
    }
})

export default userSlice.reducer;
