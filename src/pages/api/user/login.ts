import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "@/lib";
import { Courses, Users } from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await res.send("users");
}
