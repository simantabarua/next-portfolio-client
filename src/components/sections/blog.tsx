'use client'

import { useState } from 'react'
import { Calendar, Clock, Eye, Heart, MessageCircle, Search, Tag, User, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const blogPosts = [
    {
      id: 1,
      title: 'Building Scalable React Applications with Next.js 15',
      slug: 'building-scalable-react-applications-nextjs-15',
      excerpt: 'Learn how to build production-ready React applications using Next.js 15, TypeScript, and modern best practices for performance and scalability.',
      content: 'Full article content would go here...',
      coverImage: '/api/placeholder/400/250',
      author: 'B5A7',
      authorAvatar: '/api/placeholder/40/40',
      publishedAt: '2024-03-15',
      readTime: '8 min read',
      viewCount: 1250,
      likeCount: 89,
      commentCount: 12,
      featured: true,
      status: 'PUBLISHED',
      tags: ['React', 'Next.js', 'TypeScript', 'Web Development'],
      categories: ['Tutorial', 'Frontend']
    },
    {
      id: 2,
      title: 'Mastering TypeScript: Advanced Patterns and Best Practices',
      slug: 'mastering-typescript-advanced-patterns',
      excerpt: 'Deep dive into advanced TypeScript patterns, generics, utility types, and best practices for building type-safe applications.',
      content: 'Full article content would go here...',
      coverImage: '/api/placeholder/400/250',
      author: 'B5A7',
      authorAvatar: '/api/placeholder/40/40',
      publishedAt: '2024-03-10',
      readTime: '12 min read',
      viewCount: 980,
      likeCount: 67,
      commentCount: 8,
      featured: true,
      status: 'PUBLISHED',
      tags: ['TypeScript', 'JavaScript', 'Programming', 'Best Practices'],
      categories: ['Tutorial', 'Programming']
    },
    {
      id: 3,
      title: 'The Future of Web Development: Trends to Watch in 2024',
      slug: 'future-web-development-trends-2024',
      excerpt: 'Explore the latest trends in web development including AI integration, edge computing, WebAssembly, and the evolution of JavaScript frameworks.',
      content: 'Full article content would go here...',
      coverImage: '/api/placeholder/400/250',
      author: 'B5A7',
      authorAvatar: '/api/placeholder/40/40',
      publishedAt: '2024-03-05',
      readTime: '6 min read',
      viewCount: 1450,
      likeCount: 112,
      commentCount: 23,
      featured: false,
      status: 'PUBLISHED',
      tags: ['Web Development', 'Trends', 'Technology', 'Future'],
      categories: ['Opinion', 'Technology']
    },
    {
      id: 4,
      title: 'Optimizing React Performance: A Complete Guide',
      slug: 'optimizing-react-performance-complete-guide',
      excerpt: 'Comprehensive guide to React performance optimization techniques including memoization, code splitting, and bundle optimization.',
      content: 'Full article content would go here...',
      coverImage: '/api/placeholder/400/250',
      author: 'B5A7',
      authorAvatar: '/api/placeholder/40/40',
      publishedAt: '2024-02-28',
      readTime: '10 min read',
      viewCount: 890,
      likeCount: 78,
      commentCount: 15,
      featured: false,
      status: 'PUBLISHED',
      tags: ['React', 'Performance', 'Optimization', 'JavaScript'],
      categories: ['Tutorial', 'Performance']
    },
    {
      id: 5,
      title: 'Building RESTful APIs with Node.js and Express',
      slug: 'building-restful-apis-nodejs-express',
      excerpt: 'Learn how to design, build, and deploy RESTful APIs using Node.js, Express, and best practices for API development.',
      content: 'Full article content would go here...',
      coverImage: '/api/placeholder/400/250',
      author: 'B5A7',
      authorAvatar: '/api/placeholder/40/40',
      publishedAt: '2024-02-20',
      readTime: '9 min read',
      viewCount: 720,
      likeCount: 56,
      commentCount: 9,
      featured: false,
      status: 'PUBLISHED',
      tags: ['Node.js', 'Express', 'API', 'Backend'],
      categories: ['Tutorial', 'Backend']
    },
    {
      id: 6,
      title: 'Introduction to Docker for Web Developers',
      slug: 'introduction-docker-web-developers',
      excerpt: 'Get started with Docker and containerization. Learn how to containerize your web applications and streamline your development workflow.',
      content: 'Full article content would go here...',
      coverImage: '/api/placeholder/400/250',
      author: 'B5A7',
      authorAvatar: '/api/placeholder/40/40',
      publishedAt: '2024-02-15',
      readTime: '7 min read',
      viewCount: 650,
      likeCount: 45,
      commentCount: 6,
      featured: false,
      status: 'PUBLISHED',
      tags: ['Docker', 'DevOps', 'Containerization', 'Development'],
      categories: ['Tutorial', 'DevOps']
    }
  ]

  const categories = [
    { id: 'all', label: 'All Posts', count: blogPosts.length },
    { id: 'Tutorial', label: 'Tutorials', count: blogPosts.filter(p => p.categories.includes('Tutorial')).length },
    { id: 'Frontend', label: 'Frontend', count: blogPosts.filter(p => p.categories.includes('Frontend')).length },
    { id: 'Backend', label: 'Backend', count: blogPosts.filter(p => p.categories.includes('Backend')).length },
    { id: 'Technology', label: 'Technology', count: blogPosts.filter(p => p.categories.includes('Technology')).length }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || post.categories.includes(selectedCategory)
    
    return matchesSearch && matchesCategory
  })

  const BlogCard = ({ post }: { post: typeof blogPosts[0] }) => (
    <Card className="group h-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
            <div className="text-6xl opacity-50">📝</div>
          </div>
          {post.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                Featured
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {post.categories[0]}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </div>
        </div>
        
        <CardTitle className="text-xl mb-3 group-hover:text-cyan-500 transition-colors line-clamp-2">
          {post.title}
        </CardTitle>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                B5
              </div>
              <span className="text-sm font-medium">{post.author}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {post.viewCount}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {post.likeCount}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {post.commentCount}
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-between group-hover:bg-cyan-500/10 group-hover:text-cyan-500">
            Read More
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Blog & Articles
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, technology, and programming
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-cyan-500/20 focus:border-cyan-500"
              />
            </div>
          </div>
          
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
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
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
          >
            Load More Articles
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}