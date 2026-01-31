import { FaClinicMedical } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { logout } = useAuth();

    return (
        <nav className="bg-green-700 text-white p-4 flex justify-between items-center shadow-lg" dir="rtl">
            <div className="flex items-center gap-3">
                <FaClinicMedical className="text-2xl" />
                <span className="font-bold text-xl">صيدلية بيطرية</span>
            </div>
            <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-bold transition-colors shadow-sm"
            >
                تسجيل الخروج
            </button>
        </nav>
    );
}
