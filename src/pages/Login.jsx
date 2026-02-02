import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import SEO from "../components/SEO";
import LoginConfirmModal from "../components/LoginConfirmModal";
import FullPageLoader from "../components/FullPageLoader";

export default function Login() {
    const { login } = useAuth();
    const [loginError, setLoginError] = useState("");
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isFullPageLoading, setIsFullPageLoading] = useState(false);
    const [pendingData, setPendingData] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        setPendingData(data);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmLogin = async () => {
        setIsConfirmModalOpen(false);
        setIsFullPageLoading(true);
        setLoginError("");

        // Artificial delay for high-end transition feel
        await new Promise(resolve => setTimeout(resolve, 2000));

        const success = login(pendingData.username, pendingData.password);
        if (!success) {
            setLoginError("خطأ في اسم المستخدم أو كلمة المرور");
            setIsFullPageLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100" dir="rtl">
            <SEO title="تسجيل الدخول" />
            {isFullPageLoading && <FullPageLoader />}
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-green-100 relative overflow-hidden">
                {/* Decorative Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                <div className="text-center mb-8 relative">
                    <div className="bg-green-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
                        <FaSignInAlt className="text-white text-3xl" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-800 mb-2">تسجيل الدخول</h1>
                    <p className="text-slate-500 font-medium">نظام إدارة صيدلية بيطرية</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 relative">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mr-1">
                            <FaUser className="text-green-600 mb-0.5" /> اسم المستخدم
                        </label>
                        <input
                            type="text"
                            {...register("username", { required: "اسم المستخدم مطلوب" })}
                            className={`w-full px-5 py-4 rounded-2xl border ${errors.username ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all font-medium`}
                            placeholder="اسم المستخدم"
                        />
                        {errors.username && (
                            <span className="text-red-500 text-xs font-bold mr-2">{errors.username.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mr-1">
                            <FaLock className="text-green-600 mb-0.5" /> كلمة المرور
                        </label>
                        <input
                            type="password"
                            {...register("password", { required: "كلمة المرور مطلوبة" })}
                            className={`w-full px-5 py-4 rounded-2xl border ${errors.password ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all font-medium`}
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-xs font-bold mr-2">{errors.password.message}</span>
                        )}
                    </div>

                    {loginError && (
                        <div className="text-red-600 text-sm font-bold text-center bg-red-50 py-3 px-4 rounded-2xl border border-red-100 animate-in fade-in slide-in-from-top-2 duration-300">
                            {loginError}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="mt-2 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-green-100 hover:shadow-green-200 active:scale-95 flex items-center justify-center gap-3"
                    >
                        <span>دخول النظام</span>
                        <FaSignInAlt className="text-xl" />
                    </button>

                    {/* <div className="mt-4 pt-6 border-t border-slate-100 text-center">
                        <p className="text-slate-400 text-xs flex flex-col gap-1">
                            <span>اسم المستخدم الافتراضي: <span className="text-slate-600 font-mono font-bold">admin123@vet.com</span></span>
                            <span>كلمة المرور: <span className="text-slate-600 font-mono font-bold">admin@123</span></span>
                        </p>
                    </div> */}
                </form>
            </div>

            <LoginConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmLogin}
            />
        </div>
    );
}
