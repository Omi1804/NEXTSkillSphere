import { handleApiError } from "@/errors/apiErrorHandler";
import { authenticateUser } from "@/middlewares/userAuth.middleware";
import { getUserProfileByEmail } from "@/services/userProfile.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authenticatedUser = await authenticateUser(req);
    const user = await getUserProfileByEmail(authenticatedUser.email);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return handleApiError(error, "Internal server error");
  }
}
