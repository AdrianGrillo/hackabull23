import { Card, CardContent, Typography, Stack, Link, Box } from "@mui/material";

const JobCard = ({ job }) => {
    const stripHtmlTags = (str) => {
        if (str === null || str === "") return false;
        else str = str.toString();
        str = str.replace(/<[^>]*>/g, "");
        str = str.replace(/&nbsp;.../g, " ");
        str = str.trim();
        return str;
    };

    return (
        <Card sx={{ maxWidth: { xs: "90vw", sm: "90vw" }, height: "30vh" }}>
            <CardContent>
                <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    sx={{
                        fontSize: { xs: "14px", sm: "16px" },
                        fontWeight: 600,
                        color: "#ffd700",
                        backgroundColor: "#022c43",
                        borderBottom: "1px solid black",
                        py: 1,
                    }}
                >
                    {job.title}
                </Typography>
                {/* make this section scrollable */}
                <Box sx={{
                    overflowY: "auto", overflowX: "clip", maxHeight: "calc(30vh - 60px)",
                    "&::-webkit-scrollbar": {
                        width: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                        borderRadius: "2px",
                        background: "#f0f0f0",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        borderRadius: "2px",
                        background: "#888",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#555",
                    },
                }}>
                    <Stack spacing={1}>
                        <Typography variant="body2">
                            <b>Location: </b>
                            {job.location}
                        </Typography>
                        <Typography variant="body1" component="div">
                            {stripHtmlTags(job.snippet.slice(0, 150))}
                        </Typography>
                        {console.log(job.snippet)}
                        {job.company && (
                            <Typography variant="body2">
                                <b>Company: </b>{job.company}
                            </Typography>
                        )}
                        <Typography variant="body2">
                            <b>Posting: </b>
                            <nav>
                                <Link href={job.link} underline="hover" target="_blank">
                                    {job.link}
                                </Link>
                            </nav>
                        </Typography>
                    </Stack>
                </Box>
                {/* End scroll */}
            </CardContent>
        </Card>
    )
}

export default JobCard;