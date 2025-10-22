import { BASE_URL, ENDPOINTS } from "@/config/api";

export async function getBlogs() {
  try {
    const res = await fetch(`${BASE_URL}${ENDPOINTS.BLOG}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return []; 
  }
}

export async function getBlogById(id: string) {
  try {
    const res = await fetch(`${BASE_URL}${ENDPOINTS.BLOG}/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blog: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    return null; 
  }
}
