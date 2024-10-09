import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Tạo state redux
interface AuthState {
  isLoggedIn: boolean;
  profileImageUrl: string | null;
}

// Giá trị khởi tạo cho state
const initialState: AuthState = {
  isLoggedIn: false,
  profileImageUrl: null,
};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ profileImageUrl: string }>) => {
      // Chỉ lưu trạng thái đăng nhập và URL hình ảnh
      state.isLoggedIn = true;
      state.profileImageUrl = action.payload.profileImageUrl;
    },
    logout: (state) => {
      // Đặt lại trạng thái đăng nhập
      state.isLoggedIn = false;
      state.profileImageUrl = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
