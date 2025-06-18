import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  Star,
  MessageSquare,
  Mail,
  Phone,
  Globe,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  BarChart3,
  PieChart,
  Activity,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Award,
  Target,
} from "lucide-react";

// Mock data for demonstration
const mockStudents = [
  {
    id: 1,
    name: "Sarah Ahmed",
    email: "sarah@example.com",
    level: "Intermediate",
    progress: 75,
    lessonsCompleted: 15,
    nextLesson: "2025-06-17T10:00:00",
    status: "active",
  },
  {
    id: 2,
    name: "Mohammad Khan",
    email: "mohammad@example.com",
    level: "Beginner",
    progress: 45,
    lessonsCompleted: 8,
    nextLesson: "2025-06-17T14:00:00",
    status: "active",
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    email: "lisa@example.com",
    level: "Advanced",
    progress: 90,
    lessonsCompleted: 25,
    nextLesson: "2025-06-18T09:00:00",
    status: "active",
  },
];

const mockBookings = [
  {
    id: 1,
    studentName: "Sarah Ahmed",
    date: "2025-06-17",
    time: "10:00",
    type: "Private",
    status: "confirmed",
  },
  {
    id: 2,
    studentName: "Mohammad Khan",
    date: "2025-06-17",
    time: "14:00",
    type: "Private",
    status: "confirmed",
  },
  {
    id: 3,
    studentName: "Group Class A",
    date: "2025-06-18",
    time: "16:00",
    type: "Group",
    status: "pending",
  },
];

const mockUpcomingClasses = [
  {
    id: 1,
    title: "IELTS Speaking Practice",
    time: "10:00 AM",
    students: 8,
    level: "Intermediate",
  },
  {
    id: 2,
    title: "Business English",
    time: "2:00 PM",
    students: 12,
    level: "Advanced",
  },
  {
    id: 3,
    title: "Grammar Fundamentals",
    time: "4:00 PM",
    students: 15,
    level: "Beginner",
  },
];

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState(mockStudents);
  const [bookings, setBookings] = useState(mockBookings);

  // Stats calculations
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "active").length;
  const totalLessons = students.reduce((acc, s) => acc + s.lessonsCompleted, 0);
  const averageProgress = Math.round(
    students.reduce((acc, s) => acc + s.progress, 0) / students.length
  );

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        {/* Header */}
        <div className="relative">
          {/* Theme Toggle - Top Right */}
          <div className="absolute top-0 right-0 z-10">
            <ThemeToggle />
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold mb-2">
              Teacher <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">
              Welcome back, Reza! Manage your students and classes
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-green-500">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Students
              </CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeStudents}</div>
              <p className="text-xs text-green-500">100% retention rate</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Lessons
              </CardTitle>
              <BookOpen className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLessons}</div>
              <p className="text-xs text-green-500">+12 this week</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Progress
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageProgress}%</div>
              <p className="text-xs text-green-500">+5% improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Classes */}
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Today's Classes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockUpcomingClasses.map((classItem) => (
                    <div
                      key={classItem.id}
                      className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg border border-border"
                    >
                      <div>
                        <p className="font-medium">{classItem.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {classItem.time} • {classItem.students} students
                        </p>
                      </div>
                      <Badge variant="outline" className="border-border">
                        {classItem.level}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Performing Students */}
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Top Performing Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students
                      .sort((a, b) => b.progress - a.progress)
                      .slice(0, 3)
                      .map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/20 text-primary">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {student.level}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{student.progress}%</p>
                            <Progress
                              value={student.progress}
                              className="w-16 h-2"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Student Management</h2>
                <p className="text-muted-foreground">
                  Manage your students and track their progress
                </p>
              </div>
              <Button className="glow-effect">
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </div>

            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    All Students
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Search students..."
                      className="w-64 bg-background/50 border-border"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border"
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-primary/20 text-primary">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {student.email}
                          </p>
                          <div className="mt-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <span>Progress: {student.progress}%</span>
                            </div>
                            <Progress
                              value={student.progress}
                              className="w-32 h-2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Level</p>
                          <Badge variant="outline" className="border-border">
                            {student.level}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">
                            Lessons
                          </p>
                          <p className="font-medium">
                            {student.lessonsCompleted}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Booking Management</h2>
                <p className="text-muted-foreground">
                  Schedule and manage your upcoming lessons
                </p>
              </div>
              <Button className="glow-effect">
                <Calendar className="mr-2 h-4 w-4" />
                New Booking
              </Button>
            </div>

            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Lessons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{booking.studentName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {booking.date} at {booking.time} - {booking.type}{" "}
                            Class
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {booking.status}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Analytics & Reports</h2>
              <p className="text-muted-foreground">
                Track your teaching performance and revenue
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Monthly Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">$3,240</div>
                  <p className="text-green-500 text-sm">+15% from last month</p>
                  <div className="mt-4 h-32 bg-secondary/20 rounded-lg flex items-center justify-center border border-border">
                    <p className="text-muted-foreground">Chart placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Completion Rate
                      </span>
                      <span className="font-medium">89%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Average Score
                      </span>
                      <span className="font-medium">7.2/10</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Student Satisfaction
                      </span>
                      <span className="font-medium">4.8/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
