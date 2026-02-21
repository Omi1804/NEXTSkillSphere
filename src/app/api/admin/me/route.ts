import { authenticateAdmin } from "@/middlewares/adminAuth.middleware";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateAdmin(req);
    const userEmail = user?.email;

    if (userEmail) {
      return new Response(JSON.stringify({ email: userEmail }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Invalid email" }), {
        status: 404,
      });
    }
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
