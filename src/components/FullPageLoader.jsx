import React from "react";
import { FaCircleNotch, FaClinicMedical } from "react-icons/fa";

export default function FullPageLoader({ message = "جاري الدخول إلى النظام..." }) {
    return (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md animate-in fade-in duration-500">
            <div className="relative flex flex-col items-center">
                {/* Outer spin circle */}
                <div className="w-24 h-24 border-4 border-green-100 border-t-green-600 rounded-full animate-spin"></div>

                {/* Static Icon in Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <FaClinicMedical className="text-green-600 text-3xl animate-pulse" />
                </div>
            </div>

            <div className="mt-8 text-center">
                <h2 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">{message}</h2>
                <div className="flex gap-1 justify-center">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
}
