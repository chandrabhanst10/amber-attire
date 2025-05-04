'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';
import { HeaderCenterIcon } from '@/app/Assets';
import { Avatar, Badge, InputBase, Menu, MenuItem, useMediaQuery } from '@mui/material';
import {
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Message as MessageIcon,
    ExpandMore as ExpandMoreIcon,
    Dashboard,
    Inventory2,
    People,
    LocalOffer,
    Chat,
    Settings
} from '@mui/icons-material';
import { useNavigate } from '@/app/Utils/Navigation';

const drawerWidth = 240;

const DrawerHeader = styled('div')`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 8px;
    background-color: #060621;
    height: 64px;
`;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ open }) => ({
    zIndex: 1201,
    backgroundColor: '#060621',
    transition: 'width 0.3s ease, margin 0.3s ease',
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open
        ? {
              width: drawerWidth,
              '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  backgroundColor: '#060621',
                  color: '#fff',
                  transition: 'width 0.3s ease',
              },
          }
        : {
              width: 64,
              '& .MuiDrawer-paper': {
                  width: 64,
                  backgroundColor: '#060621',
                  color: '#fff',
                  transition: 'width 0.3s ease',
              },
          }),
}));

const SidebarContainer = styled(Box)`
    height: 100vh;
    background-color: #060621;
    color: #fff;
    display: flex;
    flex-direction: column;
`;

const ListSection = styled(List)`
    padding: 0;
`;

export default function AdminHeader2({ children }) {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMobile = useMediaQuery('(max-width:600px)');
    const navigate = useNavigate();

    const mainMenu = [
        { text: 'Dashboard', icon: <Dashboard sx={{ color: '#fff' }} />, path: '/admin' },
        { text: 'Orders', icon: <Inventory2 sx={{ color: '#fff' }} />, path: '/admin/orders' },
        { text: 'Products', icon: <Inventory2 sx={{ color: '#fff' }} />, path: '/admin/products' },
        { text: 'Customers', icon: <People sx={{ color: '#fff' }} />, path: '/admin/customers' },
        { text: 'Coupons', icon: <LocalOffer sx={{ color: '#fff' }} />, path: '/admin/coupons' },
        { text: 'Inbox', icon: <Chat sx={{ color: '#fff' }} />, path: '/admin/inbox' },
        { text: 'Personal Settings', icon: <Settings sx={{ color: '#fff' }} />, path: '/admin/settings' },
    ];

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ display: 'flex' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon sx={{ color: '#fff' }} />
                    </IconButton>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'cursive' }}>
                                <span style={{ color: '#ffcc00' }}>
                                    <Image src={HeaderCenterIcon} width={15} height={15} alt="Logo" />
                                </span>{' '}
                                Amber Attire
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
                    </Box>
                </Toolbar>
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
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {open ? <ChevronLeftIcon sx={{ color: '#fff' }} /> : <ChevronRightIcon sx={{ color: '#fff' }} />}
                    </IconButton>
                </DrawerHeader>
                <SidebarContainer>
                    <ListSection>
                        {mainMenu.map((item, index) => (
                            <ListItemButton key={index} onClick={() => navigate(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        ))}
                    </ListSection>
                </SidebarContainer>
            </Drawer>
            <Box
                component="main"
                sx={{
                    width: '100%',
                    backgroundColor: '#0f172a',
                    height: '100vh',
                    overflow: 'scroll',
                }}
            >
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}
