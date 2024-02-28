import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { connectToDb } from "@/lib";
import { Courses } from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await res.send("users");
}
