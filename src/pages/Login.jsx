import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

export default function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(username, password);
        if (!success) {
            setError("خطأ في اسم المستخدم أو كلمة المرور");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100" dir="rtl">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-8 border-green-700">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-green-900 mb-2">تسجيل الدخول</h1>
                    <p className="text-green-600">نظام إدارة صيدلية بيطرية</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <FaUser className="text-green-600" /> اسم المستخدم
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                            placeholder="username"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <FaLock className="text-green-600" /> كلمة المرور
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm font-bold text-center bg-red-50 py-2 rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="mt-4 bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-green-200 flex items-center justify-center gap-2"
                    >
                        <FaSignInAlt /> دخول النظام
                    </button>

                    <p className="text-center text-gray-400 text-xs mt-4">
                        اسم المستخدم الافتراضي: <span className="text-gray-600 font-mono">admin</span> | كلمة المرور: <span className="text-gray-600 font-mono">123</span>
                    </p>
                </form>
            </div>
        </div>
    );
}
