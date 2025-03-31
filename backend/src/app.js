import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import languageRoutes from "./routes/languageRoutes.js";
import fs from 'fs';
import https from 'https';
import path from 'path';
// import axios from "axios";
// import controllers from "./controllers/controllers.js";  

const app = express();

// Middleware setup
app.use(
  cors({
    origin: "*",
    methods: "GET, PUT, POST, PATCH, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

// Logging request body size
app.use((req, res, next) => {
  if (req.headers["content-length"]) {
    console.log(`Incoming request body size: ${req.headers["content-length"]} bytes`);
  }
  next();
});

//Axios headers
// const headers = {
//   headers: {
//     Origin: "http://localhost:3000",
//     "User-Agent":
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
//   },
// };

// Routes
app.use(userRoutes);
app.use(languageRoutes);

//self signed ssl cert
const httpsOptions = {
  key: fs.readFileSync(path.resolve('/app/utils', 'polyglot-key.pem')),
  cert: fs.readFileSync(path.resolve('/app/utils', 'polyglot-cert.pem')),
};

// Set port and start the server
const port = 3001;
https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

//for http
// app.listen(port, () =>
//   console.log(`Backend listening at http://localhost:${port}`)
// );
