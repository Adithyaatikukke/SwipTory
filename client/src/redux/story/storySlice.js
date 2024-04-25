import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllStories, getShareStory, likeStory } from "./storyApi";

const initialState = {
  listedStories: [],
  toggle: false,
  error: false,
  category: "All",
  shareStoryError: false,
  selectStory: [],
  shareStory: {},
  stories: {},
  shareStoryToggle: false,
};
export const getAllListedStoriesAsync = createAsyncThunk(
  "story/getAll",
  async (data) => {
    const response = await getAllStories(data);
    return response.data;
  }
);

export const getSahreStoryAsync = createAsyncThunk(
  "story/shareStory",
  async (id) => {
    const response = await getShareStory(id);
    return response.data;
  }
);
export const likeStoryAysnc = createAsyncThunk("like/story", async (data) => {
  const response = await likeStory(data);
  return response.data;
});
const storySlice = createSlice({
  name: "story",
  initialState,

  reducers: {
    setSelectStory: (state, action) => {
      state.selectStory = action.payload;
      state.toggle = state.toggle ? false : true;
    },
    setCategory: (state, action) => {
      const { category, stories } = action.payload;
      state.category = category;
      state.stories = stories;
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
      })
      .addCase(getSahreStoryAsync.pending, (state, action) => {
        state.error = false;
        state.shareStoryError = false;
      })
      .addCase(getSahreStoryAsync.fulfilled, (state, action) => {
        state.error = false;
        state.shareStoryError = false;
        state.selectStory = action.payload;
        state.shareStoryToggle = state.shareStoryToggle ? false : true;
      })
      .addCase(getSahreStoryAsync.rejected, (state, action) => {
        state.error = true;
        state.shareStoryError = true;
        state.shareStoryToggle = state.shareStoryToggle ? false : true;
      })
      .addCase(likeStoryAysnc.pending, (state, action) => {})
      .addCase(likeStoryAysnc.fulfilled, (state, action) => {
        state.toggle = state.toggle ? false : true;
        state.selectStory = action.payload;
      })
      .addCase(likeStoryAysnc.rejected, (state, action) => {
        state.toggle = state.toggle ? false : true;
      });
  },
});

export const { setSelectStory, setCategory } = storySlice.actions;

export const listedStories = (state) => state.story.listedStories;
export const shareStoryError = (state) => state.story.shareStoryError;
export const selectStory = (state) => state.story.selectStory;
export const shareStory = (state) => state.story.shareStory;
export const toggle = (state) => state.story.toggle;
export const stories = (state) => state.story.stories;
export const shareStoryToggle = (state) => state.story.shareStoryToggle;
export const category = (state) => state.story.category;

export default storySlice.reducer;
