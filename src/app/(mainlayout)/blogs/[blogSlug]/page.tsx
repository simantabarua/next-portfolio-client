import BlogDetail from "@/components/BlogDetailsCard";
import { BASE_URL, ENDPOINTS } from "@/config/api";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { blogSlug: string };
}) {
  const res = await fetch(`${BASE_URL}${ENDPOINTS.BLOG}/${params.blogSlug}`);
  const { data: blog } = await res.json();
  return {
    title: blog.title,
    description: blog.content,
  };
}
async function BlogDetails({ params }: { params: { blogSlug: string } }) {
  const res = await fetch(`${BASE_URL}${ENDPOINTS.BLOG}/${params.blogSlug}`);
  const { data: blog } = await res.json();
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The blog post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-20">
      <BlogDetail blog={blog} />
    </div>
  );
}

export default BlogDetails;
