import CustomButton from "./CustomButton.jsx";
import { useSelector } from "react-redux";
import { postWord } from "../utilities/serverCalls";
import { Modal, Box, Typography, TextField } from "@mui/material";
import "../styling/ManualAddWordModal.css";
import { useDispatch } from "react-redux";
import { updateUser } from "../state/userSlice.js";
import { useEffect } from "react";

const ManualAddWordModal = ({
  isOpen,
  onClose,
  defaultAddWord = "",
  sourceWord,
  setSourceWord,
  translatedWord,
  setTranslatedWord,
}) => {
  const user = useSelector((state) => state?.user);
  const title = `Add a new ${user?.selectedLanguage?.name} word`;
  const dispatch = useDispatch();

  const addWord = async () => {
    await postWord(
      sourceWord,
      translatedWord,
      user?.user?.native_language?.id,
      user?.selectedLanguage?.id
    );
    await dispatch(updateUser()).unwrap();
    setSourceWord("");
    setTranslatedWord("");
  };

  useEffect(() => {
    if (isOpen) {
      setSourceWord(defaultAddWord || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, defaultAddWord]);

  const addAndClose = async () => {
    await addWord();
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} className="manual-add-word-modal">
      <Box className="manual-add-word-modal-box">
        <Typography variant="h6" className="manual-add-word-title">
          {title}
        </Typography>
        <TextField
          label={user?.user?.native_language?.name || "Native Language"}
          value={sourceWord}
          onChange={(e) => setSourceWord(e.target.value)}
          className="manual-add-word-textbox"
          fullWidth
          margin="normal"
        />
        <TextField
          label={user?.selectedLanguage?.name || "Target Language"}
          value={translatedWord}
          onChange={(e) => setTranslatedWord(e.target.value)}
          className="manual-add-word-textbox"
          fullWidth
          margin="normal"
        />
        <Box className="manual-add-word-modal-buttons">
          <div className="add-word-modal-button-container">
            <CustomButton
              buttonText="Add Word"
              buttonFunction={addWord}
              className="add-word-modal-button"
            />
          </div>
          <div className="add-word-modal-button-container">
            <CustomButton
              buttonText="Add Word & Close"
              buttonFunction={addAndClose}
              className="add-word-modal-button"
            />
          </div>
          <div className="add-word-modal-button-container">
            <CustomButton
              buttonText="Close"
              buttonFunction={onClose}
              className="add-word-modal-button"
            />
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default ManualAddWordModal;
