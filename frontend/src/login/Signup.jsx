import { useState } from "react";
import { postUser } from "../utilities/serverCalls";

const MyComponent = () => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addUser = async () => {
    try {
      await postUser(email, username, password);
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password" 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={addUser}>Sign Up</button>
    </div>
  );
};

export default MyComponent;
