import React, { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  MenuItem,
  Tooltip,
  Button,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  Link as MuiLink,
} from "@mui/material";

import { DarkMode, LightMode } from "@mui/icons-material";
import { ColorModeContext } from "@/theme";
import { Link as RouterLink, useLocation } from "react-router-dom";

import HideOnScroll from "./HideOnScroll";

const pages = [
  { name: "Home", path: "/" },
  { name: "Planner", path: "/planner" },
];

export default function TopbarResponsive(props) {
  const locaton = useLocation();
  const [selectedPage, setSelectedPage] = useState(
    pages.find((p) => p.path === location.pathname).name,
  );
  const theme = useContext(ColorModeContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <HideOnScroll>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              LibreTrader
            </Typography>

            {/* HIDDEN UNLESS ON SMALL SCREEN 
             THIS IS THE MOBILE MENU/RESPONSIVE MENU */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    component={RouterLink}
                    to={page.path}
                    key={page.name}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              LibreTrader
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  variant={selectedPage === page.name ? "outlined" : "filled"}
                  color="secondary"
                  key={page.name}
                  component={RouterLink}
                  to={page.path}
                  onClick={(e) => setSelectedPage(page.name)}
                >
                  <Typography>{page.name}</Typography>
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={`switch to ${theme.mode === "dark" ? "light" : "dark"} mode`}>
                <IconButton size="large" onClick={theme.toggle} color="inherit">
                  {
                    // We want to show the light mode icon when dark mode is selected
                    theme.mode === "dark" ? <LightMode /> : <DarkMode />
                  }
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              ></Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}
