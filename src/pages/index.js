import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { useState, useEffect } from "react";
import COLTable from "./COLTable";
import { cityData } from "./api/cityData";
import JobSearch from "./JobSearch";

export default function Home() {
  const [jobTitle, setJobTitle] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [livingType, setLivingType] = useState("");
  const [citiesData, setCitiesData] = useState([]);
  const [singleCity, setSingleCity] = useState(false);

  useEffect(() => {
    fetch('/api/cities')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(typeof data === 'object')
          setSingleCity(true)
        setCitiesData(data)
      })
  }, [])

  const renderList = (items) => (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.Cost}: {item.Value}</li>
      ))}
    </ul>
  );

  const renderSection = (title, items) => (
    <div>
      <h3>{title}</h3>
      {renderList(items)}
    </div>
  );

  const defaultProps = {
    options: cityData,
    getOptionLabel: (option) => option.title,
  };
  const flatProps = {
    options: cityData.map((option) => option.name),
  };

  return (
    <>
      <Head>
        <title>Hackabull 2023</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className=' flex form'>
        <JobSearch
            setJob={setJobTitle}
            setLoc={setCurrentLocation}
            setLiv={setLivingType}
          />
        </div>
        <div className='data'>
          <h1>Cities</h1>
          { 
            singleCity
            ? 
            <div>
              <h2>City: {citiesData["City Name"]}, {citiesData["Country Name"]}</h2>
              <h3>Currency: {citiesData.Currency}</h3>
              <h4>Cost of Living Month Total: {citiesData["Cost of Living Month Total"]}</h4>
              <h4>Note: {citiesData.Note}</h4>
        
              {renderSection("Buy Apartment Prices", citiesData["Buy Apartment prices"])}
              {renderSection("Childcare Prices", citiesData["Childcare prices"])}
              {renderSection("Clothing And Shoes Prices", citiesData["Clothing And Shoes prices"])}
              {renderSection("Markets Prices", citiesData["Markets prices"])}
              {renderSection("Rent Per Month Prices", citiesData["Rent Per Month prices"])}
              {renderSection("Restaurants Prices", citiesData["Restaurants prices"])}
              {renderSection("Salaries And Financing Prices", citiesData["Salaries And Financing prices"])}
              {renderSection("Sports And Leisure Prices", citiesData["Sports And Leisure prices"])}
              {renderSection("Transportation Prices", citiesData["Transportation prices"])}
              {renderSection("Utilities Per Month Prices", citiesData["Utilities Per Month prices"])}
            </div>
            : 'Multiple cities'
          }
        </div>
      </main>
    </>
  );
}
