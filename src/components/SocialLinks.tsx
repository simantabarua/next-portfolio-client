import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const socials = [
  { name: "GitHub", icon: Github, href: "https://github.com/your-username" },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/your-username",
  },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/your-username" },
  { name: "Email", icon: Mail, href: "mailto:your@email.com" },
];

export default function SocialLinks() {
  return (
    <div className="flex justify-center space-x-6 text-primary">
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
          >
            <social.icon className="h-5 w-5" />
          </Button>
        </Link>
      ))}
    </div>
  );
}
