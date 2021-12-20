import React, { useMemo } from "react";
import {
  Button,
  ListSubheader,
  AppBar,
  Toolbar,
  ClickAwayListener,
  Box,
  Drawer,
  List,
  ListItem,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export default function PlannerDrawer(props) {
  const {
    tradePlans = [],
    isOpen = false,
    onCloseClick = (e) => {},
    closeOnClickAway = true,
  } = props;

  const isIPadOrSmaller = useMediaQuery((theme) => {
    return theme.breakpoints.between("0", "811");
  });

  const calculateTradePlanDrawerSize = useMemo(() => {
    return isIPadOrSmaller ? "100vw" : "40vw";
  }, [isOpen]);

  return (
    <Drawer
      sx={{
        width: calculateTradePlanDrawerSize,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          zIndex: 9001,
          width: calculateTradePlanDrawerSize,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      open={isOpen}
      anchor="right"
    >
      {isOpen && (
        // Check if drawer is open so we don't fire the
        // clickAwayListener event every five seconds
        <ClickAwayListener onClickAway={(e) => (closeOnClickAway ? onCloseClick(e) : "")}>
          <List>
            <ListSubheader>
              <Typography variant="h5">Trade Plan</Typography>
            </ListSubheader>
            <Divider />
            {tradePlans.map((plan, index) => {
              return (
                <ListItem key={`${index}-${plan.date}-${plan.symbol}-${plan.summary.length}`}>
                  <Box sx={{ width: "100%" }}>
                    <TradePlanCard symbol={plan.symbol} date={plan.date} summary={plan.summary} />
                  </Box>
                </ListItem>
              );
            })}
            <AppBar
              position="fixed"
              color="primary"
              sx={{
                padding: "2em",
                // use `calculateTradePlanDrawerSize` for the appbar footer as well
                width: calculateTradePlanDrawerSize,
                top: "auto",
                bottom: 0,
              }}
            >
              <Toolbar>
                <Button
                  onClick={(e) => onCloseClick(e)}
                  variant="contained"
                  startIcon={<CloseIcon />}
                >
                  Close
                </Button>
              </Toolbar>
            </AppBar>
          </List>
        </ClickAwayListener>
      )}
    </Drawer>
  );
}
