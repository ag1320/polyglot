import { Button } from "@mui/material";

const CustomButton = ({buttonFunction, buttonText}) => {
  return (
    <Button onClick = {() => buttonFunction()} variant="contained" color="primary" fullWidth>
      {buttonText}
    </Button>
  );
}

export default CustomButton;