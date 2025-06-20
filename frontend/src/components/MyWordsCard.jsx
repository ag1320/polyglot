import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  Divider,
  Pagination,
} from "@mui/material";
import "../styling/MyWordsCard.css";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { sayWord } from "../utilities/helperFunctions.js";

const MyWordsCard = () => {
  const words = useSelector((state) => state.user.user?.words || []);
  const user = useSelector((state) => state.user?.user || {});
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Pagination setup
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(words.length / itemsPerPage);
  const paginatedWords = words.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (_, value) => {
    setPage(value);
    setExpandedIndex(null); // collapse all when changing page
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const executeAudioSequence = (e, word) => {
    e.stopPropagation(); // Prevent the click from toggling the collapse
    const voice = user.my_languages.find((lang) => lang.id === word.language_target_id)?.voice;
    sayWord(voice, word.word_in_target_language);
  }

  return (
    <Box className="my-words-card-container">
      <Card className="my-words-card">
        <CardContent sx={{ flexGrow: 1, overflow: "auto", paddingBottom: 0 }}>
          <Typography variant="h6" gutterBottom textAlign="center">
            My Words
          </Typography>

          {paginatedWords.map((word, index) => {
            const globalIndex = (page - 1) * itemsPerPage + index;
            return (
              <Box key={globalIndex}>
                <Box
                  className="my-words-item"
                  onClick={() => toggleExpand(globalIndex)}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {`${word.word_in_source_language} - ${word.word_in_target_language}`}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick = {(e) => executeAudioSequence(e, word)}
                  >
                    <VolumeUpIcon className="speaker-icon"/>
                  </IconButton>
                </Box>
                <Collapse
                  in={expandedIndex === globalIndex}
                  timeout="auto"
                  unmountOnExit
                >
                  <Box px={2} py={1}>
                    <Typography variant="body2" className="my-words-subtext">
                      Recall Accuracy: {word.recall_accuracy}
                    </Typography>
                    <Typography variant="body2" className="my-words-subtext">
                      Mastery Level: {word.mastery_level}
                    </Typography>
                    <Typography variant="body2" className="my-words-subtext">
                      Streak: {word.current_correct_streak}
                    </Typography>
                    <Typography variant="body2" className="my-words-subtext">
                      Score: {word.score}
                    </Typography>
                  </Box>
                </Collapse>
                <Divider />
              </Box>
            );
          })}
        </CardContent>

        {pageCount > 1 && (
          <Box py={1} display="flex" justifyContent="center">
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              size="small"
              color="primary"
            />
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default MyWordsCard;
