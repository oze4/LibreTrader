import React, { useState, useContext, useMemo } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  MenuItem,
  Tooltip,
  Button,
  ToggleButton,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  ToggleButtonGroup,
} from "@mui/material";

import { DarkMode, LightMode } from "@mui/icons-material";
import { ColorModeContext } from "@/theme";
import { Link as RouterLink, useLocation } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "Planner", path: "/planner" },
];

export default function TopbarResponsive(props) {
  const location = useLocation();
  const theme = useContext(ColorModeContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const isSelectedPage = (page) => useMemo(() => location.pathname === page.path, [location]);

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
    <AppBar position="fixed">
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

          {/* ONLY SHOWN ON SMALL SCREENS */}
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
          {/* end ONLY SHOWN ON SMALL SCREENS */}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              return (
                <Button
                  size="small"
                  color="info"
                  sx={{ margin: "0 0.3em" }}
                  variant={isSelectedPage(page) ? "contained" : "inherit"}
                  key={page.name}
                  component={RouterLink}
                  to={page.path}
                >
                  {page.name}
                </Button>
              );
            })}
          </Box>
          {/*   
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <ToggleButtonGroup size="small" exclusive>
              {pages &&
                pages.length > 0 &&
                pages.map((page) => (
                  <ToggleButton
                    size="small"
                    value={page.name}
                    selected={isSelectedPage(page.path)}
                    key={page.name}
                    component={RouterLink}
                    to={page.path}
                  >
                    <Typography>{page.name}</Typography>
                  </ToggleButton>
                ))}
            </ToggleButtonGroup>
          </Box>
          */}
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
  );
}
