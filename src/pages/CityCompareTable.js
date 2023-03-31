// src/components/CityComparisonTable.js
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const CityCompareTable = ({ city1Data, city2Data, sections }) => {
    return (
        <TableContainer component={Paper}>
            <Table
                sx={{
                    minWidth: 650,
                    border: "1px solid",
                    borderColor: "#ffd700",
                    background: "rgb(226,226,226)",
                }}
                aria-label="city comparison table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell align="center">
                            {city1Data["City Name"]}, {city1Data["Country Name"]}
                        </TableCell>
                        <TableCell align="center">
                            {city2Data["City Name"]}, {city2Data["Country Name"]}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sections.map((section, sectionIndex) =>
                        city1Data[section] && city2Data[section] ? (
                            <React.Fragment key={sectionIndex}>
                                <TableRow sx={{ background: "#f0f0f0" }}>
                                    <TableCell
                                        sx={{ background: "#022c43", color: "white" }}
                                        colSpan={3}
                                    >
                                        <strong>{section}</strong>
                                    </TableCell>
                                </TableRow>
                                {Object.entries(city1Data[section]).map(([key, value], index) => (
                                    <TableRow
                                        key={key}
                                        sx={{
                                            "&:last-child td, &:last-child th": {
                                                border: 0,
                                            },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {key}
                                        </TableCell>
                                        <TableCell align="center">
                                            {value} {city1Data.Currency}
                                        </TableCell>
                                        <TableCell align="center">
                                            {city2Data[section][key]} {city2Data.Currency}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </React.Fragment>
                        ) : null
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CityCompareTable;
