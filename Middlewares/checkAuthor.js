import { UserTypeModel } from "../Models/user-model.js";

export const checkAuthor = async (req, res, next) => {

  let user = await UserModel.findById(req.user.userId);

  if (!user || user.role !== "AUTHOR") {
    return res.status(403).json({ message: "unauthorized" });
  }

  if (user.isBlocked) {
    return res.status(403).json({ message: "user blocked" });
  }

  next();
};
