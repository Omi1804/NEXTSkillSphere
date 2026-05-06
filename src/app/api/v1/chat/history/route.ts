import { prisma } from "@/lib/prisma";
import { authenticateUser } from "@/middlewares/userAuth.middleware";
import { handleApiError } from "@/errors/apiErrorHandler";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateUser(req);

    const chatHistory = await prisma.chatMessage.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    return new Response(JSON.stringify({ history: chatHistory }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return handleApiError(error, "Failed to fetch chat history");
  }
}
