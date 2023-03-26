import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import {
  MDBInput,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { pink, yellow } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import JobSearch from "./JobSearch";

const theme = createTheme({
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          color: yellow[500],
          "&.Mui-checked": {
            color: yellow[500],
          },
        },
      },
    },
  },
});

export default function Home() {
  const [jobTitle, setJobTitle] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [livingType, setLivingType] = useState("");
  const [citiesData, setCitiesData] = useState([]);
  const [singleCity, setSingleCity] = useState(false);

  useEffect(() => {
    fetch("/api/cities")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        if (typeof data === "object") setSingleCity(true);
        setCitiesData(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/jobs")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  const renderList = (items) => (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item.Cost}: {item.Value}
        </li>
      ))}
    </ul>
  );

  const renderSection = (title, items) => (
    <div>
      <h3>{title}</h3>
      {renderList(items)}
    </div>
  );

  // const defaultProps = {
  //   options: citiesData,
  //   getOptionLabel: (option) => option.title,
  // };
  // const flatProps = {
  //   options: citiesData.map((option) => option.name),
  // };

  return (
    <div>
      <div>
        <FormControl>
          <FormLabel style={{ color: "#ffd700" }}>Query</FormLabel>
          <RadioGroup row>
            <FormControlLabel
              value="col"
              control={<Radio />}
              label="CoL Index"
              defaultChecked="true"
            />
            <FormControlLabel
              value="jobs"
              control={<Radio />}
              label="Job Postings"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="flex form">
        <JobSearch
          setJob = {setJobTitle}
          setLoc = {setCurrentLocation}
          setLiv = {setLivingType}
        />
      </div>
      <div className="data">
        <h1>Cities</h1>
        {singleCity ? (
          <div>
            <h2>
              City: {citiesData["City Name"]}, {citiesData["Country Name"]}
            </h2>
            <h3>Currency: {citiesData.Currency}</h3>
            <h4>
              Cost of Living Month Total:{" "}
              {citiesData["Cost of Living Month Total"]}
            </h4>
            <h4>Note: {citiesData.Note}</h4>

            {renderSection(
              "Buy Apartment Prices",
              citiesData["Buy Apartment prices"]
            )}
            {renderSection("Childcare Prices", citiesData["Childcare prices"])}
            {renderSection(
              "Clothing And Shoes Prices",
              citiesData["Clothing And Shoes prices"]
            )}
            {renderSection("Markets Prices", citiesData["Markets prices"])}
            {renderSection(
              "Rent Per Month Prices",
              citiesData["Rent Per Month prices"]
            )}
            {renderSection(
              "Restaurants Prices",
              citiesData["Restaurants prices"]
            )}
            {renderSection(
              "Salaries And Financing Prices",
              citiesData["Salaries And Financing prices"]
            )}
            {renderSection(
              "Sports And Leisure Prices",
              citiesData["Sports And Leisure prices"]
            )}
            {renderSection(
              "Transportation Prices",
              citiesData["Transportation prices"]
            )}
            {renderSection(
              "Utilities Per Month Prices",
              citiesData["Utilities Per Month prices"]
            )}
          </div>
        ) : (
          "Multiple cities"
        )}
      </div>
    </div>
  );
}
