import React from "react";
import { GraduationCap } from "lucide-react";

const AuthLanding = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Student Portal</h2>
          <p className="text-gray-400">
            Access your learning materials and track your progress
          </p>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all">
            Sign In to Your Account
          </button>

          <button className="w-full border border-purple-500 text-purple-400 py-3 rounded-lg font-medium hover:bg-purple-500 hover:text-white transition-all">
            Create New Account
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <button className="w-full bg-white text-gray-900 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-100 transition-all">
            <span>🔗</span>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthLanding;
