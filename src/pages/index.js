import React from "react";
import Link from "next/link";
import { Container, Typography, Box, Button } from "@mui/material";

function Home() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '90vh',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 4,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          FreshStart
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Empowering New Beginnings
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          FreshStart connects job seekers with affordable living opportunities, providing personalized recommendations and resources for a brighter future.
        </Typography>
        <Box sx={{ marginTop: 3 }}>
          <nav>
          <Link href="/get-started" style={{ textDecoration: 'none' }} passHref>
            <Button variant="contained" color="primary" size="large">
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
