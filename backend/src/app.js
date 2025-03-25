import express from "express";
import morgan from "morgan";
import cors from "cors";
import testRoutes from "./routes/test.js";
// import axios from "axios";
// import controllers from "./controllers/controllers.js";  

const app = express();

// Middleware setup
app.use(
  cors({
    origin: "*",
    methods: "GET, PUT, POST, PATCH, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
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

// Axios headers
// const headers = {
//   headers: {
//     Origin: "http://localhost:3000",
//     "User-Agent":
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
//   },
// };

// Routes
app.use(testRoutes);

// Set port and start the server
const port = 3001;
app.listen(port, () =>
  console.log(`Backend listening at http://localhost:${port}`)
);
