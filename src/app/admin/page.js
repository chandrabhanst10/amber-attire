"use client"
import React from 'react';
import { Box, Grid, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import SettingsIcon from '@mui/icons-material/Settings';
import WithAdminLayout from '../HOC/WithAdminLayout';

const StatBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderRadius: 16,
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
}));

const Dashboard = () => {
  const theme = useTheme();

  const lineData = [
    { time: '4am', May21: 5, May22: 8 },
    { time: '6am', May21: 10, May22: 18 },
    { time: '8am', May21: 25, May22: 34 },
    { time: '10am', May21: 30, May22: 42 },
    { time: '12pm', May21: 25, May22: 50 },
    { time: '2pm', May21: 20, May22: 28 },
    { time: '3pm', May21: 30, May22: 22 },
  ];

  const barData = [
    { day: '12', sales: 500 },
    { day: '13', sales: 900 },
    { day: '14', sales: 1250 },
    { day: '15', sales: 1800 },
    { day: '16', sales: 2525 },
    { day: '17', sales: 1800 },
    { day: '18', sales: 1700 },
  ];

  const transactions = [
    ['Jagarnath S.', '24.05.2023', '$124.97', 'Paid'],
    ['Anand G.', '23.05.2023', '$55.42', 'Pending'],
    ['Kartik S.', '23.05.2023', '$89.90', 'Paid'],
    ['Rakesh S.', '22.05.2023', '$144.94', 'Pending'],
    ['Anup S.', '22.05.2023', '$70.52', 'Paid'],
  ];

  const products = [
    ['Men Grey Hoodie', '$49.90', 204],
    ['Women Striped T-Shirt', '$34.90', 155],
    ['Women White T-Shirt', '$40.90', 120],
    ['Men White T-Shirt', '$49.90', 204],
    ['Women Red T-Shirt', '$34.90', 155],
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" fontWeight="bold" color='#fff'>Dashboard</Typography>
        <Button variant="outlined" startIcon={<SettingsIcon sx={{color:"#fff"}}/>} sx={{color:"#fff",border:"1px solid #fff"}}>Manage</Button>
      </Box>
      <Grid container spacing={2}>
        {[
          { label: 'Total Revenue', value: '$10.54', change: '+22.45%' },
          { label: 'Orders', value: '1,056', change: '+15.34%' },
          { label: 'New Users', value: '1,650', change: '+15.34%' },
          { label: 'Existing Users', value: '9,653', change: '+22.45%' },
        ].map((item, idx) => (
          <Grid item size={{xs:12, sm:6, md:3,lg:3}} key={idx}>
            <StatBox>
              <Typography variant="h6">{item.value}</Typography>
              <Typography variant="body2">{item.label}</Typography>
              <Typography variant="caption" color={item.change.includes('-') ? 'error.main' : 'success.main'}>
                {item.change}
              </Typography>
            </StatBox>
          </Grid>
        ))}
        <Grid item size={{xs:12, sm:6, md:8,lg:8}}>
          <Paper sx={{ p: 2, borderRadius: 4 }}>
            <Typography variant="h6">Orders Over Time</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="May22" stroke="#3f51b5" strokeWidth={3} />
                <Line type="monotone" dataKey="May21" stroke="#cfd8dc" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item size={{xs:12, sm:6, md:4,lg:4}}>
          <Paper sx={{ p: 2, borderRadius: 4,height:"365px" }}>
            <Typography variant="h6">Last 7 Days Sales</Typography>
            <Typography variant="body1" mt={1}>1,259 Items Sold</Typography>
            <Typography variant="h6" mt={1}>$12,546 Revenue</Typography>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(val) => `$${val}`} />
                <Bar dataKey="sales" fill="#4caf50" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item size={{xs:12, sm:6, md:6,lg:6}}>
          <Paper sx={{ p: 2, borderRadius: 4 }}>
            <Typography variant="h6">Recent Transactions</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map(([name, date, amount, status], idx) => (
                    <TableRow key={idx}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{date}</TableCell>
                      <TableCell>{amount}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          color={status === 'Paid' ? 'success.main' : 'warning.main'}>
                          {status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item size={{xs:12, sm:6, md:6,lg:6}}>
          <Paper sx={{ p: 2, borderRadius: 4 }}>
            <Typography variant="h6">Top Products by Units Sold</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Units Sold</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map(([name, price, units], idx) => (
                    <TableRow key={idx}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{price}</TableCell>
                      <TableCell>{units}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WithAdminLayout(Dashboard);
