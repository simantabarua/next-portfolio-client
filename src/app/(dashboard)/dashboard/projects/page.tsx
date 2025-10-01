"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FolderOpen,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Star,
  GitBranch,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sidebar } from "@/components/dashboard/sidebar";
import {
  ProjectModal,
  ProjectFormData,
} from "@/components/dashboard/project-modal";

export default function Projects() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedProject, setSelectedProject] = useState<
    ProjectFormData | undefined
  >();

  // Dummy project data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      slug: "ecommerce-platform",
      description:
        "A full-featured e-commerce platform built with Next.js, Stripe, and PostgreSQL. Includes user authentication, product management, and payment processing.",
      status: "published",
      stars: 245,
      forks: 89,
      views: 1200,
      featured: true,
      createdAt: "2024-01-15",
      updatedAt: "2024-03-10",
      tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      githubUrl: "https://github.com/username/ecommerce-platform",
      liveUrl: "https://ecommerce-demo.com",
      language: "TypeScript",
      license: "MIT",
    },
    {
      id: 2,
      title: "AI Chat Assistant",
      slug: "ai-chat-assistant",
      description:
        "An intelligent chat assistant powered by OpenAI API with real-time messaging, conversation history, and custom personality settings.",
      status: "published",
      stars: 189,
      forks: 67,
      views: 890,
      featured: true,
      createdAt: "2024-02-20",
      updatedAt: "2024-03-05",
      tags: ["React", "OpenAI", "Node.js", "Socket.io"],
      githubUrl: "https://github.com/username/ai-chat-assistant",
      liveUrl: "https://ai-chat-demo.com",
      language: "JavaScript",
      license: "MIT",
    },
    {
      id: 3,
      title: "Task Management System",
      slug: "task-management-system",
      description:
        "A comprehensive task management application with drag-and-drop functionality, team collaboration, and progress tracking.",
      status: "draft",
      stars: 0,
      forks: 0,
      views: 0,
      featured: false,
      createdAt: "2024-03-10",
      updatedAt: "2024-03-10",
      tags: ["Vue.js", "Firebase", "Tailwind CSS"],
      githubUrl: "",
      liveUrl: "",
      language: "JavaScript",
      license: "MIT",
    },
    {
      id: 4,
      title: "Weather Dashboard",
      slug: "weather-dashboard",
      description:
        "A beautiful weather dashboard with real-time data, location-based forecasts, and interactive weather maps.",
      status: "published",
      stars: 156,
      forks: 45,
      views: 678,
      featured: false,
      createdAt: "2023-12-01",
      updatedAt: "2024-02-15",
      tags: ["React", "Weather API", "Charts.js", "CSS"],
      githubUrl: "https://github.com/username/weather-dashboard",
      liveUrl: "https://weather-demo.com",
      language: "JavaScript",
      license: "Apache-2.0",
    },
    {
      id: 5,
      title: "Social Media Analytics",
      slug: "social-media-analytics",
      description:
        "Analytics dashboard for social media platforms with data visualization, engagement metrics, and reporting features.",
      status: "archived",
      stars: 98,
      forks: 23,
      views: 445,
      featured: false,
      createdAt: "2023-10-15",
      updatedAt: "2024-01-20",
      tags: ["Python", "Django", "D3.js", "PostgreSQL"],
      githubUrl: "https://github.com/username/social-analytics",
      liveUrl: "",
      language: "Python",
      license: "GPL-3.0",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: projects.length,
    published: projects.filter((p) => p.status === "published").length,
    draft: projects.filter((p) => p.status === "draft").length,
    archived: projects.filter((p) => p.status === "archived").length,
    totalStars: projects.reduce((sum, project) => sum + project.stars, 0),
    totalForks: projects.reduce((sum, project) => sum + project.forks, 0),
    totalViews: projects.reduce((sum, project) => sum + project.views, 0),
  };

  const handleCreateProject = () => {
    setModalMode("create");
    setSelectedProject(undefined);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: any) => {
    // Navigate to the edit page instead of opening modal
    router.push(`projects/edit/${project.slug}`);
  };

  const handleProjectSubmit = async (data: ProjectFormData) => {
    console.log("Project data:", data);
    // API call would go here
    alert(
      `${modalMode === "create" ? "Created" : "Updated"} project successfully!`
    );
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
        <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Projects</h1>
                <Badge variant="outline" className="text-xs">
                  Template
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                  onClick={handleCreateProject}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </div>
            </div>
          </div>
        </header>

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

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Projects Grid */}
          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No projects found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "Create your first project to get started"}
                  </p>
                  <Button
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                    onClick={handleCreateProject}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Project
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusBadge(project.status)}
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
                              <div
                                className={`w-2 h-2 rounded-full mr-1 ${getLanguageColor(
                                  project.language
                                )}`}
                              />
                              {project.language}
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
                            <DropdownMenuItem
                              onClick={() => handleEditProject(project)}
                            >
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
                            <GitBranch className="h-3 w-3" />
                            {project.forks}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {project.views}
                          </span>
                        </div>
                        <span className="text-xs">{project.license}</span>
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
                        {project.updatedAt !== project.createdAt && (
                          <>• Updated {project.updatedAt}</>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleProjectSubmit}
        initialData={selectedProject}
        mode={modalMode}
      />
    </>
  );
}
