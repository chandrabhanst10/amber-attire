'use client';
import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TablePagination,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Chip,
  Pagination
} from '@mui/material';
import { FilterList, Search, Delete, Edit, Add } from '@mui/icons-material';
import WithAdminLayout from '@/app/HOC/WithAdminLayout';

const mockData = [
  { id: '#12512B', date: 'May 5, 4:20 PM', customer: 'Tom Anderson', payment: 'Paid', status: 'Ready', total: '$49.90' },
  { id: '#12523C', date: 'May 5, 4:15 PM', customer: 'Jayden Walker', payment: 'Paid', status: 'Ready', total: '$34.36' },
  { id: '#51232A', date: 'May 5, 4:15 PM', customer: 'Inez Kim', payment: 'Paid', status: 'Ready', total: '$5.51' },
  { id: '#23534D', date: 'May 5, 4:12 PM', customer: 'Francisco Henry', payment: 'Paid', status: 'Shipped', total: '$29.74' },
  { id: '#51233C', date: 'May 5, 4:12 PM', customer: 'Violet Phillips', payment: 'Paid', status: 'Shipped', total: '$23.06' },
  { id: '#35622A', date: 'May 5, 4:12 PM', customer: 'Rosetta Becker', payment: 'Paid', status: 'Shipped', total: '$87.44' },
  { id: '#34323D', date: 'May 5, 4:10 PM', customer: 'Dean Love', payment: 'Paid', status: 'Ready', total: '$44.55' },
  { id: '#56212D', date: 'May 5, 4:08 PM', customer: 'Nettie Tyler', payment: 'Paid', status: 'Ready', total: '$36.79' },
  { id: '#76543E', date: 'May 5, 4:08 PM', customer: 'Lora Weaver', payment: 'Paid', status: 'Shipped', total: '$28.78' },
  { id: '#12512B', date: 'May 5, 4:05 PM', customer: 'Vincent Cannon', payment: 'Paid', status: 'Shipped', total: '$96.46' },
  { id: '#12523C', date: 'May 5, 4:05 PM', customer: 'Nettie Palmer', payment: 'Paid', status: 'Received', total: '$25.53' },
  { id: '#23534D', date: 'May 5, 4:04 PM', customer: 'Miguel Harris', payment: 'Pending', status: 'Ready', total: '$50.54' },
  { id: '#12523C', date: 'May 5, 4:04 PM', customer: 'Angel Conner', payment: 'Pending', status: 'Ready', total: '$63.47' },
  { id: '#51232A', date: 'May 5, 4:03 PM', customer: 'Rosalie Singleton', payment: 'Pending', status: 'Received', total: '$91.63' },
];

const Orders = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [selected, setSelected] = useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = paginatedData.map((row) => row.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((item) => item !== id);
    }

    setSelected(newSelected);
  };

  const filteredData = mockData.filter((row) =>
    row.customer.toLowerCase().includes(search.toLowerCase()) ||
    row.id.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const isSelected = (id) => selected.includes(id);

  const getStatusChip = (status) => {
    const colorMap = {
      Ready: 'warning',
      Shipped: 'default',
      Received: 'info'
    };
    return <Chip label={status} color={colorMap[status]} size="small" />;
  };

  const getPaymentChip = (status) => {
    const colorMap = {
      Paid: 'success',
      Pending: 'warning'
    };
    return <Chip label={status} color={colorMap[status]} size="small" />;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box display="flex" gap={2}>
          <Button variant="outlined" startIcon={<FilterList sx={{color:"#fff"}} />}sx={{color:"#fff",border:"1px solid #fff"}}>Filter</Button>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{color:"#fff"}}/>
                </InputAdornment>
              )
            }}
            sx={{color:"#fff",border:"1px solid #fff",borderRadius:"5px","::placeholder":{color:"#fff"}}}
          />
        </Box>
        <Box display="flex" gap={1}>
          <IconButton><Edit sx={{color:"#fff"}}/></IconButton>
          <IconButton><Delete sx={{color:"#fff"}}/></IconButton>
          <Button variant="outlined" startIcon={<Add sx={{color:"#fff"}}/>} sx={{color:"#fff",border:"1px solid #fff"}}>Add Order</Button>
        </Box>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.length === paginatedData.length}
                    indeterminate={selected.length > 0 && selected.length < paginatedData.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Payment status</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.id} selected={isSelected(row.id)}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(row.id)}
                      onChange={() => handleCheckboxClick(row.id)}
                    />
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{getPaymentChip(row.payment)}</TableCell>
                  <TableCell>{getStatusChip(row.status)}</TableCell>
                  <TableCell>{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <Pagination count={10} variant="outlined" shape="rounded" onChange={(e, newPage) => setPage(newPage)} />
          <Box>{filteredData.length} Results</Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default WithAdminLayout(Orders);
