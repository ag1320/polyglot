import { useState } from "react";
import { verifyUser } from "../utilities/serverCalls";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const isVerified = await verifyUser(username, password);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  return (
    <div>
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
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
