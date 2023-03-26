import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";

const COLTable = ({userCity}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("/api/cities", {
        headers: {
            'city': userCity,
        }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);
  console.log(userCity)

  const tableData = {
    columns: [
      {
        label: "Item",
        field: "Cost",
        sort: "asc",
      },
      {
        label: "Price",
        field: "Value",
        sort: "asc",
      },
    ],
    rows: [
      ...(data["Restaurants prices"]?.map((item) => ({
        Cost: item.Cost,
        Value: item.Value,
      })) || []),
      ...(data["Markets prices"]?.map((item) => ({
        Cost: item.Cost,
        Value: item.Value,
      })) || []),
      ...(data["Transportation prices"]?.map((item) => ({
        Cost: item.Cost,
        Value: item.Value,
      })) || []),
      ...(data["Utilities Per Month prices"]?.map((item) => ({
        Cost: item.Cost,
        Value: item.Value,
      })) || []),
    ],
  };

  return (
    <MDBDataTable
      striped
      bordered
      small
      hover
      data={tableData}
      searching={false}
      displayEntries={false}
      paginationLabel={["Previous", "Next"]}
    />
  );
};

export default COLTable;
