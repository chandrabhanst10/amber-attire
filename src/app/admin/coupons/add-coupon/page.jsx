'use client';
import WithAdminLayout from '@/app/HOC/WithAdminLayout';
import { Box, Button, TextField, Typography, Grid, Tabs, Tab, FormControlLabel, Checkbox, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useState } from 'react';

 function CreateCoupon() {
  const [couponType, setCouponType] = useState('Fixed Discount');
  const couponTypes = ['Fixed Discount', 'Percentage Discount', 'Free Shipping', 'Price Discount'];
  return (
    <Box sx={{ p: 3, backgroundColor: '#121212', minHeight: '100vh', color: 'white' }}>
      <Typography variant="h5" mb={3}>Create Coupon</Typography>
      <Box mb={3}>
        <Typography variant="subtitle1" mb={1}>Coupon Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth variant="outlined" label="Coupon Code" placeholder="Enter code" InputProps={{ style: { color: 'white', borderColor: 'white' } }} sx={{ input: { color: 'white' } }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth variant="outlined" label="Coupon Name" placeholder="Enter name" sx={{ input: { color: 'white' } }} />
          </Grid>
        </Grid>
      </Box>
      <Box mb={3}>
        <Typography variant="subtitle1" mb={1}>Coupon Type</Typography>
        <Grid container spacing={2}>
          {couponTypes.map((type) => (
            <Grid item xs={6} md={3} key={type}>
              <Button 
                fullWidth 
                variant={couponType === type ? 'contained' : 'outlined'} 
                onClick={() => setCouponType(type)}
                sx={{ borderColor: 'white', color: 'white' }}
              >
                {type}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth variant="outlined" label="Discount Value" placeholder="Amount" sx={{ input: { color: 'white' } }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: 'white' }}>Applies to</InputLabel>
              <Select sx={{ color: 'white', borderColor: 'white' }}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Specific">Specific Items</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Box mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth variant="outlined" label="Duration" placeholder="Set Duration" sx={{ input: { color: 'white' } }} />
            <FormControlLabel control={<Checkbox sx={{ color: 'white' }} />} label="Don't set duration" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth variant="outlined" label="Usage Limits" placeholder="Amount of uses" sx={{ input: { color: 'white' } }} />
            <FormControlLabel control={<Checkbox sx={{ color: 'white' }} />} label="Don't limit amount of uses" />
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" gap={2}>
        <Button variant="outlined" sx={{ borderColor: 'white', color: 'white' }}>Cancel</Button>
        <Button variant="outlined" sx={{ borderColor: 'white', color: 'white' }}>Save</Button>
      </Box>
    </Box>
  );
}

export default WithAdminLayout(CreateCoupon)