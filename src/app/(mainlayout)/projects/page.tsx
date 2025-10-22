import { getProjects } from "@/services/project.service";
import { IProject } from "@/interface";
import ProjectCard from "@/components/ProjectCard";

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
              {projects.map((project: IProject) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
