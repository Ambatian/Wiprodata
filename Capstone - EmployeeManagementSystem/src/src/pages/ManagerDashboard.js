import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../store/employeeSlice";
import { fetchLeaves, setLeaveStatus } from "../store/leaveSlice";
import { Container, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, Box } from "@mui/material";

const ManagerDashboard = () => {
  const dispatch = useDispatch();
  const { items: employees } = useSelector(s=>s.employees);
  const { items: leaves } = useSelector(s=>s.leaves);
  const { user } = useSelector(s=>s.auth);

  useEffect(()=>{
    dispatch(fetchEmployees());
    dispatch(fetchLeaves());
  },[dispatch]);

  // If backend returns team/department metadata, you can filter here by user.department
  const teamEmployees = employees.filter(e => !user.department || e.department === user.department);

  return (
    <Container sx={{ mt:4 }}>
      <Typography variant="h4" gutterBottom>Manager Dashboard</Typography>
      <Paper sx={{ p:2, mb:3 }}>
        <Typography variant="h6" gutterBottom>Team Employees</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamEmployees.map(e => (
              <TableRow key={e.id}>
                <TableCell>{e.firstName} {e.lastName}</TableCell>
                <TableCell>{e.email}</TableCell>
                <TableCell>{e.department}</TableCell>
                <TableCell>{e.position}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Paper sx={{ p:2 }}>
        <Typography variant="h6" gutterBottom>Team Leave Requests</Typography>
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
                  <Box sx={{ display:"flex", gap:1, justifyContent:"flex-end" }}>
                    <Button size="small" onClick={()=>dispatch(setLeaveStatus({ id: l.id, status: "Approved" }))}>Approve</Button>
                    <Button size="small" color="error" onClick={()=>dispatch(setLeaveStatus({ id: l.id, status: "Rejected" }))}>Reject</Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default ManagerDashboard;