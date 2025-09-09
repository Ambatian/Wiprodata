import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves, applyLeave } from "../store/leaveSlice";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const { items: leaves } = useSelector((s) => s.leaves);
   console.log(leaves);
  const { user } = useSelector((s) => s.auth);
  // console.log(user);
  const [form, setForm] = useState({ startDate: "", endDate: "", reason: "" });

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);
// console.log(leaves)
  const myLeaves = leaves.filter(
    (l) =>
      l.employeeId === user?.id ||
      l.employeeEmail === user?.email ||
      l.employeeName?.includes(user?.firstName || "")
  );

  const onApply = (e) => {
    e.preventDefault();
    dispatch(applyLeave({ ...form }));
    setForm({ startDate: "", endDate: "", reason: "" });
  };

  return (
    <>
      {/* ✅ Navbar with blue background */}
      <AppBar position="static" sx={{ mb: 4, backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6">Employee Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Grid container spacing={3}>
          {/* My Profile Accordion */}
          <Grid item xs={12} md={4}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                sx={{ backgroundColor: "#1976d2", color: "white" }}
              >
                <Typography>My Profile</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {/* {console.log(user)} */}
                  Name:{user?.email.split("@")[0]}
                   {/* {user?.firstName} {user?.lastName} */}
                </Typography>
                <Typography>Email: {user?.email}</Typography>
                <Typography>Role: {user?.role}</Typography>
                {user?.department && (
                  <Typography>Department: {user?.department}</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* My Leave Requests Accordion */}
          <Grid item xs={12} md={4}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                sx={{ backgroundColor: "#1976d2", color: "white" }}
              >
                <Typography>My Leave Requests</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Dates</TableCell>
                      <TableCell>Reason</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {myLeaves.map((l) => (
                      
                      <TableRow key={l.id}>
                        {/* {console.log(l)} */}
                        <TableCell>
                          {console.log(l)}
                          {l.startDate?.slice(0, 10)} → {l.endDate?.slice(0, 10)}
                        </TableCell>
                        <TableCell>{l.reason}</TableCell>
                        <TableCell>{l.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Apply for Leave Accordion */}
          <Grid item xs={12} md={4}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                sx={{ backgroundColor: "#1976d2", color: "white" }}
              >
                <Typography>Apply for Leave</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  component="form"
                  onSubmit={onApply}
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <TextField
                    type="date"
                    label="Start Date"
                    InputLabelProps={{ shrink: true }}
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    required
                  />
                  <TextField
                    type="date"
                    label="End Date"
                    InputLabelProps={{ shrink: true }}
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    required
                  />
                  <TextField
                    label="Reason"
                    value={form.reason}
                    onChange={(e) =>
                      setForm({ ...form, reason: e.target.value })
                    }
                    required
                  />
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EmployeeDashboard;
