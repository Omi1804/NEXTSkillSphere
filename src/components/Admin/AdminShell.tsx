"use client";

import { HeaderUser } from "@/types/header.types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

type AdminShellProps = {
  admin: HeaderUser;
  children: ReactNode;
};

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/courses", label: "Courses", icon: "library_books" },
  { href: "/admin/courses/new", label: "New Course", icon: "add_circle" },
  { href: "/admin/images", label: "Images", icon: "image" },
];

const AdminShell = ({ admin, children }: AdminShellProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/v1/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-slate-950 p-5 text-white lg:block">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <img src="/icons/logo.webp" alt="Skill Sphere" className="h-10 w-24 object-contain" />
        </Link>

        <nav className="mt-10 space-y-2">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-[#00ECA3] text-slate-950"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#057455]">
                Admin
              </p>
              <h1 className="text-xl font-bold text-slate-950">Skill Sphere Control Center</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold text-slate-950">{admin.name}</p>
                <p className="text-xs text-slate-500">{admin.email}</p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <span className="material-symbols-outlined text-base">logout</span>
                Logout
              </button>
            </div>
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold ${
                  pathname === item.href ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                <span className="material-symbols-outlined text-base">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminShell;
