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
  Button,
  IconButton,
  Paper,
  Chip,
  Pagination,
  Popover,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Typography,
  Select,
  MenuItem
} from '@mui/material';
import { FilterList, Edit } from '@mui/icons-material';

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
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [openEditOrders, setOpenOrders] = useState(false);
  const [allOrders, setAllOrders] = useState(mockData);
  const rowsPerPage = Math.ceil(allOrders.length / 10);
  const [rows, setRows] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option, key) => {
    let filteredData = allOrders.filter(item => item[key] === option);
    setAllOrders(filteredData)
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;

  const payment = ['Paid', "Pending",];
  const status = ["Ready", "Shipped", "Received"];

  const paginatedData = allOrders.slice((page - 1) * 10, page * 10);
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
  const handleOpenEditModal = () => {
    let selectedOrders = allOrders.filter(item => selected.includes(item.id))
    setRows(selectedOrders);
    setOpenOrders(true)
  }

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };
  const statusOptions = ['Ready', 'Shipped', 'Received'];
  const paymentOptions = ['Paid', 'Pending'];

  const EditOrdersModal = () => {
    return <Modal open={openEditOrders} onClose={() => setOpenOrders(false)} disableEscapeKeyDown closeAfterTransition sx={{ display: "flex" }}>
      <Box sx={{ p: 3, backgroundColor: '#fff', width: { xs: "90%", sm: "70%", md: "50%" }, maxHeight: "70%", overflow: "scroll", margin: "auto", borderRadius: "10px" }}>
        <Typography>Edit Orders</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={`${row.id}-${index}`}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>
                    <Select
                      value={row.payment}
                      onChange={(e) => handleChange(index, 'payment', e.target.value)}
                      size="small"
                    >
                      {paymentOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={row.status}
                      onChange={(e) => handleChange(index, 'status', e.target.value)}
                      size="small"
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "20px", marginTop: "20px" }}>
          <Button variant='outlined' onClick={() => setOpenOrders(false)}>Close</Button>
          <Button variant='contained' onClick={() => setOpenOrders(false)}>Update</Button>
        </Box>
      </Box>
    </Modal>
  }

  return (
    <Box sx={{ p: 2 }}>
      <EditOrdersModal />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" fontWeight="bold" color='#fff'>Orders</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box display="flex" gap={2}>
          <Button variant="outlined" startIcon={<FilterList sx={{ color: "#fff" }} />} sx={{ color: "#fff", border: "1px solid #fff" }} onClick={handleClick}>Filter</Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Stack sx={{ minWidth: 150 }}>
              <List>
                {payment.map((option) => (
                  <ListItem disablePadding>
                    <ListItemButton
                      key={option}
                      onClick={() => handleOptionClick(option, "payment")}
                    >
                      <ListItemText primary={option} />
                    </ListItemButton>
                  </ListItem>
                ))}
                {status.map((option) => (
                  <ListItem disablePadding>
                    <ListItemButton
                      key={option}
                      onClick={() => handleOptionClick(option, "status")}
                    >
                      <ListItemText primary={option} />
                    </ListItemButton>
                  </ListItem>
                ))}
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setAllOrders(mockData);
                      handleClose();
                    }}
                  >
                    <ListItemText primary={"Clear"} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Stack>
          </Popover>
        </Box>
        <Box>
          {selected.length > 0 && <IconButton onClick={handleOpenEditModal}><Edit sx={{ color: "#fff" }} /></IconButton>}
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
              {paginatedData.map((row, index) => (
                <TableRow key={index} selected={isSelected(row.id)} hover >
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
          <Pagination count={rowsPerPage} page={page} variant="outlined" shape="rounded" onChange={(e, newPage) => setPage(newPage)} />
          <Box>{allOrders.length} Results</Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Orders
