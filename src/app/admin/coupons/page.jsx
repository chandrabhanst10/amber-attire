"use client"
import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    Tabs,
    Tab,
    Paper,
    Grid,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    IconButton,
    Chip,
    Pagination,
    InputAdornment,
    Modal,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { Edit, Delete, FilterList, Search } from "@mui/icons-material";
import WithAdminLayout from "@/app/HOC/WithAdminLayout";
import { useRouter } from "next/navigation";

const couponData = [
    { name: "Summer discount 10% off", code: "Summer2020", usage: 15, status: "Active", date: "May 5, 2020 - May 15, 2020" },
    { name: "Free shipping on all items", code: "Shipfreetome15", usage: 42, status: "Active", date: "May 5, 2020 - May 15, 2020" },
    { name: "Discount for women clothes 5%", code: "Womenclothing5", usage: 12, status: "Active", date: "April 12, 2020 - April 20, 2020" },
    { name: "Summer discount 10% off", code: "Summer2020", usage: 8, status: "Active", date: "April 12, 2020 - April 20, 2020" },
    { name: "Free shipping on all items", code: "Shipfreetome15", usage: 18, status: "Active", date: "April 12, 2020 - April 20, 2020" },
    { name: "Discount for women clothes 10%", code: "Womenclothing5", usage: 57, status: "Active", date: "Feb 14, 2020 - Feb 20, 2020" },
    { name: "Summer discount 15% off", code: "Summer2020", usage: 16, status: "Active", date: "Feb 14, 2020 - Feb 20, 2020" },
    { name: "Free shipping on all items", code: "Shipfreetome15", usage: 15, status: "Expired", date: "Feb 14, 2020 - Feb 20, 2020" },
    { name: "Discount for women clothes 10%", code: "Womenclothing5", usage: 12, status: "Expired", date: "Feb 14, 2020 - Feb 20, 2020" },
    { name: "Discount for women clothes 5%", code: "Womenclothing5", usage: 76, status: "Expired", date: "Feb 14, 2020 - Feb 20, 2020" },
];

const Coupons = () => {
    const [tab, setTab] = useState(0);
    const router = useRouter();
    const [couponType, setCouponType] = useState('Fixed Discount');
    const [couponTypes, setCouponTypes] = useState(['Fixed Discount', 'Percentage Discount', 'Free Shipping', 'Price Discount']);
    const [createCoupon, setCreateCoupon] = useState(false)
    const [couponFormData,setCouponFormData]=useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const filteredCoupons = couponData.filter(coupon => {
        if (tab === 1) return coupon.status === "Active";
        if (tab === 2) return coupon.status === "Expired";
        return true;
    });
    const handleCreateCouponChange=(event)=>{
        setCouponFormData((prev)=>({
            ...prev,
            [event.target.name]:event.target.value
        }))
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log("@@@@handleSubmit",couponFormData);
        
    }
    const CreateCouponModal = () => {
        return (
            <Modal open={createCoupon} onClose={() => setCreateCoupon(false)} disableEscapeKeyDown closeAfterTransition sx={{ display: "flex" }}>
                <Box sx={{ p: 3, backgroundColor: '#fff', width: { xs: "90%", sm: "70%", md: "50%" }, margin: "auto", borderRadius: "10px" }}>
                    <form onSubmit={handleSubmit}>
                    <Typography variant="h5">Create Coupon</Typography>
                    <Box p={2} backgroundColor={"#fff"} borderRadius={"10px"}>
                        <Box mb={3}>
                            <Typography variant="subtitle1" mb={1}>Coupon Information</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField fullWidth variant="outlined" label="Coupon Code" placeholder="Enter code" name="couponCode" onChange={handleCreateCouponChange}/>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField fullWidth variant="outlined" label="Coupon Name" placeholder="Enter name" name="couponName" onChange={handleCreateCouponChange}/>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box mb={3}>
                            <Typography variant="subtitle1" mb={1} color='#000'>Coupon Type</Typography>
                            <Grid container spacing={2}>
                                {couponTypes.map((type) => (
                                    <Grid item xs={6} md={3} key={type}>
                                        <Button
                                        type="button"
                                            fullWidth
                                            variant={couponType === type ? 'contained' : 'outlined'}
                                            onClick={() => setCouponType(type)}
                                            sx={{ color: couponType === type ? '#FFF' : '#000' }}
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
                                <Typography variant="subtitle1" mb={1}>Coupon Percentage</Typography>
                                    <TextField type="number" fullWidth variant="outlined" name="couponPercentage" onChange={handleCreateCouponChange} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button variant="outlined">Cancel</Button>
                        <Button variant="contained">Save</Button>
                    </Box>
                    </form>
                </Box>
            </Modal>
        );
    }

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight="bold" color="#fff">
                    Coupons
                </Typography>
                <Button
                    variant="outlined"
                    sx={{
                        border: "1px solid #fff",
                        color: "#fff",
                        "&:hover": { backgroundColor: "#115293" },
                    }}
                    onClick={() => setCreateCoupon(true)}
                >
                    + Create
                </Button>
            </Box>
            <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
                <Tabs value={tab} onChange={handleTabChange} textColor="primary" indicatorColor="primary" sx={{ mb: 3 }}>
                    <Tab label="All Coupons" />
                    <Tab label="Active Coupons" />
                    <Tab label="Expired Coupons" />
                </Tabs>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Button variant="outlined" startIcon={<FilterList />} sx={{
                            color: "#6b7280",
                            borderColor: "#d1d5db",
                            textTransform: "none",
                        }}>
                            Filter
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            size="small"
                            placeholder="Search..."
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
                <TableContainer component={Paper} elevation={2} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>Coupon Name</TableCell>
                                <TableCell>Usage</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCoupons.map((coupon, idx) => (
                                <TableRow key={idx}>
                                    <TableCell padding="checkbox">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontWeight="bold">{coupon.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {coupon.code}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{coupon.usage} times</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={coupon.status}
                                            color={coupon.status === "Active" ? "success" : "default"}
                                            size="small"
                                            sx={{ fontWeight: "bold" }}
                                        />
                                    </TableCell>
                                    <TableCell>{coupon.date}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" color="primary">
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="error">
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        120 Results
                    </Typography>
                    <Pagination count={24} page={2} shape="rounded" color="primary" />
                </Box>
            </Paper>
            <CreateCouponModal />
        </Box>
    );
};

export default WithAdminLayout(Coupons);
