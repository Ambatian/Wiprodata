// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchEmployees,
//   addEmployee,
//   editEmployee,
//   removeEmployee,
// } from "../store/employeeSlice";
// import { fetchLeaves, setLeaveStatus } from "../store/leaveSlice";

// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Box,
//   IconButton,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

// const HRDashboard = () => {
//   const dispatch = useDispatch();

//   // ✅ default to [] so map() won’t crash
//   const { items: employees = [] } = useSelector((s) => s.employees);
//   const { items: leaves = [] } = useSelector((s) => s.leaves);

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     role: "Employee",
//     department: "General",
//     position: "",
//   });
//   const [editing, setEditing] = useState(null);

//   useEffect(() => {
//     dispatch(fetchEmployees());
//     dispatch(fetchLeaves());
//   }, [dispatch]);

//   const resetForm = () => {
//     setForm({
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       role: "Employee",
//       department: "General",
//       position: "",
//     });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (editing) {
//       dispatch(editEmployee({ id: editing, data: { ...form } })).then(() => {
//         setEditing(null);
//         resetForm();
//       });
//     } else {
//       dispatch(addEmployee(form)).then(() => resetForm());
//     }
//   };

//   const startEdit = (emp) => {
//     setEditing(emp.id);
//     setForm({
//       firstName: emp.firstName,
//       lastName: emp.lastName,
//       email: emp.email,
//       password: "",
//       role: emp.role || "Employee",
//       department: emp.department || "General",
//       position: emp.position || "",
//     });
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             HR Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Container sx={{ mt: 4 }}>
//         <Grid container spacing={3}>
//           {/* Add / Edit Employee */}
//           <Grid item xs={12}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   {editing ? "Edit Employee" : "Add Employee"}
//                 </Typography>
//                 <Box component="form" onSubmit={onSubmit}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12} sm={6} md={3}>
//                       <TextField
//                         label="First Name"
//                         value={form.firstName}
//                         onChange={(e) =>
//                           setForm({ ...form, firstName: e.target.value })
//                         }
//                         fullWidth
//                         required
//                       />
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={3}>
//                       <TextField
//                         label="Last Name"
//                         value={form.lastName}
//                         onChange={(e) =>
//                           setForm({ ...form, lastName: e.target.value })
//                         }
//                         fullWidth
//                         required
//                       />
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={3}>
//                       <TextField
//                         label="Email"
//                         type="email"
//                         value={form.email}
//                         onChange={(e) =>
//                           setForm({ ...form, email: e.target.value })
//                         }
//                         fullWidth
//                         required
//                       />
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={3}>
//                       <TextField
//                         label="Password"
//                         type="password"
//                         value={form.password}
//                         onChange={(e) =>
//                           setForm({ ...form, password: e.target.value })
//                         }
//                         fullWidth
//                         required={!editing}
//                       />
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={3}>
//                       <FormControl fullWidth>
//                         <InputLabel>Role</InputLabel>
//                         <Select
//                           value={form.role}
//                           onChange={(e) =>
//                             setForm({ ...form, role: e.target.value })
//                           }
//                         >
//                           <MenuItem value="HR">HR</MenuItem>
//                           <MenuItem value="Manager">Manager</MenuItem>
//                           <MenuItem value="Employee">Employee</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={3}>
//                       <TextField
//                         label="Department"
//                         value={form.department}
//                         onChange={(e) =>
//                           setForm({ ...form, department: e.target.value })
//                         }
//                         fullWidth
//                       />
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={3}>
//                       <TextField
//                         label="Position"
//                         value={form.position}
//                         onChange={(e) =>
//                           setForm({ ...form, position: e.target.value })
//                         }
//                         fullWidth
//                       />
//                     </Grid>
//                     <Grid
//                       item
//                       xs={12}
//                       sm={6}
//                       md={3}
//                       display="flex"
//                       alignItems="center"
//                     >
//                       <Button variant="contained" type="submit" fullWidth>
//                         {editing ? "Update" : "Create"}
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Employees Table */}
//           <Grid item xs={12} md={6}>
//             <Paper sx={{ p: 2 }}>
//               <Typography variant="h6" gutterBottom>
//                 Employees
//               </Typography>
//               {employees.length === 0 ? (
//                 <Typography>No employees found</Typography>
//               ) : (
//                 <Table size="small">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Name</TableCell>
//                       <TableCell>Email</TableCell>
//                       <TableCell>Role</TableCell>
//                       <TableCell>Department</TableCell>
//                       <TableCell align="right">Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {employees.map((emp) => (
//                       <TableRow key={emp.id}>
//                         <TableCell>
//                           {emp.firstName} {emp.lastName}
//                         </TableCell>
//                         <TableCell>{emp.email}</TableCell>
//                         <TableCell>{emp.role}</TableCell>
//                         <TableCell>{emp.department}</TableCell>
//                         <TableCell align="right">
//                           <IconButton onClick={() => startEdit(emp)}>
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton
//                             color="error"
//                             onClick={() => dispatch(removeEmployee(emp.id))}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               )}
//             </Paper>
//           </Grid>

//           {/* Pending Leaves */}
//           <Grid item xs={12} md={6}>
//             <Paper sx={{ p: 2 }}>
//               <Typography variant="h6" gutterBottom>
//                 Pending Leaves
//               </Typography>
//               {leaves.length === 0 ? (
//                 <Typography>No pending leaves</Typography>
//               ) : (
//                 <Table size="small">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Employee</TableCell>
//                       <TableCell>Dates</TableCell>
//                       <TableCell>Reason</TableCell>
//                       <TableCell>Status</TableCell>
//                       <TableCell align="right">Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {leaves.map((l) => (
//                       <TableRow key={l.id}>
//                         <TableCell>{l.employeeName || l.employeeId}</TableCell>
//                         <TableCell>
//                           {l.startDate?.slice(0, 10)} → {l.endDate?.slice(0, 10)}
//                         </TableCell>
//                         <TableCell>{l.reason}</TableCell>
//                         <TableCell>{l.status}</TableCell>
//                         <TableCell align="right">
//                           <Button
//                             size="small"
//                             onClick={() =>
//                               dispatch(
//                                 setLeaveStatus({ id: l.id, status: "Approved" })
//                               )
//                             }
//                           >
//                             Approve
//                           </Button>
//                           <Button
//                             size="small"
//                             color="error"
//                             onClick={() =>
//                               dispatch(
//                                 setLeaveStatus({ id: l.id, status: "Rejected" })
//                               )
//                             }
//                           >
//                             Reject
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               )}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default HRDashboard;
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const HRDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "Employee",
    department: "General",
    // position: "",
  });
  const [editing, setEditing] = useState(null);

  // ✅ get token from localStorage
  const token = localStorage.getItem("token");

  const authHeaders = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // 🔹 Fetch Employees
  const loadEmployees = async () => {
    try {
      const res = await fetch("https://localhost:7223/api/Employees", {
        headers: authHeaders,
      });
      if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  // 🔹 Fetch Leaves
  const loadLeaves = async () => {
    try {
      const res = await fetch("https://localhost:7223/api/Leaves", {
        headers: authHeaders,
      });
      if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
      const data = await res.json();
      setLeaves(data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  };

  useEffect(() => {
    loadEmployees();
    loadLeaves();
  }, []);

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "Employee",
      department: "General",
      position: "",
    });
  };

  // 🔹 Add or Update Employee
  const onSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      await fetch(`https://localhost:7223/api/Employees/${editing}`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify(form),
      });
      setEditing(null);
    } else {
      await fetch("https://localhost:7223/api/Employees", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(form),
      });
    }

    resetForm();
    loadEmployees();
  };

  const startEdit = (emp) => {
    setEditing(emp.employeeId);
    setForm({
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      password: "",
      role: emp.role || "Employee",
      department: emp.department || "General",
      // position: emp.position || "",
    });
  };

  const deleteEmployee = async (id) => {
    await fetch(`https://localhost:7223/api/Employees/${id}`, {
      method: "DELETE",
      headers: authHeaders,
    });
    loadEmployees();
  };

  // 🔹 Approve / Reject Leave
  const updateLeaveStatus = async (id, status) => {
    await fetch(`https://localhost:7223/api/Leaves/${id}/status`, {
      // https://localhost:7223/api/Leaves/24/status
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify({ status }),
    });
    loadLeaves();
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HR Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Add / Edit Employee */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {editing ? "Edit Employee" : "Add Employee"}
                </Typography>
                <Box component="form" onSubmit={onSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="First Name"
                        value={form.firstName}
                        onChange={(e) =>
                          setForm({ ...form, firstName: e.target.value })
                        }
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="Last Name"
                        value={form.lastName}
                        onChange={(e) =>
                          setForm({ ...form, lastName: e.target.value })
                        }
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="Password"
                        type="password"
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        fullWidth
                        required={!editing}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select
                          value={form.role}
                          onChange={(e) =>
                            setForm({ ...form, role: e.target.value })
                          }
                        >
                          <MenuItem value="HR">HR</MenuItem>
                          <MenuItem value="Manager">Manager</MenuItem>
                          <MenuItem value="Employee">Employee</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="Department"
                        value={form.department}
                        onChange={(e) =>
                          setForm({ ...form, department: e.target.value })
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="Position"
                        value={form.position}
                        onChange={(e) =>
                          setForm({ ...form, position: e.target.value })
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      display="flex"
                      alignItems="center"
                    >
                      <Button variant="contained" type="submit" fullWidth>
                        {editing ? "Update" : "Create"}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Employees Table */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Employees
              </Typography>
              {employees.length === 0 ? (
                <Typography>No employees found</Typography>
              ) : (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees.map((emp) => (
                      <TableRow key ={emp.employeeId}>
                        <TableCell>
                          {/* {console.log(emp)} */}
                          {emp.firstName} {emp.lastName}
                        </TableCell>
                        <TableCell>{emp.email}</TableCell>
                        <TableCell>{emp.role}</TableCell>
                        <TableCell>{emp.department}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => startEdit(emp)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => deleteEmployee(emp.employeeId)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Paper>
          </Grid>

          {/* Pending Leaves */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Pending Leaves
              </Typography>
              {leaves.length === 0 ? (
                <Typography>No pending leaves</Typography>
              ) : (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee</TableCell>
                      <TableCell>Dates</TableCell>
                      <TableCell>Reason</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaves.map((l) => (
                      <TableRow key={l.id}>
                        {console.log(l)}
                        <TableCell>{l.employeeName || l.employeeId}</TableCell>
                        <TableCell>
                          {l.startDate?.slice(0, 10)} →{" "}
                          {l.endDate?.slice(0, 10)}
                        </TableCell>
                        <TableCell>{l.reason}</TableCell>
                        <TableCell>{l.status}</TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            onClick={() =>
                              updateLeaveStatus(l.leaveRequestId, "Approved")
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            onClick={() =>
                              updateLeaveStatus(l.leaveRequestId, "Rejected")
                            }
                          >
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HRDashboard;
