import React from "react";
import { FaHeart, FaCode } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-8 mt-12 bg-white/40 backdrop-blur-md border-t border-green-100/50">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Left Side: Copyright */}
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <div className="flex items-center gap-2 text-slate-800 font-bold mb-1">
                            
                            <span>نظام الصيدلية</span>
                            <span className="text-green-600">البيطرية</span>
                        </div>
                        <p className="text-slate-500 text-sm">
                            &copy; {currentYear} جميع الحقوق محفوظة
                        </p>
                    </div>

                    {/* Right Side: Made By with Heart */}
                    <div className="group flex flex-col items-center md:items-end gap-2">
                        <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-2xl border border-green-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                            <FaCode className="text-indigo-500 text-sm" />
                            <span className="text-slate-600 text-sm md:text-base font-medium">
                                تم التطوير بكل
                                <FaHeart className="inline mx-1.5 text-red-500 animate-pulse" />
                                بواسطة  
                                <span className="font-bold text-slate-900 ml-1">  محمود حسين </span>
                            </span>
                        </div>
                        <span className="text-[10px] text-slate-400 tracking-widest uppercase font-light">
                            Crafted for Excellence
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
