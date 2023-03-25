import {
  MDBInput,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { useState } from "react";

export default function JobSearch() {
  const [jobTitle, setJobTitle] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [livingType, setLivingType] = useState("");

  const handleJobTitle = (e) => {
    setJobTitle(e.target.value);
  };

  const handleCurrentLocation = (e) => {
    setCurrentLocation(e.target.value);
  };

  const handleLivingType = (e) => {
    setLivingType(e.target.textContent);
  };

  return (
    <div className="flex form">
      <MDBInput
        label="Job Title"
        className="input"
        type="text"
        value={jobTitle}
        onChange={(e) => handleJobTitle(e)}
      />
      <MDBInput
        label="Current Location"
        className="input"
        type="text"
        value={currentLocation}
        onChange={(e) => handleCurrentLocation(e)}
      />
      <div style={{ width: "150px" }}>
        <MDBDropdown animation>
          <MDBDropdownToggle>{livingType || "Living Type"}</MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem link onClick={(e) => handleLivingType(e)}>
              Rent
            </MDBDropdownItem>
            <MDBDropdownItem link onClick={(e) => handleLivingType(e)}>
              Buy
            </MDBDropdownItem>
            <MDBDropdownItem link onClick={(e) => handleLivingType(e)}>
              Lease
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>
    </div>
  );
}
