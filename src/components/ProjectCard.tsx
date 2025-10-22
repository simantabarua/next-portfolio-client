import { ExternalLink, Github, Star, Eye, Calendar, Link } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IProject } from "@/interface";

const ProjectCard = ({ project }: { project: IProject }) => (
  <Card className="group h-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
    <CardHeader className="p-0">
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
          <div className="text-6xl opacity-50">🚀</div>
        </div>

        {project.featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              Featured
            </Badge>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-background/80 backdrop-blur-sm"
            >
              <Github className="h-4 w-4 mr-1" />
              Code
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Live Demo
            </Button>
          </div>
        </div>
      </div>
    </CardHeader>

    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-3">
        <CardTitle className="text-xl group-hover:text-cyan-500 transition-colors">
          {project.title}
        </CardTitle>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            {project.stars}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {project.views}
          </div>
        </div>
      </div>

      <p className="text-muted-foreground mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {project.createdAt}
        </div>
        <div className="flex gap-2">
          <Link href={`/projects/${project.slug}`} target="_blank" >
              <Button
            size="sm"
            variant="secondary"
            className="bg-background/80 backdrop-blur-sm"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
            </Button>
          </Link>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ProjectCard;
