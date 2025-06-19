import WordSearchBar from "../components/WordSearchBar";
import { useSelector } from "react-redux";

const MyWords = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log("user:", user);

  return (
    <div>
      <WordSearchBar />

      <div style={{ marginTop: "2rem" }}>
        <h2>My Words</h2>
        {user?.words?.length > 0 ? (
          <ul>
            {user.words.map((word, index) => (
              <li key={index}>
                <strong>{word.word_in_source_language}</strong> → {word.word_in_target_language}
              </li>
            ))}
          </ul>
        ) : (
          <p>No words added yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyWords;
