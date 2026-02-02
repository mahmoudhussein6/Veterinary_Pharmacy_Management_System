import { FaClinicMedical, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import LogoutConfirmModal from "./LogoutConfirmModal";

export default function Navbar() {
    const { logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-green-800 to-green-700 text-white p-4 flex justify-between items-center shadow-lg border-b border-white/10" dir="rtl">
            <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
                    <FaClinicMedical className="text-2xl" />
                </div>
                <div>
                    <span className="font-black text-xl tracking-tight block">صيدلية الطبيب البيطري</span>
                    <span className="text-[10px] text-green-200 font-bold tracking-widest uppercase">نظام الإدارة</span>
                </div>
            </div>

            <button
                onClick={() => setIsModalOpen(true)}
                className="group bg-white/10 hover:bg-rose-500 px-5 py-2.5 rounded-xl text-sm font-black transition-all duration-300 shadow-sm flex items-center gap-2 border border-white/10 hover:border-rose-400"
            >
                <span>تسجيل الخروج</span>
                <FaSignOutAlt className="text-lg group-hover:translate-x-1 transition-transform" />
            </button>

            <LogoutConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={logout}
            />
        </nav>
    );
}
