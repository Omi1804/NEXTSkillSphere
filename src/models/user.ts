import mongoose, { Model } from "mongoose";

interface IUser {
  email: string;
  password: string;
  username: String;
  name: String;
  purchasedCourses: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, unique: true },
  password: String,
  username: String,
  name: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
});

// Mongoose Models

export const Users: Model<IUser> =
  mongoose.models.Users || mongoose.model("Users", userSchema);
