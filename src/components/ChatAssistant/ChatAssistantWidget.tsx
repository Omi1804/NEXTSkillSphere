"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ChatButton from "./ChatButton";
import { renderAssistantContent } from "./renderConfigs";

const quickPrompts = ["Find a course", "Learning path", "Pricing help"];

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  isError?: boolean;
};

const initialMessages: ChatMessage[] = [
  {
    id: "assistant-welcome",
    role: "assistant",
    content:
      "Hi, I can help you explore courses, compare paths, and continue learning. Tell me your goal and I will suggest the best options.",
  },
];

const ChatAssistantWidget = () => {
  const endRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [draftMessage, setDraftMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isSending, setIsSending] = useState(false);

  const panelMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 14, scale: 0.96 },
        transition: { type: "spring" as const, stiffness: 360, damping: 28 },
      };

  const addMessage = (
    role: "assistant" | "user",
    content: string,
    isError = false,
  ): ChatMessage => ({
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    role,
    content,
    isError,
  });

  const handleSend = async (messageOverride?: string) => {
    if (isSending) return;

    const trimmedMessage = (messageOverride ?? draftMessage).trim();
    if (!trimmedMessage) return;

    setMessages((currentMessages) => [...currentMessages, addMessage("user", trimmedMessage)]);
    setDraftMessage("");

    try {
      setIsSending(true);
      const response = await fetch("/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      const payload = (await response.json()) as { result?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Unable to get a response right now.");
      }

      const assistantReply =
        payload.result?.trim() || "I could not generate a reply. Please try again.";
      setMessages((currentMessages) => [
        ...currentMessages,
        addMessage("assistant", assistantReply),
      ]);
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        addMessage(
          "assistant",
          "I am having trouble connecting right now. Please try again in a moment.",
          true,
        ),
      ]);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (isOpen && endRef.current) {
      endRef.current.scrollTo({
        top: endRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isOpen, messages, isSending]);
  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...panelMotion}
            className="z-[1000] w-[min(calc(100vw-2rem),390px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="bg-slate-950 p-5 text-white">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00ECA3] text-slate-950">
                    <span className="material-symbols-outlined">smart_toy</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">eLearni Assistant</p>
                    <p className="mt-1 text-xs text-slate-300">Ready to help you choose faster</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/15"
                  aria-label="Close chat assistant"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            </div>

            <div
              ref={endRef}
              className="max-h-[420px] space-y-4 !overflow-y-auto bg-[#f6f8fb] p-5"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.role === "user"
                      ? "ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-slate-950 p-4 text-sm font-semibold leading-6 text-white shadow-sm"
                      : `max-w-[86%] rounded-2xl rounded-tl-sm p-4 text-sm leading-6 shadow-sm ${
                          message.isError
                            ? "border border-red-200 bg-red-50 text-red-700"
                            : "bg-white text-slate-700"
                        }`
                  }
                >
                  {message.role === "assistant" ? (
                    <div className="space-y-2">{renderAssistantContent(message.content)}</div>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
              ))}
              {isSending && (
                <div className="max-w-[86%] rounded-2xl rounded-tl-sm bg-white p-4 text-sm leading-6 text-slate-500 shadow-sm">
                  Thinking...
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 bg-white p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void handleSend(prompt)}
                    disabled={isSending}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-[#00B982] hover:text-[#057455]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <input
                  type="text"
                  placeholder="Ask about courses..."
                  value={draftMessage}
                  onChange={(event) => setDraftMessage(event.target.value)}
                  disabled={isSending}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      void handleSend();
                    }
                  }}
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  aria-label="Chat assistant message"
                />
                <button
                  type="button"
                  onClick={() => void handleSend()}
                  disabled={isSending}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white transition hover:bg-slate-800"
                  aria-label="Send message"
                >
                  <span className="material-symbols-outlined text-base">send</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ChatAssistantWidget;
