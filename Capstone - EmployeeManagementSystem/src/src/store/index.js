import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import employees from "./employeeSlice";
import leaves from "./leaveSlice";

const store = configureStore({
  reducer: { auth, employees, leaves },
});

export default store;