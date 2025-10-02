import { BASE_URL, ENDPOINTS } from "@/config/api";

export async function getBlogs() {
  const res = await fetch(`${BASE_URL}${ENDPOINTS.BLOG}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch blogs");

  const data = await res.json();
  return data?.data || [];
}

export async function getBlogById(id: string) {
  const res = await fetch(`${BASE_URL}${ENDPOINTS.BLOG}/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch blog");

  const data = await res.json();
  return data;
}
