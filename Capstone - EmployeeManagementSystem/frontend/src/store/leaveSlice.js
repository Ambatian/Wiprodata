import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLeaves, applyLeave as apiApplyLeave, updateLeaveStatus } from "../api/api";

export const fetchLeaves = createAsyncThunk("leaves/fetchAll", async () => await getLeaves());
export const applyLeave = createAsyncThunk("leaves/apply", async (payload) => await apiApplyLeave(payload));
export const setLeaveStatus = createAsyncThunk("leaves/setStatus", async ({ id, status }) => await updateLeaveStatus(id, status));

const slice = createSlice({
  name: "leaves",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchLeaves.pending, (s)=>{ s.loading=true; });
    b.addCase(fetchLeaves.fulfilled, (s,a)=>{ s.loading=false; s.items=a.payload; });
    b.addCase(applyLeave.fulfilled, (s,a)=>{ s.items.push(a.payload); });
    b.addCase(setLeaveStatus.fulfilled, (s,a)=>{
      const i = s.items.findIndex(x=>x.id===a.payload.id);
      if (i>-1) s.items[i]=a.payload;
    });
  }
});

export default slice.reducer;
