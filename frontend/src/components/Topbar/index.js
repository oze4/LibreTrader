import React, { useState, useContext } from "react";
import {
  AppBar,
  Container,
  Button,
  Box,
  Grid,
  Typography,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  DarkMode,
  LightMode,
  Menu as MenuIcon,
  AccountCircle,
} from "@mui/icons-material";

import { ColorModeContext } from "@/theme";

const pages = ["Home", "Planner"];

export default function Topbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const theme = useContext(ColorModeContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* LEFT DRAWER MENU ICON */}
            {/*
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          */}

            {/* LOGO NAME */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Libre Trader
            </Typography>

            <Box sx={{ float: "left" }}>
              {pages.map((page) => (
                <Button
                  color="secondary"
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* TOGGLE DARK MODE */}
            <div>
              <Tooltip
                title={`switch to ${
                  theme.mode === "dark" ? "light" : "dark"
                } mode`}
              >
                <IconButton size="large" onClick={theme.toggle} color="inherit">
                  {
                    // We want to show the light mode icon when dark mode is selected
                    theme.mode === "dark" ? <LightMode /> : <DarkMode />
                  }
                </IconButton>
              </Tooltip>

              {/* RIGHT DROP DOWN MENU */}
              {/*
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
            */}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
