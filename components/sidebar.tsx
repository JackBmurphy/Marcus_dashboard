'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  Briefcase,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/trade", label: "Trade Leads", icon: Briefcase },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-[#13161F] border-r border-white/[0.06] flex flex-col z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/[0.06]">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#FF6B00]">
          <span className="text-white font-bold text-sm tracking-tight">TWS</span>
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-tight">The Wheel Specialist</p>
          <p className="text-gray-500 text-xs">Franchisee Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-[#FF6B00]/15 text-[#FF6B00]"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              <Icon
                size={18}
                className={isActive ? "text-[#FF6B00]" : "text-gray-500"}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#22263A] flex items-center justify-center">
            <span className="text-xs text-gray-300 font-medium">BC</span>
          </div>
          <div>
            <p className="text-xs font-medium text-white">Birmingham Central</p>
            <p className="text-xs text-gray-500">Franchisee</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
