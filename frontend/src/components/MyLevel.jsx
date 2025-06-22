import { useSelector } from "react-redux";
import { LinearProgress, Typography, Box } from "@mui/material";
import { levelData } from "../utilities/levels.js";
import levelImages from "../../images/levelImages.js";
import "../styling/MyLevel.css";

const MyLevel = () => {
  const user = useSelector((state) => state.user?.user);
  const totalPoints = user?.total_points || 0;

  // Determine current level based on total points
  let currentLevel = 0;
  for (let i = 1; i < levelData.length; i++) {
    if (totalPoints >= levelData[i].total) {
      currentLevel = i;
    } else {
      break;
    }
  }

  const isLevelZero = currentLevel === 0;
  const previousLevelPoints = levelData[currentLevel]?.total || 0;
  const nextLevelPoints = levelData[currentLevel + 1]?.total;

  // Prevent division by zero and clamp progress between 0 and 100
  let progress = 0;
  if (nextLevelPoints !== undefined && totalPoints > 0) {
    progress =
      ((totalPoints - previousLevelPoints) /
        (nextLevelPoints - previousLevelPoints)) *
      100;
    progress = Math.min(Math.max(progress, 0), 100);
  }

  return (
    <div className="level-container">
      <Typography variant="h5" className="level-title">
        {isLevelZero ? "Welcome!" : `Level ${currentLevel}`}
      </Typography>

      <div
        className={`level-image-wrapper ${
          !isLevelZero ? "enter-animation" : ""
        }`}
      >
        {!isLevelZero ? (
          <img
            src={levelImages[currentLevel] || levelImages[1]}
            alt={`Level ${currentLevel}`}
            className="level-image"
          />
        ) : (
          <Typography className="start-message">
            Start a lesson to begin earning points.
          </Typography>
        )}
      </div>

      {totalPoints > 0 && (
        <Box className="progress-wrapper">
          <LinearProgress
            variant="determinate"
            value={progress}
            className="level-progress-bar"
          />
        </Box>
      )}
    </div>
  );
};

export default MyLevel;
