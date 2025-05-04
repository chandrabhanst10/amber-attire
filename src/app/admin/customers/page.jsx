"use client"
import React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Avatar,
  Pagination,
  Paper,
  InputAdornment,
} from "@mui/material";
import { Edit, Delete, Search, ArrowForwardIos } from "@mui/icons-material";
import WithAdminLayout from "@/app/HOC/WithAdminLayout";

const customers = [
  { name: "Rakesh Mishra", location: "Sawaynchester", orders: 5, spent: "$96.14" },
  { name: "Lakshman Singh", location: "Kaydenville", orders: 12, spent: "$22.18" },
  { name: "Dinanath Sah", location: "East Freidaton", orders: 6, spent: "$59.64" },
  { name: "Anmol Yadav", location: "South Marcellus", orders: 3, spent: "$54.52" },
  { name: "Raushan Singh Rajput", location: "South Olestad", orders: 15, spent: "$45.80" },
  { name: "Lokesh Rahul", location: "Dereckberg", orders: 12, spent: "$85.78" },
  { name: "Randhir Kumar", location: "Franeckview", orders: 5, spent: "$128.66" },
  { name: "Khushi Kumari", location: "Port Kathryne", orders: 7, spent: "$113.39" },
  { name: "Pooja Kumari", location: "McGlynntown", orders: 14, spent: "$80.80" },
  { name: "Ruhi Kumari", location: "Krystalview", orders: 5, spent: "$42.03" },
];

const Customers = () => {
  return (
      <Box p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight="bold" color="#fff">
            Customers
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              + Add Customer
            </Button>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Filter"
            sx={{ color: "#fff", border: "1px solid #fff", borderRadius: "5px", "::placeholder": { color: "#fff" } }}
          />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#fff" }} />
                </InputAdornment>
              ),
            }}
            sx={{ color: "#fff", border: "1px solid #fff", borderRadius: "5px", "::placeholder": { color: "#fff" } }}
          />
          <IconButton>
            <Edit sx={{ color: "#fff" }} />
          </IconButton>
          <IconButton>
            <Delete sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
        <Paper elevation={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Orders</TableCell>
                  <TableCell>Spent</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "#ccc", fontSize: 14 }}>
                          {customer.name.charAt(0)}
                        </Avatar>
                        <Typography variant="body2">{customer.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.location}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>{customer.spent}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <Pagination count={24} shape="rounded" color="primary" />
            <Typography variant="body2" color="text.secondary">
              154 Results
            </Typography>
          </Box>
        </Paper>
      </Box>
  );
};

export default WithAdminLayout(Customers);
