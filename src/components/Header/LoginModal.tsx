"use client";
import { HeaderUser } from "@/types/header";
import { ChangeEvent, FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { handleLoginSubmit } from "@/utils/handleAuthSubmit";

type LoginProps = {
  isOpen: boolean;
  onClose: () => void;
  setUserDetails?: (user: HeaderUser) => void;
};

export const LoginModal = ({ isOpen, onClose, setUserDetails }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
      return;
    }
    setPassword(e.target.value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="z-50 fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="relative z-10 w-full max-w-xl mx-4"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          >
            <div
              className="absolute -inset-[2px] rounded-3xl rounded-tl-[2.5rem] opacity-40 blur-xl"
              style={{
                background: "linear-gradient(135deg, #00eda4 0%, #6a7df1 100%)",
              }}
            />

            <div className="relative bg-white rounded-xl rounded-tl-[2.5rem] overflow-hidden shadow-2xl">
              <div
                className="h-1 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, #00eda4 0%, #6a7df1 100%)",
                }}
              />
              <div
                className="w-1 h-full absolute top-0 left-0"
                style={{
                  background:
                    "linear-gradient(45deg, #00eda4 0%, #6a7df1 100%)",
                }}
              />

              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-[0.07] -translate-y-1/2 translate-x-1/2"
                style={{
                  background:
                    "radial-gradient(circle, #00eda4, transparent 70%)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-[0.06] translate-y-1/2 -translate-x-1/2"
                style={{
                  background:
                    "radial-gradient(circle, #6a7df1, transparent 70%)",
                }}
              />

              <div className="relative px-10 pt-10 pb-8">
                <motion.button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <span className="material-symbols-outlined !text-[1.1rem]">
                    close
                  </span>
                </motion.button>

                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, #00eda4 0%, #6a7df1 100%)",
                    }}
                  >
                    <span className="material-symbols-outlined text-white text-2xl">
                      lock_open
                    </span>
                  </div>

                  <h2 className="font-body text-3xl font-bold text-gray-800 tracking-tight">
                    Welcome back
                  </h2>
                  <p className="font-body text-sm text-gray-400 mt-1">
                    Sign in to continue your journey
                  </p>
                </motion.div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLoginSubmit(
                      setError,
                      setLoading,
                      setUserDetails,
                      onClose,
                      email,
                      password,
                    );
                  }}
                  className="space-y-5"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <label
                      htmlFor="email"
                      className="block font-body text-sm font-medium text-gray-600 mb-1.5"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span
                        className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[1.1rem] transition-colors duration-300"
                        style={{
                          color:
                            focusedField === "email" ? "#6a7df1" : "#c4b5c4",
                        }}
                      >
                        mail
                      </span>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border font-body text-sm text-gray-700 placeholder-gray-300 outline-none transition-all duration-300"
                        style={{
                          borderColor:
                            focusedField === "email" ? "#6a7df1" : "#e5e7eb",
                          boxShadow:
                            focusedField === "email"
                              ? "0 0 0 3px rgba(106,125,241,0.12)"
                              : "0 1px 2px rgba(0,0,0,0.04)",
                        }}
                        onChange={handleChange}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label
                      htmlFor="password"
                      className="block font-body text-sm font-medium text-gray-600 mb-1.5"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <span
                        className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[1.1rem] transition-colors duration-300"
                        style={{
                          color:
                            focusedField === "password" ? "#6a7df1" : "#c4b5c4",
                        }}
                      >
                        key
                      </span>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border font-body text-sm text-gray-700 placeholder-gray-300 outline-none transition-all duration-300"
                        style={{
                          borderColor:
                            focusedField === "password" ? "#6a7df1" : "#e5e7eb",
                          boxShadow:
                            focusedField === "password"
                              ? "0 0 0 3px rgba(106,125,241,0.12)"
                              : "0 1px 2px rgba(0,0,0,0.04)",
                        }}
                        onChange={handleChange}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="remember"
                        className="w-4 h-4 rounded accent-indigo-400"
                      />
                      <span className="font-body text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                        Remember me
                      </span>
                    </label>
                    <button
                      type="button"
                      className="font-body text-sm font-medium transition-colors"
                      style={{ color: "#6a7df1" }}
                    >
                      Forgot password?
                    </button>
                  </motion.div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100"
                        initial={{ opacity: 0, y: -6, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -6, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="material-symbols-outlined text-red-400 text-[1rem]">
                          error
                        </span>
                        <p className="font-body text-sm text-red-500">
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="relative w-full py-3.5 rounded-2xl rounded-tl-[1.8rem] font-body font-semibold text-white text-sm tracking-wide overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(90deg, #00eda4 0%, #6a7df1 100%)",
                      }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 8px 30px rgba(106,125,241,0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                    >
                      <span
                        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background:
                            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
                        }}
                      />
                      <span className="relative flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <motion.span
                              className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.8,
                                ease: "linear",
                              }}
                            />
                            Signing in…
                          </>
                        ) : (
                          <>
                            Log In
                            <span className="material-symbols-outlined text-[1rem]">
                              arrow_forward
                            </span>
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
