'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { X, Plus, FolderOpen, ExternalLink, Github } from 'lucide-react'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ProjectFormData) => void
  initialData?: ProjectFormData
  mode: 'create' | 'edit'
}

export interface ProjectFormData {
  title: string
  slug: string
  description: string
  imageUrl: string
  projectUrl: string
  liveUrl: string
  tags: string[]
  featured: boolean
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
}

export function ProjectModal({ isOpen, onClose, onSubmit, initialData, mode }: ProjectModalProps) {
  const [formData, setFormData] = useState<ProjectFormData>(
    initialData || {
      title: '',
      slug: '',
      description: '',
      imageUrl: '',
      projectUrl: '',
      liveUrl: '',
      tags: [],
      featured: false,
      status: 'PUBLISHED'
    }
  )
  const [newTag, setNewTag] = useState('')

  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Auto-generate slug from title
    if (field === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 w-full sm:w-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <FolderOpen className="h-5 w-5" />
            {mode === 'create' ? 'Create New Project' : 'Edit Project'}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {mode === 'create' 
              ? 'Fill in the details to create a new project.'
              : 'Update the project details.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter project title"
              required
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => handleInputChange('slug', e.target.value)}
              placeholder="project-slug"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your project..."
              rows={4}
              required
            />
          </div>

          {/* URLs */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Project Image URL</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                placeholder="https://example.com/project-image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectUrl" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                Repository URL
              </Label>
              <Input
                id="projectUrl"
                value={formData.projectUrl}
                onChange={(e) => handleInputChange('projectUrl', e.target.value)}
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="liveUrl" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Live Demo URL
              </Label>
              <Input
                id="liveUrl"
                value={formData.liveUrl}
                onChange={(e) => handleInputChange('liveUrl', e.target.value)}
                placeholder="https://project-demo.com"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag (e.g., React, TypeScript)"
                className="flex-1"
              />
              <Button type="button" onClick={addTag} size="sm" className="w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Add Tag</span>
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1 text-xs">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Status and Featured */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') => 
                  handleInputChange('status', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
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
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange('featured', checked)}
                />
                <Label htmlFor="featured" className="text-sm">
                  Mark as featured
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white w-full sm:w-auto">
              {mode === 'create' ? 'Create Project' : 'Update Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}