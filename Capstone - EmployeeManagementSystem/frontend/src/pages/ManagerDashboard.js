// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEmployees } from "../store/employeeSlice";
// import { fetchLeaves, setLeaveStatus } from "../store/leaveSlice";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Container,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Box,
// } from "@mui/material";

// const ManagerDashboard = () => {
//   const dispatch = useDispatch();
//   const { items: employees } = useSelector((s) => s.employees);
//   const { items: leaves } = useSelector((s) => s.leaves);
//   const { user } = useSelector((s) => s.auth);

//   const [activeTab, setActiveTab] = useState("employees");

//   useEffect(() => {
//     dispatch(fetchEmployees());
//     dispatch(fetchLeaves());
//   }, [dispatch]);

//   // Filter employees by manager’s department if available
//   const teamEmployees = employees.filter(
//     (e) => !user.department || e.department === user.department
//   );

//   return (
//     <>
//       {/* Manager Navbar */}
//       <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Manager Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* Tab Buttons */}
//       <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
//         <Button
//           variant={activeTab === "employees" ? "contained" : "outlined"}
//           color="primary"
//           onClick={() => setActiveTab("employees")}
//         >
//           Team Employees
//         </Button>
//         <Button
//           variant={activeTab === "leaves" ? "contained" : "outlined"}
//           color="secondary"
//           onClick={() => setActiveTab("leaves")}
//         >
//           Team Leave Requests
//         </Button>
//       </Box>

//       <Container sx={{ mt: 4 }}>
//         {/* Team Employees */}
//         {activeTab === "employees" && (
//           <Paper sx={{ p: 2, mb: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Team Employees
//             </Typography>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Department</TableCell>
//                   <TableCell>Position</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {teamEmployees.map((e) => (
//                   <TableRow key={e.id}>
//                     <TableCell>
//                       {e.firstName} {e.lastName}
//                     </TableCell>
//                     <TableCell>{e.email}</TableCell>
//                     <TableCell>{e.department}</TableCell>
//                     <TableCell>{e.position}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>
//         )}

//         {/* Team Leave Requests */}
//         {activeTab === "leaves" && (
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Team Leave Requests
//             </Typography>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Employee</TableCell>
//                   <TableCell>Dates</TableCell>
//                   <TableCell>Reason</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell align="right">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {leaves.map((l) => (
//                   <TableRow key={l.id}>
//                     <TableCell>{l.employeeName || l.employeeId}</TableCell>
//                     <TableCell>
//                       {l.startDate?.slice(0, 10)} → {l.endDate?.slice(0, 10)}
//                     </TableCell>
//                     <TableCell>{l.reason}</TableCell>
//                     <TableCell>{l.status}</TableCell>
//                     <TableCell align="right">
//                       <Box
//                         sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}
//                       >
//                         <Button
//                           size="small"
//                           onClick={() =>
//                             dispatch(setLeaveStatus({ id: l.id, status: "Approved" }))
//                           }
//                         >
//                           Approve
//                         </Button>
//                         <Button
//                           size="small"
//                           color="error"
//                           onClick={() =>
//                             dispatch(setLeaveStatus({ id: l.id, status: "Rejected" }))
//                           }
//                         >
//                           Reject
//                         </Button>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>
//         )}
//       </Container>
//     </>
//   );
// };

// export default ManagerDashboard;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";

const ManagerDashboard = () => {
  const { user } = useSelector((s) => s.auth);
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [activeTab, setActiveTab] = useState("employees");

  const token = localStorage.getItem("token");

  // ✅ Fetch employees
  const loadEmployees = async () => {
    try {
      const res = await fetch("https://localhost:7223/api/Employees", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  // ✅ Fetch leaves
  const loadLeaves = async () => {
    try {
      const res = await fetch("https://localhost:7223/api/Leaves", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setLeaves(data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  };

  // ✅ Approve / Reject leave
  const updateLeaveStatus = async (id, status) => {
    try {
      const res = await fetch(`https://localhost:7223/api/Leaves/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      await res.json();
      loadLeaves(); // refresh after update
    } catch (err) {
      console.error("Error updating leave:", err);
    }
  };

  useEffect(() => {
    loadEmployees();
    loadLeaves();
  }, []);

  // ✅ Filter employees by manager’s department
  const teamEmployees = employees.filter(
    (e) => !user.department || e.department === user.department
  );

  // ✅ Filter leaves only for manager’s team
  const teamLeaves = leaves.filter(
    (l) => !user.department || l.department === user.department
  );

  return (
    <>
      {/* Manager Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Manager Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Tab Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <Button
          variant={activeTab === "employees" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setActiveTab("employees")}
        >
          Team Employees
        </Button>
        <Button
          variant={activeTab === "leaves" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => setActiveTab("leaves")}
        >
          Team Leave Requests
        </Button>
      </Box>

      <Container sx={{ mt: 4 }}>
        {/* Team Employees */}
        {activeTab === "employees" && (
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Team Employees
            </Typography>
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
                {teamEmployees.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>

                      {e.firstName} {e.lastName}
                    </TableCell>
                    <TableCell>{e.email}</TableCell>
                    <TableCell>{e.department}</TableCell>
                    <TableCell>{e.jobTitle}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}

        {/* Team Leave Requests */}
        {activeTab === "leaves" && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Team Leave Requests
            </Typography>
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
                {teamLeaves.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell>{l.employeeName || l.employeeId}</TableCell>
                    <TableCell>
                      {l.startDate?.slice(0, 10)} → {l.endDate?.slice(0, 10)}
                    </TableCell>
                    <TableCell>{l.reason}</TableCell>
                    <TableCell>{l.status}</TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          size="small"
                          onClick={() => updateLeaveStatus(l.id, "Approved")}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => updateLeaveStatus(l.id, "Rejected")}
                        >
                          Reject
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Container>
    </>
  );
};

export default ManagerDashboard;
