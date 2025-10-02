export interface IPost {
  id: number;
  title: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  author: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export interface IProject {
  id: number;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  stars: number;
  views: number;
  featured?: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
}
