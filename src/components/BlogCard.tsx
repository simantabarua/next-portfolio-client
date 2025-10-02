import {
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IPost } from "@/interface";

const BlogCard = ({ post }: { post: IPost }) => (
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
          {/* {post.categories[0]} */}
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

      <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

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
        <Button
          variant="ghost"
          className="w-full justify-between group-hover:bg-cyan-500/10 group-hover:text-cyan-500"
        >
          Read More
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default BlogCard;
