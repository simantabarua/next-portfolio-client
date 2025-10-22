import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus, FileText } from "lucide-react";

export function BlogModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
          <Plus className="mr-2 h-4 w-4" />
          New Blog Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <FileText className="h-5 w-5" />
            Blog Post Modal
          </DialogTitle>
          <DialogDescription className="text-sm">
            Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" placeholder="Enter blog post title" required />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input id="slug" placeholder="blog-post-slug" required />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              placeholder="Write your blog post content here..."
              rows={8}
              required
            />
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input placeholder="Add a tag" className="flex-1" />
              <Button type="button" size="sm" className="w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Add Tag</span>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 text-xs"
              >
                example-tag
                <X className="h-3 w-3 cursor-pointer hover:text-destructive" />
              </Badge>
            </div>
          </div>

          {/* Status and Featured */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Featured</Label>
              <div className="flex items-center space-x-2 h-10">
                <Checkbox id="featured" />
                <Label htmlFor="featured" className="text-sm">
                  Mark as featured
                </Label>
              </div>
            </div>
          </div>

          {/* Published Date */}
          <div className="space-y-2">
            <Label htmlFor="publishedAt">Published Date</Label>
            <Input id="publishedAt" type="datetime-local" />
          </div>

          {/* Actions */}
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white w-full sm:w-auto"
            >
              Save Blog Post
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
