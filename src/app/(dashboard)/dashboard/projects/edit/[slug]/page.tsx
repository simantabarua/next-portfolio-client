"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Eye,
  FolderOpen,
  Image as ImageIcon,
  Hash,
  ExternalLink,
  Code,
  Globe,
  Star,
  GitBranch,
  X,
  Plus,
  Github,
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/dashboard/sidebar";
import { toast } from "sonner";

interface ProjectData {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string[];
  imageUrl: string;
  projectUrl: string;
  liveUrl: string;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
  language: string;
  license: string;
  stars: number;
  forks: number;
  views: number;
}

export default function EditProject() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [activeTab, setActiveTab] = useState<
    "details" | "content" | "settings"
  >("details");

  // Mock project data - in real app, this would be fetched from API
  const mockProjectData: ProjectData = {
    id: 1,
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    description:
      "A full-featured e-commerce platform built with Next.js, Stripe, and PostgreSQL. Includes user authentication, product management, and payment processing.",
    content: `# E-Commerce Platform

A comprehensive e-commerce solution built with modern web technologies.

## Features

- User authentication and authorization
- Product catalog with search and filtering
- Shopping cart and wishlist
- Secure payment processing with Stripe
- Order management and tracking
- Admin dashboard for inventory management
- Responsive design for all devices

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe API
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies with \`npm install\`
3. Set up environment variables
4. Run the development server with \`npm run dev\`

## Project Structure

\`\`\`
src/
├── app/              # Next.js app router pages
├── components/       # Reusable React components
├── lib/             # Utility functions and configurations
├── prisma/          # Database schema and migrations
└── public/          # Static assets
\`\`\`

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting pull requests.`,
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "E-commerce"],
    imageUrl: "",
    projectUrl: "https://github.com/username/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.com",
    featured: true,
    status: "PUBLISHED",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-10",
    language: "TypeScript",
    license: "MIT",
    stars: 245,
    forks: 89,
    views: 1200,
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjectData(mockProjectData);
      setLoading(false);
    }, 500);
  }, [slug]);

  const handleSave = async () => {
    if (!projectData) return;

    setSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Project updated successfully!");
      router.push("/projects");
    } catch (error) {
      toast.error("Failed to update project");
    } finally {
      setSaving(false);
    }
  };

  const handleAddTag = () => {
    if (
      newTag.trim() &&
      projectData &&
      !projectData.tags.includes(newTag.trim())
    ) {
      setProjectData({
        ...projectData,
        tags: [...projectData.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (projectData) {
      setProjectData({
        ...projectData,
        tags: projectData.tags.filter((tag) => tag !== tagToRemove),
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    if (projectData) {
      setProjectData({
        ...projectData,
        title,
        slug: generateSlug(title),
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-background overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
              <div className="h-12 bg-muted rounded mb-4"></div>
              <div className="h-64 bg-muted rounded mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="flex h-screen bg-background overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Project not found</h3>
              <p className="text-muted-foreground mb-4">
                The project you're trying to edit doesn't exist.
              </p>
              <Button onClick={() => router.push("/projects")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/projects")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Edit Project</h1>
                <p className="text-sm text-muted-foreground">
                  Last updated:{" "}
                  {new Date(projectData.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" disabled={!projectData.liveUrl}>
                <Globe className="mr-2 h-4 w-4" />
                Live Demo
              </Button>
              <Button variant="outline" disabled={!projectData.projectUrl}>
                <Code className="mr-2 h-4 w-4" />
                View Code
              </Button>
              <Button
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-base font-medium">
                Project Title
              </Label>
              <Input
                id="title"
                value={projectData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="text-lg mt-2"
                placeholder="Enter project title..."
              />
            </div>

            {/* Slug */}
            <div>
              <Label htmlFor="slug" className="text-base font-medium">
                URL Slug
              </Label>
              <Input
                id="slug"
                value={projectData.slug}
                onChange={(e) =>
                  setProjectData({ ...projectData, slug: e.target.value })
                }
                className="mt-2 font-mono"
                placeholder="project-slug"
              />
            </div>

            {/* Tabs */}
            <div className="border-b border-border">
              <div className="flex space-x-8">
                {["details", "content", "settings"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? "border-cyan-500 text-cyan-500"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "details" && (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <Label
                    htmlFor="description"
                    className="text-base font-medium"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={projectData.description}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        description: e.target.value,
                      })
                    }
                    className="mt-2"
                    rows={4}
                    placeholder="Brief description of the project..."
                  />
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="project-url"
                      className="text-base font-medium flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      GitHub URL
                    </Label>
                    <Input
                      id="project-url"
                      value={projectData.projectUrl}
                      onChange={(e) =>
                        setProjectData({
                          ...projectData,
                          projectUrl: e.target.value,
                        })
                      }
                      className="mt-2"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="live-url"
                      className="text-base font-medium flex items-center gap-2"
                    >
                      <Globe className="h-4 w-4" />
                      Live Demo URL
                    </Label>
                    <Input
                      id="live-url"
                      value={projectData.liveUrl}
                      onChange={(e) =>
                        setProjectData({
                          ...projectData,
                          liveUrl: e.target.value,
                        })
                      }
                      className="mt-2"
                      placeholder="https://project-demo.com"
                    />
                  </div>
                </div>

                {/* Project Image */}
                <div>
                  <Label className="text-base font-medium">Project Image</Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload a project screenshot or enter image URL
                    </p>
                    <Input
                      value={projectData.imageUrl}
                      onChange={(e) =>
                        setProjectData({
                          ...projectData,
                          imageUrl: e.target.value,
                        })
                      }
                      placeholder="https://example.com/screenshot.png"
                      className="max-w-md mx-auto"
                    />
                  </div>
                </div>

                {/* Technical Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="language">Primary Language</Label>
                    <Select
                      value={projectData.language}
                      onValueChange={(value) =>
                        setProjectData({ ...projectData, language: value })
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TypeScript">TypeScript</SelectItem>
                        <SelectItem value="JavaScript">JavaScript</SelectItem>
                        <SelectItem value="Python">Python</SelectItem>
                        <SelectItem value="Java">Java</SelectItem>
                        <SelectItem value="Go">Go</SelectItem>
                        <SelectItem value="Rust">Rust</SelectItem>
                        <SelectItem value="C++">C++</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="license">License</Label>
                    <Select
                      value={projectData.license}
                      onValueChange={(value) =>
                        setProjectData({ ...projectData, license: value })
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MIT">MIT</SelectItem>
                        <SelectItem value="Apache-2.0">Apache 2.0</SelectItem>
                        <SelectItem value="GPL-3.0">GPL 3.0</SelectItem>
                        <SelectItem value="BSD-3-Clause">
                          BSD 3-Clause
                        </SelectItem>
                        <SelectItem value="ISC">ISC</SelectItem>
                        <SelectItem value="Proprietary">Proprietary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "content" && (
              <div className="space-y-6">
                {/* Content */}
                <div>
                  <Label htmlFor="content" className="text-base font-medium">
                    Project Content
                  </Label>
                  <Textarea
                    id="content"
                    value={projectData.content}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        content: e.target.value,
                      })
                    }
                    className="mt-2 min-h-[400px] font-mono"
                    placeholder="Write detailed project description, features, installation instructions, etc..."
                  />
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Publishing Settings
                    </CardTitle>
                    <CardDescription>
                      Control how your project is displayed and accessed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="featured">Featured Project</Label>
                        <p className="text-sm text-muted-foreground">
                          Display this project on the homepage
                        </p>
                      </div>
                      <Switch
                        id="featured"
                        checked={projectData.featured}
                        onCheckedChange={(checked) =>
                          setProjectData({
                            ...projectData,
                            featured: checked,
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={projectData.status}
                        onValueChange={(
                          value: "DRAFT" | "PUBLISHED" | "ARCHIVED"
                        ) => setProjectData({ ...projectData, status: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DRAFT">Draft</SelectItem>
                          <SelectItem value="PUBLISHED">Published</SelectItem>
                          <SelectItem value="ARCHIVED">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="created-at">Created Date</Label>
                        <Input
                          id="created-at"
                          type="date"
                          value={projectData.createdAt}
                          onChange={(e) =>
                            setProjectData({
                              ...projectData,
                              createdAt: e.target.value,
                            })
                          }
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="updated-at">Last Updated</Label>
                        <Input
                          id="updated-at"
                          type="date"
                          value={projectData.updatedAt}
                          onChange={(e) =>
                            setProjectData({
                              ...projectData,
                              updatedAt: e.target.value,
                            })
                          }
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Technologies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add technology..."
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  />
                  <Button size="icon" onClick={handleAddTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {projectData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Stars
                  </span>
                  <span className="text-sm font-medium">
                    {projectData.stars}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <GitBranch className="h-3 w-3" />
                    Forks
                  </span>
                  <span className="text-sm font-medium">
                    {projectData.forks}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    Views
                  </span>
                  <span className="text-sm font-medium">
                    {projectData.views.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  disabled={!projectData.projectUrl}
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  disabled={!projectData.liveUrl}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Live Site
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
