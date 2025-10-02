import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "../ProjectCard";
import { getProjects } from "@/services/project.service";
import { IProject } from "@/interface";

export default async function Projects() {
  let projects = await getProjects();

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Projects Showcase
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my latest projects and see how I turn ideas into reality
            with modern technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <p className="col-span-full text-center">No projects found</p>
          ) : (
            <>
              {projects.slice(0, 3).map((project: IProject) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              <div className="text-center mt-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                >
                  View All Projects on GitHub
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
