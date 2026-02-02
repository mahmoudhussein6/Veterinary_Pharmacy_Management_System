import React from "react";
import { FaSignInAlt, FaInfoCircle } from "react-icons/fa";

export default function LoginConfirmModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 ease-out border border-green-50">
                <div className="p-8 text-center">
                    {/* Icon */}
                    <div className="mx-auto w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner tracking-tighter">
                        <FaInfoCircle className="text-green-600 text-3xl animate-pulse" />
                    </div>

                    <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">تأكيد الدخول</h3>
                    <p className="text-slate-500 mb-8 font-medium">
                        هل أنت متأكد من رغبتك في الدخول إلى النظام الآن؟
                    </p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={onConfirm}
                            className="w-full py-4 px-6 bg-gradient-to-r from-green-700 to-green-600 text-white font-black rounded-2xl hover:from-green-800 hover:to-green-700 transition-all shadow-lg shadow-green-100 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span>نعم، تسجيل الدخول</span>
                            <FaSignInAlt />
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
                <div className="h-1.5 w-full bg-gradient-to-r from-green-600 to-emerald-500"></div>
            </div>
        </div>
    );
}
