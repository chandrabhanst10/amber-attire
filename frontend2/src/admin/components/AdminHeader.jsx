import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    Box,
    Avatar,
    Badge,
    IconButton,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Message as MessageIcon,
    ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { HeaderCenterIcon } from '@/app/Assets';
import MenuIcon from "@mui/icons-material/Menu";
import AdminSideBar from './AdminSideBar';
const AdminHeader = ({ children }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerHandler = () => {
        setDrawerOpen(!drawerOpen)
    }
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: '#060621', p: 1 }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Logo + Search */}
                <IconButton className="menuIcon" onClick={drawerHandler}>
                    <MenuIcon color='#fff' style={{ color: "#fff" }} />
                </IconButton>
                <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'cursive' }}>
                        <span style={{ color: '#ffcc00' }}>
                            <img src={HeaderCenterIcon} width={15} height={15} alt="Website Logo" />
                        </span> Aangan Attire
                    </Typography>
                    {!isMobile && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: '#1a1a2e',
                                borderRadius: 2,
                                px: 2,
                            }}
                        >
                            <SearchIcon sx={{ color: 'gray', mr: 1 }} />
                            <InputBase placeholder="Search..." sx={{ color: '#fff' }} />
                        </Box>
                    )}
                </Box>

                {/* Right Side */}
                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton>
                        <MessageIcon sx={{ color: '#fff' }} />
                    </IconButton>
                    <IconButton>
                        <Badge badgeContent={5} color="primary">
                            <NotificationsIcon sx={{ color: '#fff' }} />
                        </Badge>
                    </IconButton>
                    <Avatar sx={{ bgcolor: 'green' }}>R</Avatar>
                    {!isMobile && (
                        <Box display="flex" alignItems="center" onClick={handleMenuOpen} sx={{ cursor: 'pointer' }}>
                            <Typography sx={{ color: '#fff', mx: 1 }}>Randhir kumar</Typography>
                            <ExpandMoreIcon sx={{ color: '#fff' }} />
                        </Box>
                    )}
                </Box>
            </Toolbar>

            {/* Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
            <Box sx={{ display: "flex", height: "99vh" }}>

                <AdminSideBar isOpen={drawerOpen} drawerHandler={drawerHandler} />
                <Box sx={{ height: "90hv", overflow: "scroll" }}>

                    {children}
                </Box>
            </Box>
        </AppBar>
    );
};

export default AdminHeader;
