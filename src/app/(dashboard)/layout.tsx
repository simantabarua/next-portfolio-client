import DashboardNav from "@/components/dashboard/dashboard-nav";
import "../globals.css";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-background overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <DashboardNav />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
