import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import { MDBInput, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBRadio, MDBBtnGroup } from 'mdb-react-ui-kit'
import { useState, useEffect } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { pink, yellow } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react'
import GoogleMaps from './GooglePlace';

const theme = createTheme({
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          color: yellow[500],
          '&.Mui-checked': {
            color: yellow[500],
          },
        },
      },
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const states = [
  'al', 'ak', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'fl', 'ga',
  'hi', 'id', 'il', 'in', 'ia', 'ks', 'ky', 'la', 'me', 'md',
  'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv', 'nh', 'nj',
  'nm', 'ny', 'nc', 'nd', 'oh', 'ok', 'or', 'pa', 'ri', 'sc',
  'sd', 'tn', 'tx', 'ut', 'vt', 'va', 'wa', 'wv', 'wi', 'wy',
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
  const [jobsData, setJobsData] = useState([])
  const [city1Input, setCity1Input] = useState('')  
  const [city2Input, setCity2Input] = useState('')  
  const [city1State, setCity1State] = useState('');
  const [city2State, setCity2State] = useState('');
  const [functionSelected, setFunctionSelected] = useState('col')
  const [jobInput, setJobInput] = useState('')
  const [searchDone, setSearchDone] = useState(false)
  const [city1DataTransformed, setCity1DataTransformed] = useState([])
  const [city2DataTransformed, setCity2DataTransformed] = useState([])

  const handleJobInput = e => setJobInput(e.target.value)

  const handleCity1Input = e => setCity1Input(e.target.value)

  const handleCity2Input = e => setCity2Input(e.target.value)

  const handleFunctionSelected = val => setFunctionSelected(val)

  const fetchCityData = () => {
    if(!city1Input || !city2Input)
      return

    setCity1DataTransformed([])
    const city1 = formatString(city1Input)
    fetch(`/api/cities?city=${city1}`)
    .then(response => response.json())
    .then(data => {
      setCity1DataTransformed(transformData(data))
    })

    setCity2DataTransformed([])
    const city2 = formatString(city2Input)
    fetch(`/api/cities?city=${city2}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setCity2DataTransformed(transformData(data))
    })

    setSearchDone(true)
  }

  const fetchJobData = () => {
    if(!jobInput || !city2State)
      return
      
    const city2 = formatString(city2State)

    fetch(`/api/jobs?keywords=${jobInput}&location=${city2}`)
      .then(response => response.json())
      .then(data => setJobsData(data.jobs))
  }

  const transformData = data => {
    const transformedData = {};
    Object.keys(data)
      .forEach((key) => {
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
    const [cityName, state, country] = input.split(', ');
    const formattedCityName = cityName.replace(/\s+/g, '-').toLowerCase();
    const formattedState = state.toLowerCase();
    return `${formattedCityName}-${formattedState}`;
  }

  const renderList = items => (
    <ul>
      {items ? items.map((item, index) => (
        <li key={index}>{item.Cost}: {item.Value}</li>
      )) : null}
    </ul>
  );

  const renderSection = (title, items) => (
    <div>
      <h3>{title}</h3>
      {renderList(items)}
    </div>
  );

  const clearInputs = () => {
    setCity1Input('')
    setCity2Input('')
    setCity1State('')
    setCity2State('')
  }

  return (
    <>
      <Head>
        <title>Hackabull 2023</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ThemeProvider theme={theme}>
          <div className='flex column form'>
            <FormControl>
              <RadioGroup row defaultValue={'col'}>
                <FormControlLabel value="col" control={<Radio />} label="CoL Index" defaultChecked onClick={() => { clearInputs(), handleFunctionSelected('col') }} />
                <FormControlLabel value="jobs" control={<Radio />} label="Job Postings" onClick={() => { clearInputs(), handleFunctionSelected('jobs') }} />
              </RadioGroup>
            </FormControl>
            <div className='flex form'>
              {
                functionSelected === 'col'
                ? 
                  <div className='flex'>
                    <GoogleMaps setCurrentLocation={setCity1Input} />
                    <div style={{ marginLeft: 10, marginRight: 10 }}></div>
                    <GoogleMaps setCurrentLocation={setCity2Input} />
                  </div>
                : 
                <div className='flex'>
                  <MDBInput style={{ height: 55, color: '#ffd700' }} label='Enter a job' className='input' type='text' value={jobInput} onChange={e => handleJobInput(e)} contrast='true' />
                  <div style={{ marginLeft: 10, marginRight: 10 }}></div>
                  <GoogleMaps setCurrentLocation={setCity2State} />
                </div>
              }
              {
                functionSelected === 'col'
                ? <Button variant="outlined" onClick={() => fetchCityData()}>Search</Button>
                : <Button variant="outlined" onClick={() => fetchJobData()}>Search</Button>
              }
            </div>
          </div>
          <div className='flex column data'>
            <div className='flex city-data'>
              {
                searchDone && functionSelected === 'col' && city1DataTransformed && city2DataTransformed
                ?
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650, border: '1px solid', borderColor: '#ffd700', background: 'rgb(226,226,226)' }} aria-label="city comparison table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell align="center">{city1DataTransformed["City Name"]}, {city1DataTransformed["Country Name"]}</TableCell>
                        <TableCell align="center">{city2DataTransformed["City Name"]}, {city2DataTransformed["Country Name"]}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {sections.map((section, sectionIndex) => (
                      city1DataTransformed[section] && city2DataTransformed[section] ? (
                        <React.Fragment key={sectionIndex}>
                          <TableRow sx={{ background: "#f0f0f0" }}>
                            <TableCell sx={{ background: '#022c43', color: 'white' }} colSpan={3}>
                              <strong>{section}</strong>
                            </TableCell>
                          </TableRow>
                          {Object.entries(city1DataTransformed[section]).map(([key, value], index) => (
                            <TableRow
                              key={key}
                              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {key}
                              </TableCell>
                              <TableCell align="center">
                                {value} {city1DataTransformed.Currency}
                              </TableCell>
                              <TableCell align="center">
                                {city2DataTransformed[section][key]} {city2DataTransformed.Currency}
                              </TableCell>
                            </TableRow>
                          ))}
                        </React.Fragment>
                      ) : null
                    ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                : null
              }
            </div>
            {
              functionSelected === 'jobs'
              ? <Grid className='cards-container' container spacing={2}>
                {jobsData.map((job, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <Card className='card-container'>
                      <CardContent className='card'>
                        <Typography className='title' gutterBottom variant="h5" component="h2" style={{fontSize: '16px', fontWeight: 600, color: '#ffd700 ', marginTop: -16, marginLeft: -16, marginRight: -16, minHeight: 50, display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 5, borderBottom: '1px solid black'}}>
                          Title: {job.title}
                        </Typography>
                        <Typography variant="body2" color="#000" component="p" style={{ marginBottom: 5 }}>
                          <b>Location: </b>{job.location}
                        </Typography>
                        <Typography variant="body1" component="p" dangerouslySetInnerHTML={{ __html: job.snippet.slice(0, 150) }}>
                        </Typography>
                        { 
                          job.company
                          ? <Typography variant="body2" color="#000" component="p" style={{ marginBottom: 5 }}>
                              <b>Company: </b>{job.company}
                            </Typography>
                          : null
                        }
                        <Typography variant="body2" color="#000" component="p" style={{ marginBottom: 5 }}>
                          <b>Posting: </b><a href={job.link}>{ job.link}</a>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            : null
            }
          </div>
        </ThemeProvider>
      </main>
    </>
  );
}
