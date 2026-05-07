import { prisma } from "@/lib/prisma";

export const createChatMessage = async (
  userId: string,
  content: string,
  role: "USER" | "ASSISTANT",
) => {
  return await prisma.chatMessage.create({
    data: {
      userId,
      content,
      role,
    },
  });
};
