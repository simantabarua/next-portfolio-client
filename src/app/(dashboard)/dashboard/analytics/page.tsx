"use client";

import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Analytics() {
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
  ];

  return (
    <div className="flex-1 overflow-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {overviewStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4 sm:p-6 flex items-center justify-between">
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
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 sm:h-6 sm:w-6 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
                  <span className="text-sm font-medium">{page.page}</span>
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
    </div>
  );
}
