import { styled } from "@mui/material/styles";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const white = "#fff";
const black = "#000";

// --- FormControl ---
export const MiniFormControl = styled(FormControl)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundSecondary.main, // Background behind the select input
}));

// // --- InputLabel ---
// export const MiniInputLabel = styled(InputLabel)(({ theme }) => ({
//   color: theme.palette.common.white || '#ffffff', // Label text color
// }));

// --- Select ---
export const MiniSelect = styled(Select)(({ theme }) => {
  const darkBlue = theme.palette.backgroundSecondary.main;

  return {
    backgroundColor: darkBlue, // Background inside the select input

    "& .MuiOutlinedInput-root": {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      padding: "0px",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: darkBlue, // Border color
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: darkBlue, // Border color on hover
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: darkBlue, // Border color on focus
    },

    "& .MuiSelect-icon": {
      display: "none",
      width: "0px",
      height: "0px",
    },

    "&& .MuiSelect-select": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      width: "100%",
      paddingRight: "0px !important",
      paddingLeft: "0px !important",
    },
  };
});

// --- MenuItem ---
export const MiniMenuItem = styled(MenuItem)(({ theme }) => {
  const lightBlue = theme.palette.secondary.main;

  return {
    "&:hover": {
      backgroundColor: lightBlue, // Slightly lighter on hover
    },
    "&&.Mui-selected": {
      backgroundColor: lightBlue, // Selected item background
    },
  };
});

// --- FormControl ---
export const AddLanguageFormControl = styled(FormControl)({
  backgroundColor: white, // Background behind the select input
  color: black,           // Text color
});


// --- InputLabel ---
export const AddLanguageInputLabel = styled(InputLabel) ({
  color: black // Label text color
});

// --- Select ---
export const AddLanguageSelect = styled(Select)({
  backgroundColor: white,

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: black,
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: black,
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: black,
  },
});


// --- MenuItem ---
export const AddLanguageMenuItem = styled(MenuItem)(({ theme }) => {
  const lightBlue = theme.palette.secondary.main;

  return {
    backgroundColor: "#fff", // Background color
    color: "#000", // Text color

    "&:hover": {
      backgroundColor: lightBlue, // Slightly lighter on hover
      color: "#fff", // Hover item text color
    },
    "&&.Mui-selected": {
      backgroundColor: lightBlue, // Selected item background
      color: "#fff", // Selected item text color
    },
  };
});
