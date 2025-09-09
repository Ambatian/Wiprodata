import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../api/api";

export const fetchEmployees = createAsyncThunk("employees/fetchAll", async () => await getEmployees());
export const addEmployee = createAsyncThunk("employees/add", async (payload) => await createEmployee(payload));
export const editEmployee = createAsyncThunk("employees/edit", async ({ id, data }) => await updateEmployee(id, data));
export const removeEmployee = createAsyncThunk("employees/remove", async (id) => await deleteEmployee(id));

const slice = createSlice({
  name: "employees",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchEmployees.pending, (s)=>{ s.loading=true; });
    b.addCase(fetchEmployees.fulfilled, (s,a)=>{ s.loading=false; s.items=a.payload; });
    b.addCase(addEmployee.fulfilled, (s,a)=>{ s.items.push(a.payload); });
    b.addCase(editEmployee.fulfilled, (s,a)=>{
      const i = s.items.findIndex(x=>x.id===a.payload.id);
      if (i>-1) s.items[i]=a.payload;
    });
    b.addCase(removeEmployee.fulfilled, (s,a)=>{
      s.items = s.items.filter(x=>x.id!==a.payload);
    });
  }
});

export default slice.reducer;