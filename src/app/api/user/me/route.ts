import { AuthError } from "@/config/authTokens";
import { authenticateUser } from "@/middlewares/userAuth.middleware";
import { getUserProfileByEmail } from "@/services/userProfile.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authenticatedUser = await authenticateUser(req);
    const user = await getUserProfileByEmail(authenticatedUser.email);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    console.error("Server Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
