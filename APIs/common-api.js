import exp from "express";
import { authenticate, changePassword } from "../Services/authService.js";
import { verifyToken } from "../Middlewares/verifyToken.js";

export const commonRouter = exp.Router();


//login user / author / admin
commonRouter.post("/login", async (req, res) => {

  //get credentials
  let userCred = req.body;

  //authenticate user
  let { token, user } = await authenticate(userCred);

  //store token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  //send response
  res.status(200).json({ message: "login success", payload: user });
});


//logout
commonRouter.get("/logout", (req, res) => {

  //clear token cookie
  res.clearCookie("token");

  res.status(200).json({ message: "logout success" });
});


//change password
commonRouter.post("/change-password", verifyToken, async (req, res) => {

  //get user id from token
  let uid = req.user.userId;

  //change password
  await changePassword(uid, req.body);

  res.status(200).json({ message: "password changed" });
});
