import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  desktopMenu: false,
  mobileMenu: false,
  registerMode: false,
  loginMode: false,
  addStoryMode: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToggleDesktopMenu: (state, action) => {
      state.desktopMenu = state.desktopMenu ? false : true;
    },
    setToggleMobileMenu: (state, action) => {
      state.mobileMenu = state.mobileMenu ? false : true;
    },

    setRegisterMode: (state, action) => {
      state.registerMode = state.registerMode ? false : true;
    },
    setLoginMode: (state, action) => {
      state.loginMode = state.loginMode ? false : true;
    },
    setAddStoryMode: (state, action) => {
      state.addStoryMode = state.addStoryMode ? false : true;
    },
  },
});
export const desktopMenu = (state) => state.app.desktopMenu;
export const mobileMenu = (state) => state.app.mobileMenu;
export const registerMode = (state) => state.app.registerMode;
export const addStoryMode = (state) => state.app.addStoryMode;
export const loginMode = (state) => state.app.loginMode;
export const {
  setToggleDesktopMenu,
  setToggleMobileMenu,
  setRegisterMode,
  setLoginMode,
  setAddStoryMode,
} = appSlice.actions;
export default appSlice.reducer;
