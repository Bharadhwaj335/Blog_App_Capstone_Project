import { Schema, model } from "mongoose";

//User schema
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
    },
    role: {
      type: String,
      enum: ["AUTHOR", "USER", "ADMIN"],
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: "throw",
    versionKey: false,
  }
);

//create model
export const UserTypeModel = model("user", userSchema);