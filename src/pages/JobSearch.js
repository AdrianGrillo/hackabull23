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
    setJobTitle(e.target.value)
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

  return (
    <div className="flex form">
      <Box sx={{ minWidth: 200 }}>
        <TextField
          label="Job Title"
          className="input"
          type="text"
          value={jobTitle}
          onChange={(e) => handleJobTitle(e)}
        />
      </Box>
      <Box sx={{ minWidth: 200 }}>
        <GoogleMaps setCurrentLocation={setCurrentLocation} />
        {console.log(currentLocation)}
      </Box>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="living-label">Home Type</InputLabel>
          <Select
            labelId="living-label"
            value={livingType}
            label="Home Type"
            onChange={(e) => handleLivingType(e)}
          >
            <MenuItem value={1}>Rent</MenuItem>
            <MenuItem value={2}>Buy</MenuItem>
            <MenuItem value={3}>Lease</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
