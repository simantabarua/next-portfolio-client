import {
  FolderOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  ExternalLink,
  Calendar,
  MoreHorizontal,
  TrendingUp,
  Archive,
  CheckCircle,
  Code,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ProjectModal } from "@/components/dashboard/project-modal";
import { getProjects } from "@/services/project.service";
import { IProject } from "@/interface";

export default async function Projects() {
  const projects = await getProjects();

  const stats = {
    total: 12,
    published: 7,
    draft: 3,
    archived: 2,
    totalStars: 150,
    totalForks: 45,
    totalViews: 1200,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            Published
          </Badge>
        );
      case "draft":
        return (
          <Badge variant="secondary">
            <Archive className="w-3 h-3 mr-1" />
            Draft
          </Badge>
        );
      case "archived":
        return (
          <Badge variant="outline">
            <Archive className="w-3 h-3 mr-1" />
            Archived
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-500",
      Python: "bg-green-500",
      Java: "bg-orange-500",
      Go: "bg-cyan-500",
      Rust: "bg-red-500",
    };
    return colors[language] || "bg-gray-500";
  };

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="max-w-7xl mx-auto py-4 flex items-end justify-end gap-4">
          <ProjectModal />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-500">
                  {stats.total}
                </div>
                <div className="text-xs text-muted-foreground">Total</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500">
                  {stats.published}
                </div>
                <div className="text-xs text-muted-foreground">Published</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-500">
                  {stats.draft}
                </div>
                <div className="text-xs text-muted-foreground">Draft</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-500">
                  {stats.archived}
                </div>
                <div className="text-xs text-muted-foreground">Archived</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-500">
                  {stats.totalStars}
                </div>
                <div className="text-xs text-muted-foreground">Stars</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {stats.totalForks}
                </div>
                <div className="text-xs text-muted-foreground">Forks</div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Grid */}
          <div className="space-y-4">
            {projects?.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No projects found
                  </h3>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects?.map((project: IProject) => (
                  <Card
                    key={project.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {/* {getStatusBadge(project.status)} */}
                            {project.featured && (
                              <Badge
                                variant="outline"
                                className="text-yellow-500 border-yellow-500"
                              >
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {/* <div
                                className={`w-2 h-2 rounded-full mr-1 ${getLanguageColor(
                                  project.language
                                )}`}
                              />
                              {project.language} */}{" "}
                              javaScript
                            </Badge>
                          </div>
                          <CardTitle className="text-lg mb-2">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-3">
                            {project.description}
                          </CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled={!project.liveUrl}>
                              <Globe className="mr-2 h-4 w-4" />
                              Live Demo
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled={!project.githubUrl}>
                              <Code className="mr-2 h-4 w-4" />
                              View Code
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {project.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {project.views}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Code className="mr-2 h-3 w-3" />
                            Code
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <ExternalLink className="mr-2 h-3 w-3" />
                            Demo
                          </Button>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Created {project.createdAt}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
