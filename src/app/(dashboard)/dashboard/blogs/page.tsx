import {
  FileText,
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

import { getBlogs } from "@/services/blog.service";
import { IPost } from "@/interface";
import { BlogModal } from "@/components/dashboard/blog-modal";

export default async function Blogs() {
  const blogs = await getBlogs();
  const stats = {
    total: 10,
    published: 10,
    draft: 45,
    archived: 23,
    totalViews: 34,
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
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="max-w-7xl mx-auto py-4 flex items-end justify-end gap-4">
        <BlogModal />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard label="Total" value={stats.total} color="text-cyan-500" />
          <StatCard
            label="Published"
            value={stats.published}
            color="text-green-500"
          />
          <StatCard label="Draft" value={stats.draft} color="text-orange-500" />
          <StatCard
            label="Archived"
            value={stats.archived}
            color="text-gray-500"
          />
          <StatCard
            label="Views"
            value={`${(stats.totalViews / 1000).toFixed(1)}K`}
            color="text-blue-500"
          />
        </div>

        {/* Blog Posts */}
        <div className="space-y-4">
          {blogs.length === 0 ? (
            <EmptyState />
          ) : (
            blogs.map((blog: IPost) => (
              <Card key={blog.id} className="hover:shadow-lg transition-shadow">
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
                          <DropdownMenuItem>
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
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No blog posts found</h3>
      </CardContent>
    </Card>
  );
}
