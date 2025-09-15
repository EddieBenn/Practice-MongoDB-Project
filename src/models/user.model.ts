import mongoose, { Schema } from "mongoose";
import { Gender, Role } from "../interfaces/user.interface";

const UserSchema = new Schema(
  {
    first_name: { type: String, required: true, lowercase: true },
    last_name: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone_number: { type: String, required: true, unique: true },
    gender: {
      type: String,
      enum: [Gender.MALE, Gender.FEMALE],
      required: true,
    },
    role: { type: String, enum: [Role.ADMIN, Role.USER], default: Role.USER },
    password: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    versionKey: false,
    toJSON: {
      transform: function (doc, ret: any) {
        delete ret.password;
      },
    },
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
