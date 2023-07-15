import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUserCredential {
  email: string | null;
}

const initialState: IUserCredential = {
  email: null,
};

interface ILoginResponse {
  email: string;
  accessToken: string;
  _id: string;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ILoginResponse>) => {
      console.log(action.payload);
      state.email = action?.payload?.email;
      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("id", action.payload._id);
    },
    removeUser: (state) => {
      state.email = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
