import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { styled, useTheme } from "@mui/material/styles";

import { Copyright } from "./Copyright";
import { AppBar } from "./AppBar";
import { Drawer } from "./Drawer";
import { Backdrop } from "./Backdrop";
import { SideMenuListItems, LINKS } from "./SideMenuListItems";

const drawerWidth = 240;

const mdTheme = createTheme();

const Main = styled("main")(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
  flexGrow: 1,
  height: "100vh",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    marginLeft: theme.spacing(7),
    width: `calc(100% - ${theme.spacing(7)}px)`,
  },
}));

const MobileBackdrop = styled(Backdrop)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

export const Dashboard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = useState(
    window.innerWidth > theme.breakpoints.values.md
  );
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const currentPageName = LINKS.find((link) =>
    location.pathname.includes(link.path)
  )?.text;

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} drawerWidth={drawerWidth}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {currentPageName}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <SideMenuListItems />
        </Drawer>
        {open && <MobileBackdrop onClick={toggleDrawer} />}
        <Main>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
            {children}
          </Container>
          <Copyright sx={{ pt: 4 }} />
        </Main>
      </Box>
    </ThemeProvider>
  );
};
