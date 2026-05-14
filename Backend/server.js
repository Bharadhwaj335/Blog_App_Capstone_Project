import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { userRoute } from "./APIs/user-api.js";
import cookieParser from "cookie-parser";
import { adminRoute } from "./APIs/admin-api.js";
import { authorRoute } from "./APIs/author-api.js";
import { commonRouter } from "./APIs/common-api.js";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";

config(); //process.env

//Create express application
const app = exp();
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
//use cors middleware
app.use(cors({ origin: allowedOrigins, credentials: true }));
//add body parser middleware
app.use(exp.json());
//add cookie parser middleware
app.use(cookieParser());

// security headers
app.use(helmet({ crossOriginResourcePolicy: false }));

// sanitize mongo queries
// app.use(mongoSanitize());

// rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});
app.use("/common-api/login", limiter); // Only apply to login routes to prevent brute force
app.use("/common-api/register", limiter);


//connect APIs
app.use("/user-api", userRoute);
app.use("/author-api", authorRoute);
app.use("/admin-api", adminRoute);
app.use("/common-api", commonRouter);

//connect to db
const connectDB = async () => {
  try {
    const mongoUri = process.env.DB_URL || process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("Missing MongoDB connection string. Set DB_URL in Backend/.env");
    }

    await connect(mongoUri);
    console.log("DB connection success");

    //start http server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (err) {
    console.log("Err in DB connection", err);
  }
};

connectDB();

//dealing with invalid path
app.use((req, res, next) => {
  console.log(req.url);
  res.json({ message: `${req.url} is invalid path` });
});

//error handling middleware
app.use((err, req, res, next) => {
  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  // mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  // ✅ HANDLE CUSTOM ERRORS
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});

