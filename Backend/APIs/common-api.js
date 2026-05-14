import exp from "express";
import { authenticate } from "../Services/authService.js";
import { UserTypeModel } from "../Models/user-model.js";
import bcrypt from "bcryptjs";
import { verifyToken } from "../Middlewares/verifyToken.js";
import { validate } from "../Middlewares/validate.js";
import { loginSchema, changePasswordSchema } from "../config/schemas.js";

export const commonRouter = exp.Router();

//login
commonRouter.post("/login", validate(loginSchema), async (req, res) => {
  //get user cred object
  let userCred = req.body;
  //call authenticate service
  let { token, user } = await authenticate(userCred);
  //save tokan as httpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  //send res
  res.status(200).json({ message: "login success", payload: user });
});

//logout for User, Author and Admin
commonRouter.get("/logout", (req, res) => {
  // Clear the cookie named 'token'
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

//Change password(Protected route)
commonRouter.put("/change-password", validate(changePasswordSchema), async (req, res) => {
  //get current password and new password
  const { role, email, currentPassword, newPassword } = req.body;
  // Prevent same password
  if (currentPassword === newPassword) {
    return res.status(400).json({ message: "newPassword must be different from currentPassword" });
  }

  // Find user by email (works for USER, AUTHOR, ADMIN — all same collection)
  const account = await UserTypeModel.findOne({ email });
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, account.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Current password is incorrect" });
  }
  // Hash and save new password
  account.password = await bcrypt.hash(newPassword, 10);
  await account.save();

  res.status(200).json({ message: "Password changed successfully" });
});

//Page refresh
commonRouter.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res, next) => {
  try {
    // req.user from token has limited fields; fetch full user for UI data like profile image.
    const user = await UserTypeModel.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized. Please login" });
    }

    res.status(200).json({
      message: "authenticated",
      payload: user,
    });
  } catch (err) {
    next(err);
  }
});