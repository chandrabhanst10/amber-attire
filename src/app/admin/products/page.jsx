'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Avatar,
  Pagination,
  Popover,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { FilterList, Search, Edit, Delete, Add } from '@mui/icons-material';
import WithAdminLayout from '@/app/HOC/WithAdminLayout';
import { useRouter } from 'next/navigation';

// 🧪 Dummy Data
const products = [
  {
    id: 1,
    name: 'Men Grey Hoodie',
    category: 'Hoodies',
    inventory: 96,
    color: 'Black',
    price: '$49.90',
    rating: '5.0 (32 Votes)',
    image: 'https://via.placeholder.com/40?text=MGH',
  },
  {
    id: 2,
    name: 'Women Striped T-Shirt',
    category: 'T-Shirt',
    inventory: 56,
    color: 'White',
    price: '$34.90',
    rating: '4.8 (24 Votes)',
    image: 'https://via.placeholder.com/40?text=WST',
  },
  {
    id: 3,
    name: 'Women White T-Shirt',
    category: 'T-Shirt',
    inventory: 78,
    color: 'White',
    price: '$40.90',
    rating: '5.0 (54 Votes)',
    image: 'https://via.placeholder.com/40?text=WWT',
  },
  {
    id: 4,
    name: 'Men White T-Shirt',
    category: 'T-Shirt',
    inventory: 32,
    color: 'White',
    price: '$49.90',
    rating: '4.5 (31 Votes)',
    image: 'https://via.placeholder.com/40?text=MWT',
  },
  {
    id: 5,
    name: 'Women Red T-Shirt',
    category: 'T-Shirt',
    inventory: 32,
    color: 'White',
    price: '$34.90',
    rating: '4.9 (22 Votes)',
    image: 'https://via.placeholder.com/40?text=WRT',
  },
  {
    id: 6,
    name: 'Men Grey Hoodie',
    category: 'Hoodies',
    inventory: 96,
    color: 'Black',
    price: '$49.90',
    rating: '5.0 (32 Votes)',
    image: 'https://via.placeholder.com/40?text=MGH',
  },
  {
    id: 7,
    name: 'Women Striped T-Shirt',
    category: 'T-Shirt',
    inventory: 56,
    color: 'White',
    price: '$34.90',
    rating: '4.8 (24 Votes)',
    image: 'https://via.placeholder.com/40?text=WST',
  },
  {
    id: 8,
    name: 'Women White T-Shirt',
    category: 'T-Shirt',
    inventory: 0,
    color: 'White',
    price: '$40.90',
    rating: '5.0 (54 Votes)',
    image: 'https://via.placeholder.com/40?text=WWT',
  },
  {
    id: 9,
    name: 'Men White T-Shirt',
    category: 'T-Shirt',
    inventory: 0,
    color: 'White',
    price: '$49.90',
    rating: '4.5 (31 Votes)',
    image: 'https://via.placeholder.com/40?text=MWT',
  },
  {
    id: 10,
    name: 'Women Red T-Shirt',
    category: 'T-Shirt',
    inventory: 0,
    color: 'White',
    price: '$34.90',
    rating: '4.9 (22 Votes)',
    image: 'https://via.placeholder.com/40?text=WRT',
  },
];

const ProductsTable = () => {

  const [allProducts, setAllProducts] = useState(products);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const router = useRouter()
  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;
  const filtered = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(allProducts.length / rowsPerPage);

  const paginated = allProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(paginated.map((row) => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleCheckboxClick = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getStockChip = (inventory) =>
    inventory > 0 ? (
      <Typography>{inventory} in stock</Typography>
    ) : (
      <Chip label="Out of Stock" color="default" variant="outlined" size="small" />
    );
    const handleNavigation=(path)=>{
      router.push(path)
    }
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5" fontWeight="bold" color='#fff'>Products</Typography>
            </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box display="flex" gap={2}>
          <Button variant="outlined" startIcon={<FilterList sx={{color:"#fff"}}/>} sx={{color:"#fff",border:"1px solid #fff"}} onClick={handleClick}>
            Filter
          </Button>

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
                {["Newest First","Oldest First"].map((option) => (
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
                      setAllOrders(products);
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
        <Box display="flex" gap={1}>
          {/* <IconButton><Edit sx={{color:"#fff"}}/></IconButton> */}
          <Button variant="outlined" startIcon={<Add sx={{color:"#fff"}}/>} sx={{color:"#fff",border:"1px solid #fff"}} onClick={()=>handleNavigation("add-product")}>
            Add Product
          </Button>
        </Box>
      </Box>

      <Paper>
        <TableContainer>
          <Table sx={{height:"100%"}}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  {/* <Checkbox
                    checked={selected.length === paginated.length}
                    indeterminate={selected.length > 0 && selected.length < paginated.length}
                    onChange={handleSelectAll}
                  /> */}
                </TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Inventory</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell padding="checkbox">
                    {/* <Checkbox
                      checked={selected.includes(row.id)}
                      onChange={() => handleCheckboxClick(row.id)}
                    /> */}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar variant="square" src={row.image} />
                      <Box>
                        <Typography fontWeight="bold">{row.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{row.category}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{getStockChip(row.inventory)}</TableCell>
                  <TableCell>{row.color}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <Typography>{allProducts.length} Results</Typography>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
            variant="outlined"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default WithAdminLayout(ProductsTable);
