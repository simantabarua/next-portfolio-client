import { Github, Linkedin, Mail, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-950  border-b shadow-lg border-t border-border relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent mb-4 drop-shadow-[0_0_8px_rgba(255,0,255,0.6)]">
              Simanta Barua
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Frontend & MERN Stack Developer passionate about building modern,
              functional, and beautiful web applications with Next.js,
              TypeScript, and scalable architectures.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: "https://github.com/simantabarua" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/simantabarua/",
                },
                { icon: Mail, href: "mailto:simanta.barua1@gmail.com" },
                { icon: Globe, href: "https://simanta.web.app/" },
              ].map(({ icon: Icon, href }, i) => (
                <Button
                  key={i}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-foreground hover:text-cyan-400 hover:scale-110 transition-all"
                >
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "About", "Projects", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">
              Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:simanta.barua1@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  simanta.barua1@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801516178048"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +880 1516-178048
                </a>
              </li>
              <li className="text-muted-foreground">Chattogram, Bangladesh</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Simanta Barua. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm mt-2 md:mt-0 flex items-center">
              Made with{" "}
              <Heart className="h-4 w-4 mx-1 text-pink-500 drop-shadow-[0_0_6px_rgba(255,0,150,0.8)]" />{" "}
              using Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
