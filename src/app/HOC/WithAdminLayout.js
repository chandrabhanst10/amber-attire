'use client';
import React from 'react';
import { Box } from '@mui/material';
import AdminHeader2 from '../admin/components/AdminHeader2';
import Loader from '../Components/Loader';

const WithAdminLayout = (WrappedComponent) => {
    return function LayoutComponent(props) {
        const [loading, setLoading] = React.useState(true);
                React.useEffect(() => {
                    const timer = setTimeout(() => {
                        setLoading(false);
                    }, 500);
        
                    return () => clearTimeout(timer);
                }, []);
        return (
            <Box>
                {loading ? <Loader /> : <AdminHeader2 children={<WrappedComponent {...props} />} />}
            </Box>
        );
    };
};

export default WithAdminLayout;