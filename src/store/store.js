import { configureStore } from "@reduxjs/toolkit"
import blogSlice from "./blogSlice";
import userSlice from "./userSlice";
import inputSlice from "./inputSlice";

const store = configureStore({
    reducer: {
        blog: blogSlice,
        user: userSlice,
        input: inputSlice,
    }
});

export default store;
