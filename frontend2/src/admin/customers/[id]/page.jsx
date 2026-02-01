"use client"
import React from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  TextField,
  Paper,
  Grid,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Rating,
} from "@mui/material";
import { ArrowBack, Edit } from "@mui/icons-material";

const orders = [
  { id: "#23534D", date: "May 25, 3:12 PM", status: "Pending", price: "$29.74" },
  { id: "#12512B", date: "May 10, 2:00 PM", status: "Completed", price: "$23.06" },
  { id: "#23534D", date: "April 18, 8:00 AM", status: "Completed", price: "$29.74" },
  { id: "#76543E", date: "April 12, 8:00 AM", status: "Completed", price: "$23.06" },
  { id: "#51323C", date: "April 10, 4:12 PM", status: "Completed", price: "$23.06" },
];

const CustomerDetails = () => {
  return (
    <Box p={3}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <ArrowBack fontSize="small" sx={{color:"#fff"}}/>
          <Typography variant="body2" color="#fff">
            Back
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button variant="outlined" sx={{color:"#fff",border:"1px solid #fff"}}>
            Cancel
          </Button>
          <Button variant="outlined" sx={{color:"#fff",border:"1px solid #fff"}}>
            Save
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Side */}
        <Grid item size={{xs:12, md:8}}>
          {/* Customer Info Card */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ width: 60, height: 60, bgcolor: "#ccc", fontSize: 24 }}>
                R
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">Randhir Kumar</Typography>
                <Typography variant="body2" color="text.secondary">India</Typography>
                <Typography variant="body2" color="text.secondary">5 Orders</Typography>
                <Typography variant="body2" color="text.secondary">Customer for 2 years</Typography>
              </Box>
              <Box ml="auto">
                <Rating value={4.5} precision={0.5} readOnly />
              </Box>
            </Box>
            <Box mt={3} borderTop="1px solid #eee" pt={2}>
              <Typography fontWeight="bold" mb={1}>Customer Notes</Typography>
              <TextField
                placeholder="Add notes about customer"
                fullWidth
                multiline
                minRows={3}
                variant="outlined"
              />
            </Box>
          </Paper>

          {/* Customer Orders Card */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Customer Orders
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Order Status</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          size="small"
                          color={order.status === "Completed" ? "success" : "warning"}
                          sx={{ fontWeight: "bold" }}
                        />
                      </TableCell>
                      <TableCell>{order.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Right Side */}
        <Grid item size={{xs:12, md:4}}>
          {/* Overview Card */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography fontWeight="bold">Overview</Typography>
              <IconButton size="small" color="primary">
                <Edit fontSize="small" />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={1}>Address</Typography>
            <Typography variant="body2" mb={2}>
              Panapur Langa<br />
              Hajipur, Vaishali 844124<br />
              India
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>Email Address</Typography>
            <Typography variant="body2" mb={2}>randhirppl@gmail.com</Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>Phone</Typography>
            <Typography variant="body2" mb={2}>+91 8804789764</Typography>
            <Button variant="text" color="error">
              Delete Customer
            </Button>
          </Paper>

          {/* Tags Card */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography fontWeight="bold" mb={2}>Tags</Typography>
            <TextField
              placeholder="Enter tag name"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />
            <Box display="flex" flexWrap="wrap" gap={1}>
              <Chip label="Vip Customer" color="primary" variant="outlined" />
              <Chip label="Europe" color="primary" variant="outlined" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerDetails;
