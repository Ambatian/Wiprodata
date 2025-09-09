import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, addEmployee, editEmployee, removeEmployee } from "../store/employeeSlice";
import { fetchLeaves, setLeaveStatus } from "../store/leaveSlice";
import { Container, Typography, Grid, Card, CardContent, TextField, Button, Box, IconButton, Table, TableHead, TableRow, TableCell, TableBody, Paper, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const HRDashboard = () => {
  const dispatch = useDispatch();
  const { items: employees } = useSelector(s=>s.employees);
  const { items: leaves } = useSelector(s=>s.leaves);
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", password:"", role:"Employee", department:"General", position:"" });
  const [editing, setEditing] = useState(null);

  useEffect(()=>{
    dispatch(fetchEmployees());
    dispatch(fetchLeaves());
  },[dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(editEmployee({ id: editing, data: { ...form } })).then(()=>{ setEditing(null); setForm({ firstName:"", lastName:"", email:"", password:"", role:"Employee", department:"General", position:"" }); });
    } else {
      dispatch(addEmployee(form)).then(()=> setForm({ firstName:"", lastName:"", email:"", password:"", role:"Employee", department:"General", position:"" }));
    }
  };

  const startEdit = (emp) => {
    setEditing(emp.id);
    setForm({ firstName: emp.firstName, lastName: emp.lastName, email: emp.email, password:"", role: emp.role || "Employee", department: emp.department || "General", position: emp.position || "" });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>HR Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>{editing ? "Edit Employee" : "Add Employee"}</Typography>
              <Box component="form" onSubmit={onSubmit} sx={{ display:"flex", flexDirection:"column", gap:2 }}>
                <TextField label="First Name" value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})} required />
                <TextField label="Last Name" value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})} required />
                <TextField label="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
                <TextField label="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required={!editing} />
                <FormControl>
                  <InputLabel>Role</InputLabel>
                  <Select label="Role" value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
                    <MenuItem value="HR">HR</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Employee">Employee</MenuItem>
                  </Select>
                </FormControl>
                <TextField label="Department" value={form.department} onChange={e=>setForm({...form, department:e.target.value})} />
                <TextField label="Position" value={form.position} onChange={e=>setForm({...form, position:e.target.value})} />
                <Button variant="contained" type="submit">{editing ? "Update" : "Create"}</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p:2 }}>
            <Typography variant="h6" gutterBottom>Employees</Typography>
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
                {employees.map(emp => (
                  <TableRow key={emp.id}>
                    <TableCell>{emp.firstName} {emp.lastName}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.role}</TableCell>
                    <TableCell>{emp.department}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={()=>startEdit(emp)}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={()=>dispatch(removeEmployee(emp.id))}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <Paper sx={{ p:2, mt:3 }}>
            <Typography variant="h6" gutterBottom>Pending Leaves</Typography>
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
                {leaves.map(l => (
                  <TableRow key={l.id}>
                    <TableCell>{l.employeeName || l.employeeId}</TableCell>
                    <TableCell>{l.startDate?.slice(0,10)} → {l.endDate?.slice(0,10)}</TableCell>
                    <TableCell>{l.reason}</TableCell>
                    <TableCell>{l.status}</TableCell>
                    <TableCell align="right">
                      <Button size="small" onClick={()=>dispatch(setLeaveStatus({ id: l.id, status: "Approved" }))}>Approve</Button>
                      <Button size="small" color="error" onClick={()=>dispatch(setLeaveStatus({ id: l.id, status: "Rejected" }))}>Reject</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HRDashboard;