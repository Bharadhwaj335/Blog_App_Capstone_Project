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
app.set("trust proxy", 1); // Required for Render to handle rate limiting and secure cookies
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);
//use cors middleware
const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    // allow if origin is explicitly listed in FRONTEND_URL env
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // allow all origins when ALLOW_ALL_ORIGINS env is set (useful for quick deploys)
    if (String(process.env.ALLOW_ALL_ORIGINS).toLowerCase() === "true") return callback(null, true);
    // allow vercel.app hosted frontends (common deployment target)
    try {
      const url = new URL(origin);
      if (url.hostname && url.hostname.endsWith(".vercel.app")) return callback(null, true);
    } catch (e) {
      // ignore URL parse errors
    }
    // otherwise reject
    return callback(new Error("CORS policy: This origin is not allowed."));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

app.use((req, res, next) => {
  // allow preflight for all routes
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(cors(corsOptions));
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

// root route for health check
app.get("/", (req, res) => {
  res.json({ message: "Backend API is running successfully!" });
});

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

