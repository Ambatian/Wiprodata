import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves, applyLeave } from "../store/leaveSlice";
import { Container, Typography, Grid, Card, CardContent, TextField, Button, Table, TableBody, TableHead, TableRow, TableCell, Paper } from "@mui/material";

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const { items: leaves } = useSelector(s=>s.leaves);
  const { user } = useSelector(s=>s.auth);
  const [form, setForm] = useState({ startDate:"", endDate:"", reason:"" });

  useEffect(()=>{ dispatch(fetchLeaves()); },[dispatch]);

  const myLeaves = leaves.filter(l => l.employeeId === user?.id || l.employeeEmail === user?.email || l.employeeName?.includes(user?.firstName || ""));

  const onApply = (e) => {
    e.preventDefault();
    dispatch(applyLeave({ ...form }));
    setForm({ startDate:"", endDate:"", reason:"" });
  };

  return (
    <Container sx={{ mt:4 }}>
      <Typography variant="h4" gutterBottom>Employee Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>My Profile</Typography>
              <Typography>Name: {user?.firstName} {user?.lastName}</Typography>
              <Typography>Email: {user?.email}</Typography>
              <Typography>Role: {user?.role}</Typography>
              {user?.department && <Typography>Department: {user?.department}</Typography>}
            </CardContent>
          </Card>
          <Card sx={{ mt:3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Apply for Leave</Typography>
              <form onSubmit={onApply} style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <TextField
                  type="date"
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  value={form.startDate}
                  onChange={e=>setForm({ ...form, startDate: e.target.value })}
                  required
                />
                <TextField
                  type="date"
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                  value={form.endDate}
                  onChange={e=>setForm({ ...form, endDate: e.target.value })}
                  required
                />
                <TextField
                  label="Reason"
                  value={form.reason}
                  onChange={e=>setForm({ ...form, reason: e.target.value })}
                  required
                />
                <Button variant="contained" type="submit">Submit</Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p:2 }}>
            <Typography variant="h6" gutterBottom>My Leave Requests</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Dates</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myLeaves.map(l => (
                  <TableRow key={l.id}>
                    <TableCell>{l.startDate?.slice(0,10)} → {l.endDate?.slice(0,10)}</TableCell>
                    <TableCell>{l.reason}</TableCell>
                    <TableCell>{l.status}</TableCell>
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

export default EmployeeDashboard;