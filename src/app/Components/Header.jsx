"use client";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderCenterIcon } from "../Assets.js"
import SideDrawer from "./SideDrawer.jsx";
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from "next/navigation.js";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const drawerHandler = () => {
    setDrawerOpen(!drawerOpen)
  };
  return (
    <>
      <HeaderContainer>
        <AppBar position="static" className="toolbarContainer">
          <Toolbar className="headerToolbarContainer">
            <IconButton className="menuIcon" onClick={drawerHandler}>
              <MenuIcon />
            </IconButton>
            <Box className="centerMenu">
              <Box >
                <Link href={"/"} className="headerIcon">
                  <Image priority src={HeaderCenterIcon} width={30} height={30} alt="Website Logo" />
                  <Typography variant="h6" className="centerText">Aangan Attire</Typography>
                </Link>
              </Box>
            </Box>
            <Box className={"centerIcon"}>
              <Link href={"/"} className="headerIcon">
                <Image priority src={HeaderCenterIcon} width={30} height={30} alt="Website Logo" />
              </Link>
            </Box>
            <Box >
              <Box className="rightIcons">
                <Box className="menuLinksContainer">
                  <IconButton onClick={() => router.push("/user/cart")}>
                    <ShoppingCartIcon />
                  </IconButton>
                </Box>
                <IconButton onClick={() => router.push("/user/profile")}>
                  <PermIdentityOutlinedIcon />
                </IconButton>
                <IconButton>
                  <LogoutIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <SideDrawer isOpen={drawerOpen} drawerHandler={drawerHandler} />
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled(Box)({
  "& .toolbarContainer": {
    backgroundColor: "transparent !important",
    boxShadow: "none",
  },
  "& .headerToolbarContainer": {
    padding: "0px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "& .menuIcon": {
    display: "none",
  },
  "& .centerMenu": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none"
  },
  "& .centerText": {
    color: "black",
    fontStyle: "italic"
  },
  "& .rightIcons": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "10px"
  },

  "& .popoverMenuContainer": {
    width: "300px",
    border: "1px solid red"
  },
  "& .menuLinksContainer": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "15px",
    textDecoration: "none"
  },
  "& .headerIcon": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "15px",
    textDecoration: "none"
  },
  "& .menuLinks": {
    color: "black",
    textDecoration: "none"
  },
  "& .centerIcon": {
    display: "none"
  },

  "@media (max-width: 900px)": {
    "& .headerToolbarContainer": {
      padding: "0px 10px",
    },
    "& .menuIcon": {
      display: "block",
    },
    "& .centerText": {
      display: "none",
    },
    "& .centerMenu": {
      display: "none"
    },
    "& .rightIcons": {
      display: "none"
    },
    "& .centerIcon": {
      display: "block"
    },
  }
});
