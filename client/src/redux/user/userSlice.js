import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToBookmark,
  createStory,
  editUserStory,
  getloggedinUser,
  getUserAllStories,
  likeStory,
  loginUser,
  registerUser,
} from "./userApi";

const initialState = {
  user: {},
  userStores: [],
  userFatching: false,
  userError: false,
  registerError: false,
  siginError: false,
  userToggle: false,
  storyToggle: false,
  userAllStories: [],
  userStoryToggle: false,
  bookMarkToggle: false,
};

export const registerUserAysnc = createAsyncThunk(
  "user/register",
  async (data) => {
    const response = await registerUser(data);
    return response.data;
  }
);
export const loginUserAysnc = createAsyncThunk("user/login", async (data) => {
  const response = await loginUser(data);
  return response.data;
});

export const getLoggedinUserAysnc = createAsyncThunk(
  "user/get/login",
  async () => {
    const response = await getloggedinUser();
    return response.data;
  }
);
export const createStoryAysnc = createAsyncThunk(
  "user/create/story",
  async (data) => {
    const response = await createStory(data);
    return response.data;
  }
);

export const getuserAllStoriesAysnc = createAsyncThunk(
  "user/get/allstories",
  async (data) => {
    const response = await getUserAllStories();
    return response.data;
  }
);

export const editUserStoryAysnc = createAsyncThunk(
  "user/edit/story",
  async (data) => {
    const response = await editUserStory(data);
    return response.data;
  }
);

export const addToBookmarkAysnc = createAsyncThunk(
  "user/add/bookmark",
  async (data) => {
    const response = await addToBookmark(data);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("TOKEN");
      state.user = {};
      state.userToggle = state.userToggle ? false : true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAysnc.pending, (state, action) => {
        state.userFatching = true;
        state.userError = false;
        state.registerError = false;
      })
      .addCase(registerUserAysnc.fulfilled, (state, action) => {
        state.userFatching = false;
        const { token, user } = action.payload;
        localStorage.setItem("TOKEN", token);
        state.user = user;
        state.userFatching = false;
        state.userError = false;
        state.userToggle = state.userToggle ? false : true;
        state.registerError = false;
      })
      .addCase(registerUserAysnc.rejected, (state, action) => {
        state.userFatching = false;
        state.userError = true;
        state.registerError = true;
        state.userToggle = state.userToggle ? false : true;
      })

      .addCase(loginUserAysnc.pending, (state, action) => {
        state.userFatching = true;
        state.userError = false;
        state.siginError = false;
      })
      .addCase(loginUserAysnc.fulfilled, (state, action) => {
        state.userFatching = false;
        const { token, user } = action.payload;
        localStorage.setItem("TOKEN", token);
        state.user = user;
        state.userFatching = false;
        state.userError = false;
        state.siginError = false;
        state.userToggle = state.userToggle ? false : true;
      })
      .addCase(loginUserAysnc.rejected, (state, action) => {
        state.userFatching = false;
        state.userError = true;
        state.siginError = true;
        state.userToggle = state.userToggle ? false : true;
      })
      .addCase(getLoggedinUserAysnc.pending, (state, action) => {
        state.userFatching = true;
        state.userError = false;
      })
      .addCase(getLoggedinUserAysnc.fulfilled, (state, action) => {
        state.userFatching = false;
        const { user } = action.payload;
        state.user = user;
        state.userFatching = false;
        state.userError = false;
        state.userToggle = state.userToggle ? false : true;
      })
      .addCase(getLoggedinUserAysnc.rejected, (state, action) => {
        state.userFatching = false;
        state.userError = true;
        state.userToggle = state.userToggle ? false : true;
      })
      .addCase(createStoryAysnc.pending, (state, action) => {
        state.userFatching = true;
        state.userError = false;
      })
      .addCase(createStoryAysnc.fulfilled, (state, action) => {
        state.userFatching = false;
        state.storyToggle = state.storyToggle ? false : true;
      })
      .addCase(createStoryAysnc.rejected, (state, action) => {
        state.userFatching = false;
        state.userError = true;
        state.storyToggle = state.storyToggle ? false : true;
      })
      .addCase(getuserAllStoriesAysnc.pending, (state, action) => {
        state.userFatching = true;
        state.userError = false;
      })
      .addCase(getuserAllStoriesAysnc.fulfilled, (state, action) => {
        state.userFatching = false;
        state.userAllStories = action.payload;
        state.storyToggle = state.storyToggle ? false : true;
      })
      .addCase(getuserAllStoriesAysnc.rejected, (state, action) => {
        state.userFatching = false;
        state.userError = true;
        state.storyToggle = state.storyToggle ? false : true;
      })
      .addCase(editUserStoryAysnc.pending, (state, action) => {
        state.userFatching = true;
        state.userError = false;
      })
      .addCase(editUserStoryAysnc.fulfilled, (state, action) => {
        state.userFatching = false;
        state.userStoryToggle = state.userStoryToggle ? false : true;
      })
      .addCase(editUserStoryAysnc.rejected, (state, action) => {
        state.userFatching = false;
        state.userError = true;
        state.userStoryToggle = state.userStoryToggle ? false : true;
      })
      .addCase(addToBookmarkAysnc.pending, (state, action) => {
        state.userFatching = true;
        state.userError = false;
      })
      .addCase(addToBookmarkAysnc.fulfilled, (state, action) => {
        state.userFatching = false;
        state.bookMarkToggle = state.bookMarkToggle ? false : true;
      })
      .addCase(addToBookmarkAysnc.rejected, (state, action) => {
        state.userFatching = false;
        state.userError = true;
        state.bookMarkToggle = state.bookMarkToggle ? false : true;
      });
  },
});
export const { logoutUser } = userSlice.actions;

export const user = (state) => state.user.user;
export const registerError = (state) => state.user.registerError;
export const userStores = (state) => state.user.userStores;
export const userAllStories = (state) => state.user.userAllStories;
export const stroyToggle = (state) => state.user.storyToggle;
export const siginError = (state) => state.user.siginError;
export const userFatching = (state) => state.user.userFatching;
export const userToggle = (state) => state.user.userToggle;
export const userStoryToggle = (state) => state.user.userStoryToggle;
export const bookMarkToggle = (state) => state.user.bookMarkToggle;

export default userSlice.reducer;
