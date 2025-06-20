import WordSearchBar from "../components/WordSearchBar";
import { useSelector } from "react-redux";
import MyWordsCard from "../components/MyWordsCard.jsx";

const MyWords = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log("user:", user);

  return (
    <>
      <WordSearchBar />
      <MyWordsCard />
    </>
  );
};

export default MyWords;
