import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  Download,
  Play,
  Clock,
  Calendar,
  Trophy,
  Star,
  FileText,
  Headphones,
  Video,
  Target,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  BarChart,
  Users,
  MessageSquare,
  LogOut,
  User,
  Settings,
  ChevronDown,
} from "lucide-react";
import { VideoCall } from "@/components/VideoCall";
import { ThemeToggle } from "@/components/ThemeToggle";

// Mock student data - in a real app, this would come from your backend
const mockStudentData = {
  id: "student_001",
  name: "John Smith",
  email: "john.smith@email.com",
  level: "Intermediate",
  joinDate: "2025-01-01",
  totalHours: 24,
  completedLessons: 18,
  totalLessons: 30,
  nextClass: {
    date: "2025-01-15",
    time: "14:00",
    type: "Private Class",
    topic: "Business English Presentation Skills",
  },
  progress: {
    speaking: 75,
    listening: 82,
    reading: 68,
    writing: 71,
    grammar: 79,
    vocabulary: 85,
  },
  achievements: [
    { id: 1, title: "First Class Completed", icon: "🎯", date: "2025-01-02" },
    { id: 2, title: "Speaking Confidence", icon: "🗣️", date: "2025-01-05" },
    { id: 3, title: "Grammar Master", icon: "📝", date: "2025-01-08" },
    { id: 4, title: "Vocabulary Builder", icon: "📚", date: "2025-01-10" },
  ],
};

const mockMaterials = [
  {
    id: 1,
    title: "English Grammar Fundamentals",
    type: "PDF",
    category: "Grammar",
    size: "2.4 MB",
    downloadUrl: "#",
    completed: true,
  },
  {
    id: 2,
    title: "Business Vocabulary Audio Course",
    type: "Audio",
    category: "Vocabulary",
    duration: "45 min",
    downloadUrl: "#",
    completed: true,
  },
  {
    id: 3,
    title: "IELTS Speaking Practice Videos",
    type: "Video",
    category: "Speaking",
    duration: "2.5 hours",
    downloadUrl: "#",
    completed: false,
  },
  {
    id: 4,
    title: "Advanced Reading Comprehension",
    type: "PDF",
    category: "Reading",
    size: "3.1 MB",
    downloadUrl: "#",
    completed: false,
  },
  {
    id: 5,
    title: "Pronunciation Guide with Exercises",
    type: "Audio",
    category: "Speaking",
    duration: "1.2 hours",
    downloadUrl: "#",
    completed: true,
  },
];

const mockLessons = [
  {
    id: 1,
    title: "Introduction to Business English",
    date: "2025-01-02",
    duration: 60,
    type: "Private",
    status: "completed",
    notes: "Great start! Focus on expanding business vocabulary.",
    homework: "Complete Unit 1 exercises",
  },
  {
    id: 2,
    title: "Email Writing Skills",
    date: "2025-01-04",
    duration: 60,
    type: "Private",
    status: "completed",
    notes: "Excellent improvement in formal writing structure.",
    homework: "Write 3 practice emails",
  },
  {
    id: 3,
    title: "Presentation Skills Workshop",
    date: "2025-01-15",
    duration: 60,
    type: "Private",
    status: "scheduled",
    notes: "",
    homework: "Prepare a 5-minute presentation",
  },
];

export function StudentPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loginMode, setLoginMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showVideoCall, setShowVideoCall] = useState(false);

  // Logout function
  const handleLogout = () => {
    window.location.href = "/";
  };

  const handleLogin = () => {
    // Check if it's admin login
    if (
      loginData.email === "reza@admin.com" &&
      loginData.password === "admin123"
    ) {
      // Redirect to admin dashboard
      window.location.href = "/admin";
      return;
    }

    // Regular student login
    if (loginData.email && loginData.password) {
      setIsLoggedIn(true);
    }
  };

  const handleDownload = (material: any) => {
    // Mock download - in a real app, you'd handle file downloads
    console.log("Downloading:", material.title);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background py-24">
        <div className="container mx-auto px-6 max-w-md">
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Student Portal</CardTitle>
              <CardDescription>
                Access your learning materials and track your progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme Toggle on Login Page */}
              <div className="flex justify-center mb-4">
                <ThemeToggle />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <Button onClick={handleLogin} className="w-full glow-effect">
                Access Portal
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Demo credentials: any email and password
                </p>
                <p className="text-xs text-muted-foreground">
                  Don't have an account? Book a class to get access!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-6">
        {/* Header with Professional User Menu */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back,{" "}
              <span className="gradient-text">{mockStudentData.name}</span>
            </h1>
            <p className="text-muted-foreground">
              Continue your English learning journey with Reza
            </p>
          </div>

          {/* Professional User Menu */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* User Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 p-2 hover:bg-secondary/50 rounded-lg transition-colors">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="https://ugc.same-assets.com/ai6TgITjxdHUL2Tc-yI7hupbSqTnrnp7.jpeg" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="font-medium text-sm">
                      {mockStudentData.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {mockStudentData.level} Student
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {mockStudentData.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {mockStudentData.email}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Preferences</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Next Class */}
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Next Class
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold">
                      {mockStudentData.nextClass.topic}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {mockStudentData.nextClass.type}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    {mockStudentData.nextClass.date}
                    <Clock className="h-4 w-4 ml-2" />
                    {mockStudentData.nextClass.time}
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => setShowVideoCall(true)}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Join Class
                  </Button>
                </CardContent>
              </Card>

              {/* Overall Progress */}
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    Overall Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {Math.round(
                        (mockStudentData.completedLessons /
                          mockStudentData.totalLessons) *
                          100
                      )}
                      %
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {mockStudentData.completedLessons} of{" "}
                      {mockStudentData.totalLessons} lessons
                    </p>
                  </div>
                  <Progress
                    value={
                      (mockStudentData.completedLessons /
                        mockStudentData.totalLessons) *
                      100
                    }
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    {mockStudentData.totalHours} total hours completed
                  </p>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Current Level:</span>
                    <Badge variant="outline">{mockStudentData.level}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Member Since:</span>
                    <span className="text-sm">{mockStudentData.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Achievements:</span>
                    <span className="text-sm">
                      {mockStudentData.achievements.length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLessons.slice(0, 3).map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {lesson.status === "completed" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        )}
                        <div>
                          <p className="font-medium">{lesson.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {lesson.date} • {lesson.duration}min
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          lesson.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {lesson.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learning Materials
                </CardTitle>
                <CardDescription>
                  Download and access your course materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockMaterials.map((material) => (
                    <div
                      key={material.id}
                      className="p-4 border border-border rounded-lg space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {material.type === "PDF" && (
                            <FileText className="h-5 w-5 text-red-500" />
                          )}
                          {material.type === "Audio" && (
                            <Headphones className="h-5 w-5 text-blue-500" />
                          )}
                          {material.type === "Video" && (
                            <Video className="h-5 w-5 text-purple-500" />
                          )}
                          <div>
                            <p className="font-medium">{material.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {material.category} •{" "}
                              {material.size || material.duration}
                            </p>
                          </div>
                        </div>
                        {material.completed && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => handleDownload(material)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {material.type === "Video" || material.type === "Audio"
                          ? "Play"
                          : "Download"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-6">
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Lesson History
                </CardTitle>
                <CardDescription>
                  Review your completed and upcoming lessons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="p-4 border border-border rounded-lg space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{lesson.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {lesson.date} • {lesson.duration}min • {lesson.type}
                          </p>
                        </div>
                        <Badge
                          variant={
                            lesson.status === "completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {lesson.status}
                        </Badge>
                      </div>
                      {lesson.notes && (
                        <div className="p-3 bg-secondary/20 rounded">
                          <p className="text-sm">
                            <strong>Notes:</strong> {lesson.notes}
                          </p>
                        </div>
                      )}
                      {lesson.homework && (
                        <div className="p-3 bg-primary/10 rounded">
                          <p className="text-sm">
                            <strong>Homework:</strong> {lesson.homework}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Skill Progress
                </CardTitle>
                <CardDescription>
                  Track your improvement across different English skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(mockStudentData.progress).map(
                    ([skill, progress]) => (
                      <div key={skill} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="capitalize font-medium">
                            {skill}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {progress}%
                          </span>
                        </div>
                        <Progress value={progress} className="w-full" />
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Your Achievements
                </CardTitle>
                <CardDescription>
                  Celebrate your learning milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockStudentData.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <p className="font-medium">{achievement.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Earned on {achievement.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Video Call Modal */}
        {showVideoCall && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-background border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Join Your Class</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowVideoCall(false)}
                  >
                    Close
                  </Button>
                </div>

                <VideoCall
                  classData={{
                    id: "class_001",
                    title: mockStudentData.nextClass.topic,
                    date: mockStudentData.nextClass.date,
                    time: mockStudentData.nextClass.time,
                    duration: 60,
                    type: "zoom",
                    teacher: "Reza",
                    meetingUrl: "https://zoom.us/j/1234567890",
                    meetingId: "123 456 7890",
                    password: "english123",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
