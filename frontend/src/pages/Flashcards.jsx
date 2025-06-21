import Flashcard from "../components/Flashcard.jsx";
import { useSelector } from "react-redux";

const Flashcards = () => {

  const user = useSelector((state) => state.user.user);
  const words = user?.words || [];

  return <Flashcard />;
};

export default Flashcards;
