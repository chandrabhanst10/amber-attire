'use client';
import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Drawer
} from '@mui/material';
import {
  Dashboard,
  Inventory2,
  Category,
  People,
  BarChart,
  LocalOffer,
  Chat,
  Settings,
  Help,
  Update,
  Tune
} from '@mui/icons-material';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSideBar = ({ isOpen, drawerHandler }) => {
  const navigate = useNavigate();

  const mainMenu = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
    { text: 'Orders', icon: <Inventory2 />, path: '/admin/orders' },
    { text: 'Products', icon: <Inventory2 />, path: '/admin/products' },
    { text: 'Categories', icon: <Category />, path: '/admin/categories' },
    { text: 'Customers', icon: <People />, path: '/admin/customers' },
    { text: 'Reports', icon: <BarChart />, path: '/admin/reports' },
    { text: 'Coupons', icon: <LocalOffer />, path: '/admin/coupons' },
    { text: 'Inbox', icon: <Chat />, path: '/admin/inbox' },
  ];

  const extraMenu = [
    { text: 'Knowledge Base', icon: <Help />, path: '/admin/knowledge' },
    { text: 'Product Updates', icon: <Update />, path: '/admin/updates' },
  ];

  const settingsMenu = [
    { text: 'Personal Settings', icon: <Settings />, path: '/admin/personal' },
    { text: 'Global Settings', icon: <Tune />, path: '/admin/global' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <SidebarContainer open={isOpen} onClose={drawerHandler} variant="permanent">
      <ListSection>
        {mainMenu.map((item, index) => (
          <ListItemButton key={index} onClick={() => handleNavigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </ListSection>
      <Divider />
      <ListSection>
        {extraMenu.map((item, index) => (
          <ListItemButton key={index} onClick={() => handleNavigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </ListSection>
      <Divider />
      <ListSection>
        {settingsMenu.map((item, index) => (
          <ListItemButton key={index} onClick={() => handleNavigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </ListSection>
    </SidebarContainer>
  );
};

export default AdminSideBar;

// Styled Components
const SidebarContainer = styled(Box)`
  width: 340px;
  height: 100vh;
  background-color: #0f172a;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const ListSection = styled(List)`
  padding: 0;
`;

