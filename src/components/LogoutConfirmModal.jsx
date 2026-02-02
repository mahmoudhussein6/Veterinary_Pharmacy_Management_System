import React from "react";
import { FaSignOutAlt, FaExclamationCircle } from "react-icons/fa";

export default function LogoutConfirmModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 ease-out border border-slate-100">
                <div className="p-8 text-center">
                    {/* Icon */}
                    <div className="mx-auto w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <FaExclamationCircle className="text-rose-500 text-4xl animate-pulse" />
                    </div>

                    <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">تأكيد الخروج</h3>
                    <p className="text-slate-500 mb-8 font-medium leading-relaxed">
                        هل أنت متأكد من رغبتك في تسجيل الخروج من النظام الآن؟
                    </p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={onConfirm}
                            className="w-full py-4 px-6 bg-gradient-to-r from-rose-600 to-red-500 text-white font-black rounded-2xl hover:from-rose-700 hover:to-red-600 transition-all shadow-lg shadow-rose-100 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span>نعم، تسجيل الخروج</span>
                            <FaSignOutAlt />
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-4 px-6 bg-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
                        >
                            إلغاء
                        </button>
                    </div>
                </div>

                {/* Decorative Accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 to-red-400"></div>
            </div>
        </div>
    );
}
