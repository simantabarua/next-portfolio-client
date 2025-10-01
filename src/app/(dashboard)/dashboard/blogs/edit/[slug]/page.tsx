"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Eye,
  FileText,
  Image as ImageIcon,
  Hash,
  User,
  X,
  Plus,
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
import { toast } from "sonner";

interface BlogData {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  coverImage: string;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt: string | null;
  author: string;
  readTime: string;
  views: number;
  likes: number;
  comments: number;
}

export default function EditBlog() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "settings">(
    "content"
  );

  // Mock blog data - in real app, this would be fetched from API
  const mockBlogData: BlogData = {
    id: 1,
    title: "Building Scalable React Applications",
    slug: "building-scalable-react-applications",
    content: `# Building Scalable React Applications

React has become one of the most popular JavaScript libraries for building user interfaces. As applications grow in complexity, it's essential to follow best practices and patterns that ensure scalability.

## Understanding React Fundamentals

Before diving into advanced patterns, it's crucial to have a solid understanding of React's core concepts:

- Components and Props
- State and Lifecycle
- Hooks
- Context API

## Component Architecture

When building scalable applications, component architecture plays a vital role. Here are some key principles:

### 1. Single Responsibility Principle

Each component should have a single, well-defined responsibility. This makes components easier to test, maintain, and reuse.

### 2. Composition over Inheritance

React favors composition over inheritance. Design your components to be composable and reusable.

### 3. Prop Drilling vs Context

While prop drilling can work for small applications, consider using React Context or state management libraries for larger applications.

## Performance Optimization

Performance is crucial for user experience. Here are some optimization techniques:

### Code Splitting

Use dynamic imports to split your code into smaller chunks:

\`\`\`javascript
const LazyComponent = React.lazy(() => import('./LazyComponent'));
\`\`\`

### Memoization

Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders.

### Virtualization

For long lists, consider using virtualization techniques to render only visible items.

## State Management

As your application grows, state management becomes increasingly important. Consider these options:

- Local state with useState and useReducer
- Context API for medium-sized applications
- External libraries like Redux or Zustand for complex applications

## Testing Strategies

A comprehensive testing strategy is essential for maintaining code quality:

- Unit tests with Jest and React Testing Library
- Integration tests for component interactions
- End-to-end tests with Cypress or Playwright

## Conclusion

Building scalable React applications requires careful planning and adherence to best practices. By following these patterns and principles, you can create applications that are maintainable, performant, and enjoyable to work with.`,
    excerpt:
      "Learn how to build React applications that can scale with your business needs and user base.",
    tags: ["React", "JavaScript", "Architecture", "Performance"],
    coverImage: "",
    featured: true,
    status: "PUBLISHED",
    publishedAt: "2024-03-15",
    author: "B5A7",
    readTime: "8 min",
    views: 1250,
    likes: 89,
    comments: 12,
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBlogData(mockBlogData);
      setLoading(false);
    }, 500);
  }, [slug]);

  const handleSave = async () => {
    if (!blogData) return;

    setSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Blog post updated successfully!");
      router.push("/blogs");
    } catch (error) {
      toast.error("Failed to update blog post");
    } finally {
      setSaving(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && blogData && !blogData.tags.includes(newTag.trim())) {
      setBlogData({
        ...blogData,
        tags: [...blogData.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (blogData) {
      setBlogData({
        ...blogData,
        tags: blogData.tags.filter((tag) => tag !== tagToRemove),
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
    if (blogData) {
      setBlogData({
        ...blogData,
        title,
        slug: generateSlug(title),
      });
    }
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
            <div className="h-12 bg-muted rounded mb-4"></div>
            <div className="h-64 bg-muted rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Blog post not found</h3>
            <p className="text-muted-foreground mb-4">
              The blog post you're trying to edit doesn't exist.
            </p>
            <Button onClick={() => router.push("/blogs")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
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
                onClick={() => router.push("/blogs")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Edit Blog Post</h1>
                <p className="text-sm text-muted-foreground">
                  Last edited: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Preview
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
                Title
              </Label>
              <Input
                id="title"
                value={blogData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="text-lg mt-2"
                placeholder="Enter blog post title..."
              />
            </div>

            {/* Slug */}
            <div>
              <Label htmlFor="slug" className="text-base font-medium">
                URL Slug
              </Label>
              <Input
                id="slug"
                value={blogData.slug}
                onChange={(e) =>
                  setBlogData({ ...blogData, slug: e.target.value })
                }
                className="mt-2 font-mono"
                placeholder="url-slug"
              />
            </div>

            {/* Tabs */}
            <div className="border-b border-border">
              <div className="flex space-x-8">
                {["content", "seo", "settings"].map((tab) => (
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
            {activeTab === "content" && (
              <div className="space-y-6">
                {/* Excerpt */}
                <div>
                  <Label htmlFor="excerpt" className="text-base font-medium">
                    Excerpt
                  </Label>
                  <Textarea
                    id="excerpt"
                    value={blogData.excerpt}
                    onChange={(e) =>
                      setBlogData({ ...blogData, excerpt: e.target.value })
                    }
                    className="mt-2"
                    rows={3}
                    placeholder="Brief description of the blog post..."
                  />
                </div>

                {/* Content */}
                <div>
                  <Label htmlFor="content" className="text-base font-medium">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    value={blogData.content}
                    onChange={(e) =>
                      setBlogData({ ...blogData, content: e.target.value })
                    }
                    className="mt-2 min-h-[400px] font-mono"
                    placeholder="Write your blog post content here..."
                  />
                </div>

                {/* Cover Image */}
                <div>
                  <Label className="text-base font-medium">Cover Image</Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload a cover image or enter image URL
                    </p>
                    <Input
                      value={blogData.coverImage}
                      onChange={(e) =>
                        setBlogData({
                          ...blogData,
                          coverImage: e.target.value,
                        })
                      }
                      placeholder="https://example.com/image.jpg"
                      className="max-w-md mx-auto"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "seo" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">SEO Settings</CardTitle>
                    <CardDescription>
                      Optimize your blog post for search engines
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="meta-title">Meta Title</Label>
                      <Input
                        id="meta-title"
                        placeholder="SEO title (60 characters max)"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="meta-description">Meta Description</Label>
                      <Textarea
                        id="meta-description"
                        placeholder="SEO description (160 characters max)"
                        className="mt-2"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="focus-keyword">Focus Keyword</Label>
                      <Input
                        id="focus-keyword"
                        placeholder="Primary keyword for this post"
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>
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
                      Control how and when your blog post is published
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="featured">Featured Post</Label>
                        <p className="text-sm text-muted-foreground">
                          Display this post on the homepage
                        </p>
                      </div>
                      <Switch
                        id="featured"
                        checked={blogData.featured}
                        onCheckedChange={(checked) =>
                          setBlogData({ ...blogData, featured: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={blogData.status}
                        onValueChange={(
                          value: "DRAFT" | "PUBLISHED" | "ARCHIVED"
                        ) => setBlogData({ ...blogData, status: value })}
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

                    {blogData.status === "PUBLISHED" && (
                      <div>
                        <Label htmlFor="published-at">Publish Date</Label>
                        <Input
                          id="published-at"
                          type="date"
                          value={blogData.publishedAt || ""}
                          onChange={(e) =>
                            setBlogData({
                              ...blogData,
                              publishedAt: e.target.value,
                            })
                          }
                          className="mt-2"
                        />
                      </div>
                    )}
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
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag..."
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  />
                  <Button size="icon" onClick={handleAddTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blogData.tags.map((tag) => (
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
                  <span className="text-sm text-muted-foreground">Views</span>
                  <span className="text-sm font-medium">
                    {blogData.views.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Likes</span>
                  <span className="text-sm font-medium">{blogData.likes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Comments
                  </span>
                  <span className="text-sm font-medium">
                    {blogData.comments}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Read Time
                  </span>
                  <span className="text-sm font-medium">
                    {blogData.readTime}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Author */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Author
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {blogData.author.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium">{blogData.author}</p>
                    <p className="text-sm text-muted-foreground">Author</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
