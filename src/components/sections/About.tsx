import {
  User,
  MapPin,
  Mail,
  Calendar,
  Briefcase,
  GraduationCap,
  Code,
  Heart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function About() {
  const skills = [
    { name: "React/Next.js", level: 90, color: "bg-cyan-500" },
    { name: "TypeScript", level: 85, color: "bg-blue-500" },
    { name: "Node.js", level: 80, color: "bg-green-500" },
    { name: "MongoDB/Mongoose", level: 80, color: "bg-green-700" },
    { name: "Tailwind CSS", level: 85, color: "bg-purple-500" },
    { name: "Redux/React Query", level: 75, color: "bg-yellow-500" },
  ];

  const experiences = [
    {
      title: "Junior Frontend Developer",
      company: "Goama",
      period: "Oct 2023 – Aug 2025",
      description:
        "Built responsive and scalable user interfaces using React, TypeScript, and Redux. Led redesigns and implemented dynamic features improving engagement and revenue.",
    },
  ];

  const education = [
    {
      degree: "Diploma in Computer Science & Engineering",
      school: "Cox’s Bazar Polytechnic Institute",
      period: "",
      description: "",
    },
  ];

  const interests = [
    "UI/UX Design",
    "Open Source",
    "Web Performance",
    "Learning New Tech",
    "Problem Solving",
    "Creative Coding",
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know me better – my skills, experience, and what drives my
            passion for technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="h-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-cyan-500" />
                  Personal Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Simanta Barua</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Chattogram, Bangladesh</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">simanta.barua1@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Available for hire</span>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I'm a passionate Frontend/MERN Stack Developer with 1.5+
                    years of experience building responsive, scalable web
                    applications. I enjoy creating intuitive interfaces and
                    solving complex problems.
                  </p>
                </div>

                <div className="pt-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="secondary"
                        className="text-xs"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-purple-500" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-green-500" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-8 pb-6 border-l-2 border-cyan-500/30 last:border-0"
                  >
                    <div className="absolute left-0 top-0 w-4 h-4 bg-cyan-500 rounded-full -translate-x-1/2" />
                    <div>
                      <h4 className="font-semibold text-lg">{exp.title}</h4>
                      <p className="text-cyan-500 font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {exp.period}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-yellow-500" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="relative pl-8 pb-6 border-l-2 border-purple-500/30 last:border-0"
                  >
                    <div className="absolute left-0 top-0 w-4 h-4 bg-purple-500 rounded-full -translate-x-1/2" />
                    <div>
                      <h4 className="font-semibold text-lg">{edu.degree}</h4>
                      <p className="text-purple-500 font-medium">
                        {edu.school}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {edu.period}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
