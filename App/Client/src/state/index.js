import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: "667778324f82eb7c5c5913d1",
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
    },
},);

export default globalSlice.reducer;