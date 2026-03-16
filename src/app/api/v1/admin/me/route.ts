import { authenticateAdmin } from "@/middlewares/adminAuth.middleware";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/errors/apiErrorHandler";

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateAdmin(req);
    const userEmail = user?.email;

    if (userEmail) {
      return NextResponse.json({ email: userEmail }, { status: 200 });
    }
  } catch (error) {
    return handleApiError(error, "Internal server error");
  }
}
