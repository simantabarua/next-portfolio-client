"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  FileText,
  FolderOpen,
  Users,
  Settings,
  Menu,
  X,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SidebarItem {
  title: string;
  href: string;
  icon: any;
  badge?: string;
}

const sidebarItems: SidebarItem[] = [
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { title: "Blog Posts", href: "/dashboard/blogs", icon: FileText },
  { title: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { title: "Users", href: "/dashboard/users", icon: Users },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
  isMobileSidebarOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({
  className,
  isMobileSidebarOpen,
  onMobileClose,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <div
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 flex flex-col h-screen bg-background border-r border-border transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          isMobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-lg">Dashboard</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            {/* Mobile close */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileClose}
              className="h-8 w-8 lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
            {/* Desktop collapse */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 hidden lg:flex"
            >
              {isCollapsed ? (
                <Menu className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href} onClick={onMobileClose}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 rounded-lg",
                    isCollapsed && "justify-center px-2",
                    isActive &&
                      "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "inline-flex items-center justify-center text-xs font-medium px-2 py-0.5 rounded-full",
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
