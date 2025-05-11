'use client';
import React from 'react';
import { Box } from '@mui/material';
import AdminHeader2 from '../admin/components/AdminHeader2';

const WithAdminLayout = (WrappedComponent) => {
    return function LayoutComponent(props) {
        return (
            <Box>
                 <AdminHeader2 children={<WrappedComponent {...props} />} />
            </Box>
        );
    };
};

export default WithAdminLayout;