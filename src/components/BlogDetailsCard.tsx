import { Calendar, Clock, Eye, Heart, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IPost } from "@/interface";
import Image from "next/image";

export default function BlogDetail({ blog }: { blog: IPost }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Blog Header */}
        <article className="mb-12">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {blog.featured && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {blog.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">{blog.excerpt}</p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{blog.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{blog.viewCount} views</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>{blog.likeCount} likes</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>{blog.commentCount} comments</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Blog Image */}
            {blog.coverImage && (
              <div className="mb-6">
                <Image
                  width={1000}
                  height={500}
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full rounded-xl shadow-lg object-cover max-h-[500px]"
                />
              </div>
            )}

            {/* Author Info */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <Avatar>
                {/* <AvatarImage src={blog.author.avatar} /> */}
                <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                  B5
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{blog.author}</p>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="text-muted-foreground leading-relaxed space-y-6" />
            {blog.content}
          </div>
        </article>
      </div>
    </div>
  );
}
