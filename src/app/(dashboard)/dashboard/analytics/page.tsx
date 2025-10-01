"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Calendar,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  // Dummy analytics data
  const overviewStats = [
    {
      title: "Total Views",
      value: "45.2K",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Unique Visitors",
      value: "12.8K",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Engagement Rate",
      value: "68.4%",
      change: "-2.1%",
      trend: "down",
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Avg. Session Duration",
      value: "4m 32s",
      change: "+18.3%",
      trend: "up",
      icon: Calendar,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  const blogStats = [
    {
      title: "Total Blog Posts",
      value: "24",
      change: "+4",
      trend: "up",
      icon: BarChart3,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      title: "Blog Views",
      value: "18.5K",
      change: "+22.1%",
      trend: "up",
      icon: Eye,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      title: "Blog Likes",
      value: "3.2K",
      change: "+15.7%",
      trend: "up",
      icon: Heart,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      title: "Blog Comments",
      value: "487",
      change: "+8.9%",
      trend: "up",
      icon: MessageCircle,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const projectStats = [
    {
      title: "Total Projects",
      value: "18",
      change: "+2",
      trend: "up",
      icon: BarChart3,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Project Views",
      value: "26.7K",
      change: "+31.4%",
      trend: "up",
      icon: Eye,
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
    },
    {
      title: "GitHub Stars",
      value: "1.2K",
      change: "+45.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Forks",
      value: "234",
      change: "+12.8%",
      trend: "up",
      icon: TrendingUp,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
  ];

  const topPages = [
    { page: "/blog/react-patterns", views: 3420, percentage: 18.5 },
    { page: "/projects/ecommerce", views: 2890, percentage: 15.6 },
    { page: "/blog/typescript-tips", views: 2450, percentage: 13.2 },
    { page: "/projects/chat-assistant", views: 2100, percentage: 11.3 },
    { page: "/about", views: 1870, percentage: 10.1 },
  ];

  const recentActivity = [
    {
      action: "New blog post published",
      page: "React Best Practices",
      time: "2 hours ago",
      type: "blog",
    },
    {
      action: "Project updated",
      page: "E-Commerce Platform",
      time: "5 hours ago",
      type: "project",
    },
    {
      action: "New comment",
      page: "TypeScript Patterns",
      time: "1 day ago",
      type: "comment",
    },
    {
      action: "Project featured",
      page: "AI Chat Assistant",
      time: "2 days ago",
      type: "project",
    },
    {
      action: "Blog post edited",
      page: "Web Development Trends",
      time: "3 days ago",
      type: "blog",
    },
  ];

  return (
    <div className="flex-1 overflow-auto">
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Overview Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {overviewStats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-xl sm:text-2xl font-bold mt-1">
                        {stat.value}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        {stat.trend === "up" ? (
                          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                        )}
                        <span
                          className={`text-xs sm:text-sm ${
                            stat.trend === "up"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-2 sm:p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon
                        className={`h-4 w-4 sm:h-6 sm:w-6 ${stat.color}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="blogs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
          </TabsList>

          {/* Blogs Analytics */}
          <TabsContent value="blogs" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {blogStats.map((stat) => (
                <Card key={stat.title}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-xl sm:text-2xl font-bold mt-1">
                          {stat.value}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          {stat.trend === "up" ? (
                            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                          )}
                          <span
                            className={`text-xs sm:text-sm ${
                              stat.trend === "up"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`p-2 sm:p-3 rounded-full ${stat.bgColor}`}
                      >
                        <stat.icon
                          className={`h-4 w-4 sm:h-6 sm:w-6 ${stat.color}`}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Blog Posts</CardTitle>
                <CardDescription>
                  Most viewed blog posts in the selected time period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Blog performance chart coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Analytics */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {projectStats.map((stat) => (
                <Card key={stat.title}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-xl sm:text-2xl font-bold mt-1">
                          {stat.value}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          {stat.trend === "up" ? (
                            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                          )}
                          <span
                            className={`text-xs sm:text-sm ${
                              stat.trend === "up"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`p-2 sm:p-3 rounded-full ${stat.bgColor}`}
                      >
                        <stat.icon
                          className={`h-4 w-4 sm:h-6 sm:w-6 ${stat.color}`}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Project Performance</CardTitle>
                <CardDescription>
                  GitHub stars, forks, and project views
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <TrendingUp className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Project performance chart coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Traffic Analytics */}
          <TabsContent value="traffic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                  <CardDescription>Most visited pages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPages.map((page, index) => (
                      <div
                        key={page.page}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-muted-foreground w-6">
                            #{index + 1}
                          </span>
                          <span className="text-sm font-medium">
                            {page.page}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {page.views.toLocaleString()}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {page.percentage}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            activity.type === "blog"
                              ? "bg-cyan-500"
                              : activity.type === "project"
                              ? "bg-purple-500"
                              : "bg-orange-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.page} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Visitor trends and patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Traffic chart coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
