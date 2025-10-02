"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  MoreHorizontal,
  TrendingUp,
  Archive,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { BlogModal, BlogFormData } from "@/components/dashboard/blog-modal";
import { getBlogs } from "@/services/blog.service";
import { IPost } from "@/interface";

export default async function Blogs() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedBlog, setSelectedBlog] = useState<BlogFormData | undefined>();

  const blogs = await getBlogs();

  const filteredBlogs = blogs.filter((blog: IPost) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus = statusFilter === "all";
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: 10,
    published: 10,
    draft: 45,
    archived: 23,
    totalViews: 34,
  };

  const handleCreateBlog = () => {
    setModalMode("create");
    setSelectedBlog(undefined);
    setIsModalOpen(true);
  };

  const handleEditBlog = (blog: any) => {
    router.push(`blogs/edit/${blog.slug}`);
  };

  const handleBlogSubmit = async (data: BlogFormData) => {
    console.log("Blog data:", data);
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
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
              filteredBlogs.map((blog: IPost) => (
                <Card
                  key={blog.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {/* {getStatusBadge(blog.status)} */}
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
                          {/* <span className="flex items-center gap-1">
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
                          </span> */}
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
