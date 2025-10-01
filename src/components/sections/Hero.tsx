import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";
import DarkVeil from "@/components/DarkVeil";
export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <DarkVeil />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium backdrop-blur-sm">
            Welcome to my portfolio
          </span>
        </div>

        {/* Hero title */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-primary">Hi, I&apos;m </span>
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Simanta Barua
          </span>
        </h1>

        {/* Subtitle with typing pulse */}
        <div className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 h-12">
          <span>I&apos;m a </span>
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-semibold">
            Frontend Developer
          </span>
          <span className="animate-pulse">|</span>
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Passionate about creating exceptional digital experiences through
          clean code, innovative design, and cutting-edge technologies.
          Specializing in <span className="text-cyan-400">React</span>,{" "}
          <span className="text-purple-400">Next.js</span>, and{" "}
          <span className="text-pink-400">modern web development</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-6 text-lg group rounded-2xl shadow-[0_0_15px_rgba(56,189,248,0.7)]"
          >
            View My Work
            <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-lg group rounded-2xl shadow-[0_0_12px_rgba(34,211,238,0.4)]"
          >
            Download CV
            <Download className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>

        {/* Social Links */}
        <SocialLinks />
      </div>
    </section>
  );
}
