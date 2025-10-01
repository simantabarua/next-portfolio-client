'use client'

import { useState } from 'react'
import { ExternalLink, Github, Star, Eye, Calendar, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.',
      image: '/api/placeholder/400/250',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      category: 'fullstack',
      featured: true,
      githubUrl: 'https://github.com/b5a7/ecommerce-platform',
      liveUrl: 'https://ecommerce-demo.b5a7.dev',
      stars: 245,
      views: 1200,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'AI Chat Assistant',
      description: 'An intelligent chat assistant powered by GPT-4 with context awareness, multi-language support, and custom training.',
      image: '/api/placeholder/400/250',
      tags: ['Next.js', 'TypeScript', 'OpenAI', 'Tailwind'],
      category: 'frontend',
      featured: true,
      githubUrl: 'https://github.com/b5a7/ai-chat-assistant',
      liveUrl: 'https://ai-chat.b5a7.dev',
      stars: 189,
      views: 890,
      createdAt: '2024-02-20'
    },
    {
      id: 3,
      title: 'Task Management System',
      description: 'A collaborative task management tool with real-time updates, drag-and-drop interface, and team analytics.',
      image: '/api/placeholder/400/250',
      tags: ['Vue.js', 'Express', 'MongoDB', 'Socket.io'],
      category: 'fullstack',
      featured: false,
      githubUrl: 'https://github.com/b5a7/task-manager',
      liveUrl: 'https://tasks.b5a7.dev',
      stars: 156,
      views: 650,
      createdAt: '2023-11-10'
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'A beautiful weather dashboard with location-based forecasts, interactive maps, and severe weather alerts.',
      image: '/api/placeholder/400/250',
      tags: ['React', 'TypeScript', 'Weather API', 'Chart.js'],
      category: 'frontend',
      featured: false,
      githubUrl: 'https://github.com/b5a7/weather-dashboard',
      liveUrl: 'https://weather.b5a7.dev',
      stars: 98,
      views: 420,
      createdAt: '2023-09-05'
    },
    {
      id: 5,
      title: 'Blog CMS',
      description: 'A headless CMS for blogs with markdown support, SEO optimization, and content scheduling.',
      image: '/api/placeholder/400/250',
      tags: ['Next.js', 'Prisma', 'PostgreSQL', 'MDX'],
      category: 'backend',
      featured: false,
      githubUrl: 'https://github.com/b5a7/blog-cms',
      liveUrl: 'https://cms.b5a7.dev',
      stars: 134,
      views: 580,
      createdAt: '2023-12-01'
    },
    {
      id: 6,
      title: 'Social Media Analytics',
      description: 'Analytics dashboard for social media metrics with data visualization and automated reporting.',
      image: '/api/placeholder/400/250',
      tags: ['Python', 'Django', 'React', 'D3.js'],
      category: 'backend',
      featured: true,
      githubUrl: 'https://github.com/b5a7/social-analytics',
      liveUrl: 'https://analytics.b5a7.dev',
      stars: 267,
      views: 1100,
      createdAt: '2024-03-10'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'featured', label: 'Featured', count: projects.filter(p => p.featured).length },
    { id: 'fullstack', label: 'Full-Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'frontend', label: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
    { id: 'backend', label: 'Backend', count: projects.filter(p => p.category === 'backend').length }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : activeFilter === 'featured'
    ? projects.filter(p => p.featured)
    : projects.filter(p => p.category === activeFilter)

  const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
    <Card className="group h-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
            <div className="text-6xl opacity-50">🚀</div>
          </div>
          {project.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm">
                <Github className="h-4 w-4 mr-1" />
                Code
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                <ExternalLink className="h-4 w-4 mr-1" />
                Live Demo
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <CardTitle className="text-xl group-hover:text-cyan-500 transition-colors">
            {project.title}
          </CardTitle>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              {project.stars}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {project.views}
            </div>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="h-8 px-2">
              <Github className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 px-2">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Projects Showcase
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my latest projects and see how I turn ideas into reality with modern technologies
          </p>
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeFilter} onValueChange={setActiveFilter} className="mb-12">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                {category.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
          >
            View All Projects on GitHub
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}