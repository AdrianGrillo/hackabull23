import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <nav>
          <Link href="/" passHref>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, textDecoration: "none", color: "white", marginRight: 2}}
            >
              FreshStart
            </Typography>
          </Link>
        </nav>
        <nav>
          <Link href="/get-started" passHref>
            <Button
              sx={{ color: "white", marginBottom: 0 }}
            >
              Get Started
            </Button>
          </Link>
        </nav>
        <nav>
          <Link href="/job-finder" passHref>
            <Button
              sx={{ color: "white", marginBottom: 0 }}
            >
              Job Finder
            </Button>
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
