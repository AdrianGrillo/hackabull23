import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import GoogleMaps from "./GooglePlace";
import { useState } from "react";

export default function JobSearch({ setJob, setLoc, setLiv }) {
  const [jobTitle, setJobTitle] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [livingType, setLivingType] = useState("");
  const handleJobTitle = (e) => {
    setJobTitle(e.target.value);
    setJob(e.target.value);
  };

  const handleCurrentLocation = (e) => {
    setCurrentLocation(e.target.value);
    setLoc(e.target.value);
  };

  const handleLivingType = (e) => {
    setLivingType(e.target.value);
    setLiv(e.target.textContent);
  };

  const inputStyle = {
    backgroundColor: "#022c43",
    color: "#ffd700",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiSelect-icon": {
      color: "#ffd700",
    },
    "& .MuiMenu-paper": {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    "& .MuiMenuItem-root": {
      color: "#ffd700",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginBottom: 2,
      }}
    >
      <Box sx={{ minWidth: 200 }}>
        <TextField
          label="Job Title"
          sx={[{ color: "#ffd700", width: "100%"}, inputStyle]}
          type="text"
          value={jobTitle}
          onChange={(e) => handleJobTitle(e)}
        />
      </Box>
      <Box sx={{ minWidth: 200 }}>
        <GoogleMaps setCurrentLocation={setCurrentLocation} />
      </Box>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel sx={{ color: "#ffd700" }} id="living-label">
            Home Type
          </InputLabel>
          <Select
            labelId="living-label"
            value={livingType}
            label="Home Type"
            sx={inputStyle}
            onChange={(e) => handleLivingType(e)}
          >
            <MenuItem value={1}>Rent</MenuItem>
            <MenuItem value={2}>Buy</MenuItem>
            <MenuItem value={3}>Lease</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
