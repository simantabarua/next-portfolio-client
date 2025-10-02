import { BASE_URL, ENDPOINTS } from "@/config/api";

export const getProjects = async () => {
  const res = await fetch(`${BASE_URL}${ENDPOINTS.PROJECT}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch projects");

  const data = await res.json();
  return data?.data || [];
};
