import WordSearchBar from "../components/WordSearchBar";
import { useState } from "react";
import MyWordsCard from "../components/MyWordsCard.jsx";
import ManualAddWordModal from "../components/ManualAddWordModal.jsx";
import CustomButton from "../components/CustomButton.jsx";
import "../styling/MyWords.css";
import { Grid, Typography } from "@mui/material";

const MyWords = () => {
  //manual add modal
  const [isManualAddModalOpen, setIsManualAddModalOpen] = useState(false);
  const [defaultAddWord, setDefaultAddWord] = useState("");
  const [sourceWord, setSourceWord] = useState("");
  const [translatedWord, setTranslatedWord] = useState("");

  //word search bar
  const [input, setInput] = useState("");

  const openManualAddModal = (word = "") => {
    console.log("openManualAddModal called with word:", word);
    setDefaultAddWord(word);
    setIsManualAddModalOpen(true);
  };

  const closeManualAddModal = () => {
    setIsManualAddModalOpen(false);
    setDefaultAddWord("");
    setSourceWord("");
    setTranslatedWord("");
    setInput("");
  };

  return (
    <>
      <ManualAddWordModal
        isOpen={isManualAddModalOpen}
        onClose={closeManualAddModal}
        defaultAddWord={defaultAddWord}
        sourceWord={sourceWord}
        setSourceWord={setSourceWord}
        translatedWord={translatedWord}
        setTranslatedWord={setTranslatedWord}
      />
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid size="auto">
          <WordSearchBar
            openManualAddModal={openManualAddModal}
            input={input}
            setInput={setInput}
          />
        </Grid>
        <Grid size="auto">
          <div className="add-word-container">
            <Typography variant="h6">or</Typography>
          </div>
        </Grid>
        <Grid size="auto">
          <div className="add-word-container">
            <CustomButton
              buttonText="Manual Add"
              buttonFunction={openManualAddModal}
              className="manual-add-button"
            />
          </div>
        </Grid>
      </Grid>
      <MyWordsCard />
    </>
  );
};

export default MyWords;
