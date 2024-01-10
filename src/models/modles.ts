import mongoose, { Model } from "mongoose";

// TypeScript interfaces
interface IAdmin {
  email: string;
  password: string;
}

interface IUser {
  email: string;
  password: string;
  purchasedCourses: mongoose.Types.ObjectId[];
}

interface ICourse {
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
}

// Mongoose Schemas with TypeScript types
const adminSchema = new mongoose.Schema<IAdmin>({
  email: String,
  password: String,
});

const userSchema = new mongoose.Schema<IUser>({
  email: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
});

const courseSchema = new mongoose.Schema<ICourse>({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

// Mongoose Models
export const Admins: Model<IAdmin> = mongoose.model("Admins", adminSchema);
export const Users: Model<IUser> = mongoose.model("Users", userSchema);
export const Courses: Model<ICourse> = mongoose.model("Courses", courseSchema);
