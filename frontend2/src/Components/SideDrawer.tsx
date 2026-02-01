import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Typography } from '@mui/material';
import menuItems from '../Utils/menuItems';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

import { SideDrawerProps } from '../types/types';

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, drawerHandler, isAuthenticated }) => {
    const navigate = useNavigate()
    const DrawerList = (
        <Box sx={{
            width: 250,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            bgcolor: '#f5f5f5',
            p: 2,
        }}
            role="presentation" onClick={drawerHandler}>
            <List>
                {menuItems.map((Item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => navigate(Item.path)}>
                            <ListItemIcon>
                                {Item.icon}
                            </ListItemIcon>
                            <ListItemText primary={Item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box>
                <Divider sx={{ my: 1 }} />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </Box>
        </Box>
    );

    const TopSideBarProfile = () => {
        return <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            py={1}
            px={1}
            sx={{ borderBottom: '1px solid #e0e0e0' }}
        >
            <Avatar
                alt="Andrea Hirata"
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                sx={{ width: 60, height: 60, mb: 1 }}
            />
            <Typography variant="h6" fontWeight="500">
                Andrea Hirata
            </Typography>
            <Typography variant="body2" color="text.secondary">
                hirata@gmail.com
            </Typography>
        </Box>
    }
    return (
        <div>
            <Drawer open={isOpen} onClose={drawerHandler}>
                <TopSideBarProfile />
                {DrawerList}
            </Drawer>
        </div>
    );
}
export default SideDrawer