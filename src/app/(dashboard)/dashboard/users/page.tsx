"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Mail,
  Shield,
  MoreHorizontal,
  UserCheck,
  UserX,
  Crown,
  User,
  Ban,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dummy user data
  const users = [
    {
      id: 1,
      name: "B5A7 Admin",
      email: "admin@example.com",
      role: "ADMIN",
      status: "active",
      avatar: "/api/placeholder/32/32",
      joinedAt: "2024-01-15",
      lastLogin: "2024-03-20 14:30",
      posts: 24,
      projects: 18,
      verified: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "USER",
      status: "active",
      avatar: "/api/placeholder/32/32",
      joinedAt: "2024-02-01",
      lastLogin: "2024-03-19 09:15",
      posts: 12,
      projects: 8,
      verified: true,
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@example.com",
      role: "EDITOR",
      status: "active",
      avatar: "/api/placeholder/32/32",
      joinedAt: "2024-01-20",
      lastLogin: "2024-03-18 16:45",
      posts: 18,
      projects: 5,
      verified: true,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "USER",
      status: "inactive",
      avatar: "/api/placeholder/32/32",
      joinedAt: "2024-02-15",
      lastLogin: "2024-03-10 11:20",
      posts: 3,
      projects: 2,
      verified: false,
    },
    {
      id: 5,
      name: "Alex Thompson",
      email: "alex@example.com",
      role: "USER",
      status: "suspended",
      avatar: "/api/placeholder/32/32",
      joinedAt: "2024-01-10",
      lastLogin: "2024-03-05 08:30",
      posts: 8,
      projects: 4,
      verified: false,
    },
    {
      id: 6,
      name: "Lisa Wang",
      email: "lisa@example.com",
      role: "EDITOR",
      status: "active",
      avatar: "/api/placeholder/32/32",
      joinedAt: "2024-02-20",
      lastLogin: "2024-03-20 10:00",
      posts: 15,
      projects: 7,
      verified: true,
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
    suspended: users.filter((u) => u.status === "suspended").length,
    admins: users.filter((u) => u.role === "ADMIN").length,
    editors: users.filter((u) => u.role === "EDITOR").length,
    regularUsers: users.filter((u) => u.role === "USER").length,
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return (
          <Badge className="bg-red-500">
            <Crown className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        );
      case "EDITOR":
        return (
          <Badge className="bg-blue-500">
            <Edit className="w-3 h-3 mr-1" />
            Editor
          </Badge>
        );
      case "USER":
        return (
          <Badge variant="secondary">
            <User className="w-3 h-3 mr-1" />
            User
          </Badge>
        );
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500">
            <UserCheck className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="secondary">
            <UserX className="w-3 h-3 mr-1" />
            Inactive
          </Badge>
        );
      case "suspended":
        return (
          <Badge variant="destructive">
            <Ban className="w-3 h-3 mr-1" />
            Suspended
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Users</h1>
                <Badge variant="outline" className="text-xs">
                  Template
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                  onClick={() => alert("Add user functionality coming soon!")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {stats.total}
                </div>
                <div className="text-xs text-muted-foreground">Total Users</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500">
                  {stats.active}
                </div>
                <div className="text-xs text-muted-foreground">Active</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-500">
                  {stats.inactive}
                </div>
                <div className="text-xs text-muted-foreground">Inactive</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-500">
                  {stats.suspended}
                </div>
                <div className="text-xs text-muted-foreground">Suspended</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-500">
                  {stats.admins}
                </div>
                <div className="text-xs text-muted-foreground">Admins</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-cyan-500">
                  {stats.editors}
                </div>
                <div className="text-xs text-muted-foreground">Editors</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="ADMIN">Admins</SelectItem>
                <SelectItem value="EDITOR">Editors</SelectItem>
                <SelectItem value="USER">Users</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts, roles, and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                  <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No users found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ||
                    roleFilter !== "all" ||
                    statusFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "No users have been created yet"}
                  </p>
                  <Button
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                    onClick={() => alert("Add user functionality coming soon!")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add First User
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">User</th>
                        <th className="text-left p-4 font-medium">Role</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Content</th>
                        <th className="text-left p-4 font-medium">Joined</th>
                        <th className="text-left p-4 font-medium">
                          Last Login
                        </th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b hover:bg-muted/50"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={user.avatar}
                                  alt={user.name}
                                />
                                <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs">
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {user.name}
                                  </span>
                                  {user.verified && (
                                    <CheckCircle className="h-3 w-3 text-blue-500" />
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">{getRoleBadge(user.role)}</td>
                          <td className="p-4">{getStatusBadge(user.status)}</td>
                          <td className="p-4">
                            <div className="text-sm">
                              <div>{user.posts} posts</div>
                              <div>{user.projects} projects</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm text-muted-foreground">
                              {user.joinedAt}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm text-muted-foreground">
                              {user.lastLogin}
                            </div>
                          </td>
                          <td className="p-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    alert(
                                      "Edit user functionality coming soon!"
                                    )
                                  }
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    alert("View user details coming soon!")
                                  }
                                >
                                  <User className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    alert(
                                      "Reset password functionality coming soon!"
                                    )
                                  }
                                >
                                  <Shield className="mr-2 h-4 w-4" />
                                  Reset Password
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() =>
                                    alert(
                                      "Delete user functionality coming soon!"
                                    )
                                  }
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
