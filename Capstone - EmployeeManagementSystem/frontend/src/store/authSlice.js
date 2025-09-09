import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../api/api";

const savedUser = JSON.parse(localStorage.getItem("user") || "null");
const savedToken = localStorage.getItem("token");

export const login = createAsyncThunk("auth/login", async (creds, { rejectWithValue }) => {
  try { return await loginUser(creds); }
  catch (e) { return rejectWithValue(e?.response?.data?.message || "Login failed"); }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutUser();
  return true;
});

const slice = createSlice({
  name: "auth",
  initialState: { user: savedUser, token: savedToken, loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(login.pending, (s)=>{ s.loading=true; s.error=null; });
    b.addCase(login.fulfilled, (s, a)=>{ s.loading=false; s.user=a.payload.user; s.token=a.payload.token; });
    b.addCase(login.rejected, (s, a)=>{ s.loading=false; s.error=a.payload || "Login failed"; });
    b.addCase(logout.fulfilled, (s)=>{ s.user=null; s.token=null; });
  }
});

export default slice.reducer;