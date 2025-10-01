"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              Simanta
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4 text-secondary">
          
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Mail className="h-5 w-5" />
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
            >
              <a href="/login">Login</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full text-primary"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/80 backdrop-blur-md border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 pb-3 border-t border-border">
              <div className="flex items-center space-x-3 px-3">
                {mounted && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="rounded-full"
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
              <div className="mt-3 px-3">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                >
                  <a href="/login">Login</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
