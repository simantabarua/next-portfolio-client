import { BASE_URL, ENDPOINTS } from "@/config/api";

export const getProjects = async () => {
  try {
    const res = await fetch(`${BASE_URL}${ENDPOINTS.PROJECT}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};
