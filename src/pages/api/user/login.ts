import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { connectToDb } from "@/lib";
import { Admins, Courses } from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDb();
}
