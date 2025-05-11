'use client';
import React, { useEffect, useState } from 'react';
import Header from '../Components/Header'; // adjust the path as needed
import styled from 'styled-components';
import { Box } from '@mui/material';
import Footer from '../Components/Footer';
import Loader from '../Components/Loader';

const WithLayout = (WrappedComponent) => {

    return function LayoutComponent(props) {
        const [loading, setLoading] = React.useState(true);
        useEffect(() => {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 500);

            return () => clearTimeout(timer);
        }, []);
        return (
            <MainContainer>
                <Header />
                <Box className={"mainContent"}>
                    {loading ? <Loader /> : <WrappedComponent {...props} />}
                </Box>
                <Box className="footerContainer">
                    <Footer />
                </Box>
            </MainContainer>
        );
    };
};

export default WithLayout;
const MainContainer = styled(Box)({
    // height:"100vh",
    position: "relative",
    "& .footerContainer": {
        position: "fixed",
        width: "100%",
        left: 0,
        bottom: 0,
    },
    "& .mainContent": {
        padding: "1% 2%",
        height:"78vh",
        overflow:"scroll"
    }
});