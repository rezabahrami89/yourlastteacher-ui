import React from "react";
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Play,
  Users,
  Calendar,
  Star,
} from "lucide-react";

const Dashboard = () => {
  const courses = [
    {
      id: 1,
      title: "IELTS Speaking Mastery",
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      nextLesson: "Advanced Pronunciation",
      instructor: "Reza Ahmadi",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Business English Pro",
      progress: 45,
      totalLessons: 32,
      completedLessons: 14,
      nextLesson: "Meeting Presentations",
      instructor: "Reza Ahmadi",
      rating: 4.8,
    },
    {
      id: 3,
      title: "Grammar Fundamentals",
      progress: 90,
      totalLessons: 16,
      completedLessons: 14,
      nextLesson: "Complex Sentences",
      instructor: "Reza Ahmadi",
      rating: 4.9,
    },
  ];

  const stats = [
    { icon: BookOpen, label: "Courses Enrolled", value: "3", color: "purple" },
    { icon: Clock, label: "Hours Studied", value: "127", color: "blue" },
    { icon: Award, label: "Certificates", value: "2", color: "green" },
    { icon: TrendingUp, label: "Progress", value: "70%", color: "orange" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, John!
          </h1>
          <p className="text-gray-400">
            Continue your English learning journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 bg-${stat.color}-500/20 rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">My Courses</h2>
                <button className="text-purple-400 hover:text-purple-300 text-sm">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">
                          {course.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">
                          by {course.instructor}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>
                            {course.completedLessons}/{course.totalLessons}{" "}
                            lessons
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                      </div>
                      <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all">
                        <Play className="w-4 h-4" />
                        Continue
                      </button>
                    </div>

                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-gray-300">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-400">
                      Next:{" "}
                      <span className="text-purple-400">
                        {course.nextLesson}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Study Schedule */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-purple-500" />
                <h3 className="text-lg font-semibold text-white">
                  Today's Schedule
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      IELTS Speaking
                    </p>
                    <p className="text-gray-400 text-xs">10:00 AM - 11:00 AM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      Grammar Practice
                    </p>
                    <p className="text-gray-400 text-xs">2:00 PM - 3:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      Business English
                    </p>
                    <p className="text-gray-400 text-xs">4:00 PM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold text-white">
                  Recent Activity
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      Completed "Advanced Grammar"
                    </p>
                    <p className="text-gray-400 text-xs">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      Joined group discussion
                    </p>
                    <p className="text-gray-400 text-xs">1 day ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Earned 5-star rating</p>
                    <p className="text-gray-400 text-xs">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
