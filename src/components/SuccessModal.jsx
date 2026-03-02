import { FaCheckCircle } from "react-icons/fa";

export default function SuccessModal({ isOpen, onClose, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop with Blur */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 ease-out border border-green-100">
                <div className="p-8 text-center">
                    {/* Icon Header */}
                    <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <FaCheckCircle className="text-green-500 text-5xl animate-bounce" />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-800 mb-3">تمت العملية بنجاح</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                        {message}
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-2xl hover:from-green-700 hover:to-emerald-600 transition-all shadow-lg shadow-green-200 active:scale-95"
                    >
                        موافق
                    </button>
                </div>

                {/* Decorative Bottom Bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-green-500 to-emerald-400"></div>
            </div>
        </div>
    );
}
