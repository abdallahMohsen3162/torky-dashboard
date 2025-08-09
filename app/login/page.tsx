"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { toast } from "react-toastify";
import { useLoginMutation } from "../services/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // Simulating the mutation hook for demo purposes

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e:any) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [login, { isLoading, isError, error }] = useLoginMutation();
  const router = useRouter();
  const handleLogin = async () => {
    setMessage("");

    try {
      const res =await login(formData);
      console.log(res);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("✅ تم تسجيل الدخول بنجاح!");
      localStorage.setItem("temp", "true");
      toast.success("تم تسجيل الدخول بنجاح!");
      router.push("/hello"); // Redirect to hello page
    } catch (err) {
      console.error("Login failed:", err);
      if (isError) {
        setMessage("❌ بريد إلكتروني أو كلمة مرور غير صحيحة");
      }
    } 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>

      {/* Login Card */}
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-2xl">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
            لوحة التحكم
          </h1>
          <p className="text-white/70 text-sm">
            مرحباً بك، يرجى تسجيل الدخول للمتابعة
          </p>
        </div>

        <div className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-white/50" />
            </div>
            <input
              name="email"
              type="email"
              placeholder="البريد الإلكتروني"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              dir="rtl"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-white/50" />
            </div>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="كلمة المرور"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-12 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              dir="rtl"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="mr-2">جاري تسجيل الدخول...</span>
              </>
            ) : (
              <span>تسجيل الدخول</span>
            )}
          </button>

          {/* Message */}
          {(message || error) && (
            <div className={`p-4 rounded-xl backdrop-blur-sm transition-all duration-300 ${
              message?.startsWith("✅") 
                ? "bg-green-500/20 border border-green-500/30 text-green-200" 
                : "bg-red-500/20 border border-red-500/30 text-red-200"
            }`}>
              <p className="text-sm text-center font-medium">
                {message || "فشل تسجيل الدخول. يرجى التحقق من بياناتك."}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/50 text-sm">
            نسيت كلمة المرور؟{" "}
            <a href="#" className="text-purple-300 hover:text-purple-200 transition-colors">
              اضغط هنا
            </a>
          </p>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
    </div>
  );
}