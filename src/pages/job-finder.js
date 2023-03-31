import { useState, useEffect } from "react";
import {
  Radio,
  Container,
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import GoogleMaps from "./GooglePlace";
import theme from "@/styles/text-field-style";
import JobCard from "./JobCard";
import CityCompareTable from "./CityCompareTable";

const states = [
  "al",
  "ak",
  "az",
  "ar",
  "ca",
  "co",
  "ct",
  "de",
  "fl",
  "ga",
  "hi",
  "id",
  "il",
  "in",
  "ia",
  "ks",
  "ky",
  "la",
  "me",
  "md",
  "ma",
  "mi",
  "mn",
  "ms",
  "mo",
  "mt",
  "ne",
  "nv",
  "nh",
  "nj",
  "nm",
  "ny",
  "nc",
  "nd",
  "oh",
  "ok",
  "or",
  "pa",
  "ri",
  "sc",
  "sd",
  "tn",
  "tx",
  "ut",
  "vt",
  "va",
  "wa",
  "wv",
  "wi",
  "wy",
];

const sections = [
  "Buy Apartment prices",
  "Childcare prices",
  "Clothing And Shoes prices",
  "Markets prices",
  "Rent Per Month prices",
  "Restaurants prices",
  "Salaries And Financing prices",
  "Sports And Leisure prices",
  "Transportation prices",
  "Utilities Per Month prices",
];

export default function Home() {
  const [jobsData, setJobsData] = useState([]);
  const [city1Input, setCity1Input] = useState("");
  const [city2Input, setCity2Input] = useState("");
  const [city1State, setCity1State] = useState("");
  const [city2State, setCity2State] = useState("");
  const [functionSelected, setFunctionSelected] = useState("col");
  const [jobInput, setJobInput] = useState("");
  const [searchDone, setSearchDone] = useState(false);
  const [city1DataTransformed, setCity1DataTransformed] = useState([]);
  const [city2DataTransformed, setCity2DataTransformed] = useState([]);

  const handleJobInput = (e) => setJobInput(e.target.value);

  const handleCity1Input = (e) => setCity1Input(e.target.value);

  const handleCity2Input = (e) => setCity2Input(e.target.value);

  const handleFunctionSelected = (val) => setFunctionSelected(val);

  const fetchCityData = () => {
    if (!city1Input || !city2Input) return;

    setCity1DataTransformed([]);
    const city1 = formatString(city1Input);
    fetch(`/api/cities?city=${city1}`)
      .then((response) => response.json())
      .then((data) => {
        setCity1DataTransformed(transformData(data));
      });

    setCity2DataTransformed([]);
    const city2 = formatString(city2Input);
    fetch(`/api/cities?city=${city2}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCity2DataTransformed(transformData(data));
      });

    setSearchDone(true);
  };

  const fetchJobData = () => {
    if (!jobInput || !city2State) return;

    const city2 = formatString(city2State);

    fetch(`/api/jobs?keywords=${jobInput}&location=${city2}`)
      .then((response) => response.json())
      .then((data) => {
        let jobs = data.jobs;
        // Manipulate job data here
        console.log(jobs);

        setJobsData(jobs);
      });
  };

  const transformData = (data) => {
    const transformedData = {};
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        transformedData[key] = {};
        data[key].forEach((item) => {
          transformedData[key][item.Cost] = item.Value;
        });
      } else {
        transformedData[key] = data[key];
      }
    });
    return transformedData;
  };

  function formatString(input) {
    const [cityName, state, country] = input.split(", ");
    const formattedCityName = cityName.replace(/\s+/g, "-").toLowerCase();
    const formattedState = state.toLowerCase();
    return `${formattedCityName}-${formattedState}`;
  }

  const clearInputs = () => {
    setCity1Input("");
    setCity2Input("");
    setCity1State("");
    setCity2State("");
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          justifyContent: "start",
          textAlign: "center",
          paddingTop: "8rem",
        }}
      >
        <div className="flex column form">
          <FormControl>
            <RadioGroup row defaultValue={"col"}>
              <FormControlLabel
                value="col"
                control={<Radio />}
                label="CoL Index"
                defaultChecked
                onClick={() => {
                  clearInputs(), handleFunctionSelected("col");
                }}
              />
              <FormControlLabel
                value="jobs"
                control={<Radio />}
                label="Job Postings"
                onClick={() => {
                  clearInputs(), handleFunctionSelected("jobs");
                }}
              />
            </RadioGroup>
          </FormControl>
          <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
            {functionSelected === "col" ? (
              <Grid item xs={12} sm={12} md={8}>
                <Grid container spacing={1} alignItems="center" justifyContent="space-around">
                  <Grid item xs={12} sm={6}>
                    <GoogleMaps setCurrentLocation={setCity1Input} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <GoogleMaps setCurrentLocation={setCity2Input} />
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12} sm={12} md={8}>
                <Grid container spacing={1} alignItems="center" justifyContent="space-around">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      sx={[{ minWidth: 300 }, theme]}
                      label="Enter a job"
                      className="input"
                      type="text"
                      value={jobInput}
                      onChange={(e) => handleJobInput(e)}
                      contrast="true"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <GoogleMaps setCurrentLocation={setCity2State} />
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={8}>
              {functionSelected === "col" ? (
                <Button variant="outlined" onClick={() => fetchCityData()}>
                  Search
                </Button>
              ) : (
                <Button variant="outlined" onClick={() => fetchJobData()}>
                  Search
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
        <div className="flex column data">
          <div className="flex city-data">
            {searchDone &&
              functionSelected === "col" &&
              city1DataTransformed &&
              city2DataTransformed ? (
              <CityCompareTable
                city1Data={city1DataTransformed}
                city2Data={city2DataTransformed}
                sections={sections}
              />
            ) : null}
          </div>
          {functionSelected === "jobs" ? (
            <Grid container spacing={2}>
              {jobsData.map((job, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <JobCard job={job} />
                </Grid>
              ))}
            </Grid>
          ) : null}
        </div>
      </Box>
    </Container >
  );
}
