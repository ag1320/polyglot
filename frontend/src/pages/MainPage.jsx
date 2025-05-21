import { Grid, Typography, Stack, Box, Paper, Button } from "@mui/material";
import "../styling/MainPage.css";
import learning from "../../images/learning.png";
import { translateWord } from "../utilities/serverCalls";

const MainPage = () => {
  return (
    // <Grid container spacing={2}>
    //   {/* Main Content Block */}
    //   <Grid item xs={8}>
    //     <Paper className="content-block">Main Content Block</Paper>
    //   </Grid>

    //   {/* Right Side Panel */}
    //   <Grid item xs={4}>
    //     <Stack direction="column" spacing={2} className="right-panel-stack">
    //       <Box className="top-right-block">
    //         <Paper className="content-block">Top Right Block (75%)</Paper>
    //       </Box>
    //       <Box className="bottom-right-block">
    //         <Paper className="content-block">Bottom Right Block (25%)</Paper>
    //       </Box>
    //     </Stack>
    //   </Grid>
    // </Grid>
    <Button variant="contained" color="primary" onClick={()=>translateWord("hi", "en", "ru")}>
      <Typography variant="h6" component="span">
        Translate "Hello World"
      </Typography>
    </Button>
  );
};

export default MainPage;

//     <div className="main-content">
//       <Grid container spacing={2} className="grid-container">
//         <Grid item xs={12} lg={8} md={8}>
//           <div className="main-content-block">
//             <h1>Some text!</h1>
//           </div>
//         </Grid>
//         <Grid item xs={12} lg={4} md={4}>
//           <Grid container spacing={2} className="grid-container" direction={"column"}>
//             <Grid item xs={12}>
// {/*             <div className="secondary-content-block">
//                 <img src={learning} alt="Learning" className="learning-image" />
//               </div>*/}
//               <div className="tertiary-content-block">
//                 <h1> some stuff!</h1>
//               </div>
//             </Grid>
//             <Grid item xs={12}>
//               <div className="tertiary-content-block">
//                 <h1> some stuff!</h1>
//               </div>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </div>
