import DashboardNav from "@/components/dashboard/dashboard-nav";
import "../globals.css";
import { Sidebar } from "@/components/dashboard/sidebar";
import { authOptions } from "@/helpers/authOptions";
import { getServerSession } from "next-auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-background overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <DashboardNav session={session} />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
