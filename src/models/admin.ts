import mongoose, { Model } from "mongoose";

// TypeScript interfaces
interface IAdmin {
  email: string;
  password: string;
}

interface ICourse {
  title: string;
  description: string;
  price: number;
  imageLink: string;
  time: string;
  level: string;
  category: string;
  instructor: string;
}

// Mongoose Schemas with TypeScript types
const adminSchema = new mongoose.Schema<IAdmin>({
  email: { type: String, unique: true },
  password: String,
});

const courseSchema = new mongoose.Schema<ICourse>({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  time: String,
  level: String,
  category: String,
  instructor: String,
});

export const Admins: Model<IAdmin> =
  mongoose.models.Admins || mongoose.model("Admins", adminSchema);
export const Courses: Model<ICourse> =
  mongoose.models.Courses || mongoose.model("Courses", courseSchema);
