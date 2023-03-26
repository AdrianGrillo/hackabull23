import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import AccountCircle from "@mui/icons-material/AccountCircle";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "account-menu";

  return (
    <AppBar position="absolute">
      <Toolbar>
        <nav>
          <Link href="/" passHref>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                textDecoration: "none",
                color: "white",
                marginRight: 2,
              }}
            >
              FreshStart
            </Typography>
          </Link>
        </nav>
        <nav>
          <Link href="/get-started" passHref>
            <Button sx={{ color: "white", marginBottom: 0 }}>
              Get Started
            </Button>
          </Link>
        </nav>
        <nav>
          <Link href="/job-finder" passHref>
            <Button sx={{ color: "white", marginBottom: 0 }}>Job Finder</Button>
          </Link>
        </nav>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="account"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleMenuOpen}
          sx={{ marginRight: 2 }}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id={menuId}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          sx={{ marginTop: 2, marginRight: 2}}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          {/* Add conditional for if the user is logged in */}
          <MenuItem onClick={handleMenuClose}>Login</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
