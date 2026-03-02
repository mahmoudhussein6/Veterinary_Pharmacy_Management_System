import { FaExclamationTriangle, FaFileUpload } from "react-icons/fa";

export default function ExcelImportModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with Blur */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 ease-out border border-slate-100">
                <div className="p-8 text-center">
                    {/* Icon Header */}
                    <div className="mx-auto w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-inner">
                        <FaFileUpload className="text-indigo-600 text-4xl" />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-800 mb-3">تأكيد الاستيراد</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        هل أنت متأكد من استيراد ملف الـ Excel؟
                        <span className="block font-bold text-amber-600 mt-2 text-lg">سيتم مسح جميع البيانات الحالية واستبدالها بالبيانات الجديدة من الملف.</span>
                        <span className="text-sm text-slate-400 mt-2 block italic text-right">** لا يمكن التراجع عن هذا الإجراء</span>
                    </p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold rounded-2xl hover:from-indigo-700 hover:to-blue-600 transition-all shadow-lg shadow-indigo-200 active:scale-95"
                        >
                            تأكيد الاستبدال والاستيراد
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-4 px-6 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
                        >
                            إلغاء
                        </button>
                    </div>
                </div>

                {/* Decorative Bottom Bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-blue-400"></div>
            </div>
        </div>
    );
}
