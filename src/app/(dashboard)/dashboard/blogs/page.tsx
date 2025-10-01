"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Heart,
  MessageCircle,
  Calendar,
  Clock,
  MoreHorizontal,
  TrendingUp,
  Archive,
  CheckCircle,
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
import { BlogModal, BlogFormData } from "@/components/dashboard/blog-modal";

export default function Blogs() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedBlog, setSelectedBlog] = useState<BlogFormData | undefined>();

  // Dummy blog data
  const blogs = [
    {
      id: 1,
      title: "Building Scalable React Applications",
      slug: "building-scalable-react-applications",
      excerpt:
        "Learn how to build React applications that can scale with your business needs and user base.",
      status: "published",
      views: 1250,
      likes: 89,
      comments: 12,
      publishedAt: "2024-03-15",
      author: "B5A7",
      tags: ["React", "JavaScript", "Architecture"],
      featured: true,
      readTime: "8 min",
    },
    {
      id: 2,
      title: "Mastering TypeScript Patterns",
      slug: "mastering-typescript-patterns",
      excerpt:
        "Advanced TypeScript patterns and best practices for building type-safe applications.",
      status: "draft",
      views: 0,
      likes: 0,
      comments: 0,
      publishedAt: null,
      author: "B5A7",
      tags: ["TypeScript", "Patterns", "Best Practices"],
      featured: false,
      readTime: "12 min",
    },
    {
      id: 3,
      title: "Web Development Trends 2024",
      slug: "web-development-trends-2024",
      excerpt:
        "Explore the latest trends and technologies shaping the web development landscape in 2024.",
      status: "published",
      views: 1450,
      likes: 112,
      comments: 23,
      publishedAt: "2024-03-05",
      author: "B5A7",
      tags: ["Trends", "2024", "Web Development"],
      featured: true,
      readTime: "6 min",
    },
    {
      id: 4,
      title: "Introduction to Next.js 15",
      slug: "introduction-to-nextjs-15",
      excerpt:
        "Get started with Next.js 15 and learn about its new features and improvements.",
      status: "published",
      views: 890,
      likes: 67,
      comments: 8,
      publishedAt: "2024-02-28",
      author: "B5A7",
      tags: ["Next.js", "React", "Framework"],
      featured: false,
      readTime: "10 min",
    },
    {
      id: 5,
      title: "CSS Grid vs Flexbox",
      slug: "css-grid-vs-flexbox",
      excerpt:
        "A comprehensive comparison between CSS Grid and Flexbox, and when to use each.",
      status: "archived",
      views: 567,
      likes: 34,
      comments: 5,
      publishedAt: "2024-01-15",
      author: "B5A7",
      tags: ["CSS", "Grid", "Flexbox"],
      featured: false,
      readTime: "7 min",
    },
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: blogs.length,
    published: blogs.filter((b) => b.status === "published").length,
    draft: blogs.filter((b) => b.status === "draft").length,
    archived: blogs.filter((b) => b.status === "archived").length,
    totalViews: blogs.reduce((sum, blog) => sum + blog.views, 0),
    totalLikes: blogs.reduce((sum, blog) => sum + blog.likes, 0),
    totalComments: blogs.reduce((sum, blog) => sum + blog.comments, 0),
  };

  const handleCreateBlog = () => {
    setModalMode("create");
    setSelectedBlog(undefined);
    setIsModalOpen(true);
  };

  const handleEditBlog = (blog: any) => {
    // Navigate to the edit page instead of opening modal
    router.push(`blogs/edit/${blog.slug}`);
  };

  const handleBlogSubmit = async (data: BlogFormData) => {
    console.log("Blog data:", data);
    // API call would go here
    alert(
      `${
        modalMode === "create" ? "Created" : "Updated"
      } blog post successfully!`
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
            <Clock className="w-3 h-3 mr-1" />
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

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
            onClick={handleCreateBlog}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Blog Post
          </Button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-cyan-500">
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
                <div className="text-2xl font-bold text-blue-500">
                  {(stats.totalViews / 1000).toFixed(1)}K
                </div>
                <div className="text-xs text-muted-foreground">Views</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-500">
                  {stats.totalLikes}
                </div>
                <div className="text-xs text-muted-foreground">Likes</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blog posts..."
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

          {/* Blog Posts */}
          <div className="space-y-4">
            {filteredBlogs.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No blog posts found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "Create your first blog post to get started"}
                  </p>
                  <Button
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                    onClick={handleCreateBlog}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Blog Post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredBlogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusBadge(blog.status)}
                          {blog.featured && (
                            <Badge
                              variant="outline"
                              className="text-yellow-500 border-yellow-500"
                            >
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          {blog.title}
                        </h3>
                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {blog.publishedAt || "Not published"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {blog.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {blog.views.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {blog.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {blog.comments}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {blog.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditBlog(blog)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Blog Modal */}
      <BlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleBlogSubmit}
        initialData={selectedBlog}
        mode={modalMode}
      />
    </>
  );
}
