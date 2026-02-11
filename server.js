import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import { userRoute } from "./APIs/user-api.js";
import { authorRoute } from "./APIs/author-api.js";
import { adminRoute } from "./APIs/admin-api.js";
import { commonRouter } from "./APIs/common-api.js";


//load environment variables
config();


//create express app
const app = exp();


//add middlewares
app.use(exp.json());
app.use(cookieParser());


//connect route modules
app.use("/user-api", userRoute);
app.use("/author-api", authorRoute);
app.use("/admin-api", adminRoute);
app.use("/common-api", commonRouter);


//connect to database
connect(process.env.DB_URL)
  .then(() => {

    console.log("db connected");

    //start server
    app.listen(process.env.PORT || 4000, () => {
      console.log("server started");
    });

  })
  .catch((err) => console.log(err));


//invalid path handler
app.use((req, res) => {
  res.status(404).json({ message: "invalid path" });
});


//global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: "error", reason: err.message });
});
