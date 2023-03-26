import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  Tab,
  Tabs,
  createTheme,
} from "@mui/material";
import { keyframes } from "@mui/system";
import Link from "next/link";
import theme from "@/styles/text-field-style";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const GetStartedPage = () => {
  const [value, setValue] = useState(0);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [desiredSalary, setDesiredSalary] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Send data to your API or backend server to store it in CockroachDB
    // Example:
    // const response = await fetch('/api/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, dob, email, password, city, state, desiredSalary }),
    // });
    //
    // if (response.ok) {
    //   // Redirect the user to the job searching page
    //   // Example using Next.js router:
    //   // import { useRouter } from 'next/router';
    //   // const router = useRouter();
    //   // router.push('/job-finder');
    // }
  };

  // ... rest of the code

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
          paddingTop: 8,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            animation: `${fadeIn} 1s ease-in`,
          }}
        >
          Welcome to your FreshStart
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Sign Up" />
          <Tab label="Log In" />
        </Tabs>

        {value === 0 && (
          <Box
            component="form"
            onSubmit={handleSignUp}
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={theme}
            />
            <TextField
              label="Date of Birth"
              fullWidth
              variant="outlined"
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              sx={theme}
            />
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={theme}
            />
            <TextField
              label="Password"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={theme}
            />
            <TextField
              label="City"
              fullWidth
              variant="outlined"
              margin="normal"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              sx={theme}
            />
            <TextField
              label="State"
              fullWidth
              variant="outlined"
              margin="normal"
              value={state}
              onChange={(e) => setState(e.target.value)}
              sx={theme}
            />
            <TextField
              label="Desired Salary"
              fullWidth
              variant="outlined"
              margin="normal"
              value={desiredSalary}
              onChange={(e) => setDesiredSalary(e.target.value)}
              sx={theme}
            />
            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Sign Up
              </Button>
              <Typography variant="h6" sx={{ mx: 2, mt: 2 }}>
                Or
              </Typography>

              <Link href="/job-finder" passHref>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Skip
                </Button>
              </Link>
            </Box>
          </Box>
        )}
        {value === 1 && (
          <Box
            component="form"
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              sx={theme}
            />
            <TextField
              label="Password"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
              sx={theme}
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Log In
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default GetStartedPage;
