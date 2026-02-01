'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Checkbox, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Avatar, Pagination, Popover, Stack, List, ListItem, ListItemButton, ListItemText, } from '@mui/material';
import { FilterList, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import Loader from "../../Components/Loader"
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
  const [allProducts, setAllProducts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({ total: 0, page: 0, limit: 0, totalPages: 0 });
  const navigate = useNavigate()
  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;
  const { products, paginationData, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setAllProducts(products);
    setPagination(paginationData)
  }, [products])

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(products.map((row) => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleCheckboxClick = useCallback((id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);


  const getStockChip = (inventory) =>
    inventory > 0 ? (
      <Typography>{inventory} in stock</Typography>
    ) : (
      <Chip label="Out of Stock" color="default" variant="outlined" size="small" />
    );

  const handleNavigation = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  const handleClose = useCallback(() => setAnchorEl(null), []);
  const handleClick = useCallback((event) => setAnchorEl(event.currentTarget), []);
  const handlePagination = (_, value) => {
    // setPage(value);
    dispatch(fetchProducts(value));
  };
  return (
    <Box sx={{ p: 2 }}>
      {loading && <Loader />}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" fontWeight="bold" color='#fff'>Products</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box display="flex" gap={2}>
          <Button variant="outlined" startIcon={<FilterList sx={{ color: "#fff" }} />} sx={{ color: "#fff", border: "1px solid #fff" }} onClick={handleClick}>
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
                {["Newest First", "Oldest First"].map((option) => (
                  <ListItem disablePadding key={"option"}>
                    <ListItemButton
                      key={option}
                      onClick={() => { }} // Placeholder for handleOptionClick
                    >
                      <ListItemText primary={option} />
                    </ListItemButton>
                  </ListItem>
                ))}
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      // setAllOrders(products);
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
          <Button variant="outlined" startIcon={<Add sx={{ color: "#fff" }} />} sx={{ color: "#fff", border: "1px solid #fff" }} onClick={() => handleNavigation("add-product")}>
            Add Product
          </Button>
        </Box>
      </Box>
      <Paper>
        <TableContainer>
          <Table sx={{ height: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox checked={selected.length === allProducts?.length} indeterminate={selected.length > 0 && selected.length < allProducts.length} onChange={handleSelectAll} />
                </TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Inventory</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(allProducts) && allProducts.map((row) => (
                <TableRow key={row._id} hover onClick={() => handleNavigation(`/admin/products/${row._id}`)}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selected.includes(row._id)} onChange={() => handleCheckboxClick(row._id)} />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar variant="square" src={row.images[0]} />
                      <Box>
                        <Typography fontWeight="bold">{row.productName}</Typography>
                        <Typography variant="caption" color="text.secondary">{row.category}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{getStockChip(row.stock)}</TableCell>
                  <TableCell>{row.colors[0]?.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.ratings.average}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <Typography>{Array.isArray(allProducts) && allProducts.length} Results</Typography>
          <Pagination count={pagination.totalPages || 1} page={pagination.page || 1} onChange={handlePagination} color="primary" shape="rounded" variant="outlined" />
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductsTable;
