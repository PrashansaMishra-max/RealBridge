import { createSlice } from "@reduxjs/toolkit";

const problemSlice = createSlice({
    name: "problem",
    initialState: {
        allProblems: [],
        singleProblem: null,
        searchedQuery: "",
    },
    reducers: {
        setAllProblems: (state, action) => {
            state.allProblems = action.payload;
        },
        setSingleProblem: (state, action) => {
            state.singleProblem = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        }
    }
});

export const { setAllProblems, setSingleProblem, setSearchedQuery } = problemSlice.actions;
export default problemSlice.reducer;