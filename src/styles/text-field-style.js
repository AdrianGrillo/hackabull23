import { yellow } from "@mui/material/colors";

const theme = {
  color: yellow[500],
  "& .MuiInputBase-input": {
    color: yellow[500],
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: yellow[500],
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: yellow[500],
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: yellow[500],
  },
  "& .MuiInputLabel-root": {
    color: yellow[500],
  },
};

export default theme;
