import { authenticateAdmin } from "@/middlewares/adminAuth.middleware";
import { NextRequest } from "next/server";
import { handleApiError } from "@/errors/apiErrorHandler";

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
  } catch (error) {
    return handleApiError(error, "Internal server error");
  }
}
