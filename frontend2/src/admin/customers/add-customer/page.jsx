"use client"

import React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";


const AddCustomer = () => {
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
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "#fff",
              "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            Cancel
          </Button>
          <Button variant="outlined" sx={{color:"#fff",border:"1px solid #fff","&:hover": { backgroundColor: "#115293" },}}>
            Save
          </Button>
        </Box>
      </Box>

      {/* Form Card */}
      <Paper elevation={2} sx={{ p: 3 }}>
        {/* Customer Information */}
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Customer Information
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Most important information about the customer
        </Typography>

        <Grid container spacing={2} mb={4}>
          <Grid item xs={12} md={6}>
            <TextField label="First Name" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Last Name" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Email Address" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Phone Number" fullWidth />
          </Grid>
        </Grid>

        {/* Customer Address */}
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Customer Address
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Shipping address information
        </Typography>

        <Grid container spacing={2} mb={4}>
          <Grid item xs={12} md={3}>
            <TextField label="Address" fullWidth />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Apartment" fullWidth />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="City" fullWidth />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select label="Country" defaultValue="" fullWidth> 
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Postal Code" fullWidth />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Phone" fullWidth />
          </Grid>
        </Grid>

        {/* Customer Notes */}
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Customer Notes
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Add notes about customer
        </Typography>

        <TextField
          placeholder="Add notes about customer"
          fullWidth
          multiline
          minRows={3}
        />

        {/* Bottom Save/Cancel */}
        <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "#fff",
              "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              "&:hover": { backgroundColor: "#115293" },
            }}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddCustomer;
