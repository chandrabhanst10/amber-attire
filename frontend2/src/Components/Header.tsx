"use client";

import React, { useEffect, useState } from "react";
import { AppBar, Badge, Box, Divider, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled, Theme } from "@mui/material/styles";
import SideDrawer from "./SideDrawer";
import { HeaderCenterIcon } from "../Assets";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logoutSlice } from "../redux/slices/userSlice";
import { getCartData } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { RootState, useAppSelector } from "../redux/store"
import useCustomNavigate from "../Utils/Navigation";
import { Link } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { toggleTheme } from "../redux/slices/themeSlice";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const router = useCustomNavigate();
  const dispatch = useDispatch<any>();
  const { cartItems } = useAppSelector((state: RootState) => state.cart);
  const { mode } = useAppSelector((state: RootState) => state.theme);
  const role = Cookies.get("role");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      getCartItems();
    }
  }, []);

  useEffect(() => {
  }, [cartItems]);

  const getCartItems = async () => {
    try {
      await dispatch(getCartData());
    } catch (err) {
      // handle error if you want
      // console.error(err);
    }
  };

  const drawerHandler = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutSlice());
      if (response?.payload?.data?.success) {
        toast.success(response.payload.data.message);
        router("/signin");
      } else {
        toast.error(response?.payload?.data?.message ?? "Logout failed");
      }
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <HeaderContainer>
        <AppBar position="static" className="toolbarContainer">
          <Toolbar className="headerToolbarContainer">
            <IconButton className="menuIcon" onClick={drawerHandler} aria-label="menu">
              <MenuIcon />
            </IconButton>

            <Box className="centerMenu">
              <Box>
                <Link to="/" className="headerIcon">
                  <img src={HeaderCenterIcon} width={30} height={30} alt="Website Logo" />
                  <Typography variant="h6" className="centerText">
                    Aangan Attire
                  </Typography>
                </Link>
              </Box>
            </Box>

            <Box className={"centerIcon"}>
              <Link to="/" className="headerIcon">
                <img src={HeaderCenterIcon} width={30} height={30} alt="Website Logo" />
              </Link>
            </Box>

            {role ? (
              <Box>
                <Box className="rightIcons">
                  <Box className="menuLinksContainer">
                    <IconButton onClick={() => router("/user/cart")} aria-label="cart">
                      <Badge badgeContent={cartItems?.items?.length ?? 0} color="primary">
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>
                  </Box>

                  <IconButton onClick={() => router("/user/profile")} aria-label="profile">
                    <PermIdentityOutlinedIcon />
                  </IconButton>

                  <IconButton onClick={handleLogout} aria-label="logout">
                    <LogoutIcon />
                  </IconButton>
                  <IconButton onClick={() => dispatch(toggleTheme())} aria-label="toggle theme">
                    {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Box>
              </Box>
            ) : (
              <Box>
                <Box className="rightIcons">
                  <IconButton onClick={() => { router("/sign-in") }} aria-label="login">
                    <LoginIcon />
                  </IconButton>
                  <IconButton onClick={() => dispatch(toggleTheme())} aria-label="toggle theme">
                    {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Box>
              </Box>
            )}
          </Toolbar>
        </AppBar>

        <SideDrawer isOpen={drawerOpen} drawerHandler={drawerHandler} isAuthenticated={!!role} />
        <Divider />
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
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
    textDecoration: "none",
  },
  "& .centerText": {
    color: theme.palette.text.primary,
    fontStyle: "italic",
  },
  "& .rightIcons": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "10px",
  },
  "& .popoverMenuContainer": {
    width: "300px",
    border: "1px solid red",
  },
  "& .menuLinksContainer": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "15px",
    textDecoration: "none",
  },
  "& .headerIcon": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "15px",
    textDecoration: "none",
  },
  "& .menuLinks": {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  "& .centerIcon": {
    display: "none",
  },

  [theme.breakpoints.down("md")]: {
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
      display: "none",
    },
    "& .rightIcons": {
      display: "none",
    },
    "& .centerIcon": {
      display: "block",
    },
  },
}));
