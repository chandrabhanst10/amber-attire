'use client';
import React from 'react';
import { Box } from '@mui/material';
import AdminHeader2 from './components/AdminHeader2';


const AdminLayout = ({ children }) => {
    return (
        <Box>
            <AdminHeader2 children={children} />
        </Box>
    );
};

export default AdminLayout;