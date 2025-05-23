
import { styled } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


const BigErrorIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
  fontSize: '75px',
  color: theme.palette.primary.main,
}));

export {BigErrorIcon}
