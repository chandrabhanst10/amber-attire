
import styled from 'styled-components';
import { Box } from '@mui/material';
import { ReactNode } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';

const UserLayout = ({ children }: { children: ReactNode }) => {
    return (
        <MainContainer>
            <Header />
            <Box className={"mainContent"}>
                {children}
            </Box>
            {/* <Box className="footerContainer">
                    <Footer />
                </Box> */}
        </MainContainer>
    );
};

export default UserLayout;
const MainContainer = styled(Box)({
    // position: "relative",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    "& .footerContainer": {
        position: "fixed",
        width: "100%",
        left: 0,
        bottom: 0,

    },
    "& .mainContent": {
        // padding: "1% 2%",
        // height:"78vh",
        // overflow:"scroll"
        flex: 1,
        padding: "1% 2%",
        overflowY: "auto"
    }
});