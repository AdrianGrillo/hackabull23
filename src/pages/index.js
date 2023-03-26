import React from "react";
import Link from "next/link";
import { Container, Typography, Box, Button } from "@mui/material";
import { keyframes } from "@mui/system";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

function Home() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          justifyContent: "center",
          textAlign: "center",
          padding: 4,
        }}
      >
        <Typography
          sx={{ animation: `${fadeIn} 1s ease-in` }}
          variant="h2"
          component="h1"
          gutterBottom
        >
          FreshStart
        </Typography>
        <Typography
          sx={{ animation: `${fadeIn} 1.5s ease-in` }}
          variant="h5"
          component="p"
          gutterBottom
        >
          Empowering New Beginnings
        </Typography>
        <Typography
          sx={{ animation: `${fadeIn} 2s ease-in` }}
          variant="body1"
          component="p"
          gutterBottom
        >
          FreshStart connects job seekers with affordable living opportunities,
          providing personalized recommendations and resources for a brighter
          future.
        </Typography>
        <Box sx={{ marginTop: 3 }}>
          <nav>
            <Link href="/get-started" passHref>
              <Button
                sx={{ animation: `${fadeIn} 2.5s ease-in` }}
                variant="contained"
                color="primary"
                size="large"
              >
                Get Started
              </Button>
            </Link>
          </nav>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
