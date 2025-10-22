'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { X, Plus, FolderOpen, ExternalLink, Github } from 'lucide-react'

export function ProjectModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <FolderOpen className="h-5 w-5" />
            Project Modal
          </DialogTitle>
          <DialogDescription className="text-sm">
            Fill in the project details below.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" placeholder="Enter project title" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input id="slug" placeholder="project-slug" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" placeholder="Describe your project..." rows={4} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Project Image URL</Label>
            <Input id="imageUrl" placeholder="https://example.com/project-image.jpg" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectUrl" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              Repository URL
            </Label>
            <Input id="projectUrl" placeholder="https://github.com/username/repo" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="liveUrl" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Live Demo URL
            </Label>
            <Input id="liveUrl" placeholder="https://project-demo.com" />
          </div>

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
              <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                example-tag
                <X className="h-3 w-3 cursor-pointer hover:text-destructive" />
              </Badge>
            </div>
          </div>

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

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white w-full sm:w-auto">
              Save Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
