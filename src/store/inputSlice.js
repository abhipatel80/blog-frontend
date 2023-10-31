import { createSlice } from "@reduxjs/toolkit";

const inputSlice = createSlice({
    name: "input",
    initialState: {
        search: "",
    },
    reducers: {
        getInputValue: (state, action) => {
            state.search = action.payload
        }
    }
});

export const { getInputValue } = inputSlice.actions;

export default inputSlice.reducer;
