import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllStories } from "./storyApi";

const initialState = {
  listedStories: [],
  toggle: false,
  error: false,
  selectStory: [],
};
export const getAllListedStoriesAsync = createAsyncThunk(
  "story/getAll",
  async (data) => {
    const response = await getAllStories(data);
    return response.data;
  }
);

const storySlice = createSlice({
  name: "story",
  initialState,

  reducers: {
    setSelectStory: (state, action) => {
      state.selectStory = action.payload;
      state.toggle = state.toggle ? false : true;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(getAllListedStoriesAsync.pending, (state, action) => {
        state.error = false;
        state.listedStories = action.payload;
        state.toggle = state.toggle ? false : true;
      })
      .addCase(getAllListedStoriesAsync.fulfilled, (state, action) => {
        state.error = false;
        state.listedStories = action.payload;
        state.toggle = state.toggle ? false : true;
      })
      .addCase(getAllListedStoriesAsync.rejected, (state, action) => {
        state.error = true;
      });
  },
});

export const { setSelectStory } = storySlice.actions;

export const listedStories = (state) => state.story.listedStories;
export const selectStory = (state) => state.story.selectStory;
export const toggle = (state) => state.story.toggle;

export default storySlice.reducer;
