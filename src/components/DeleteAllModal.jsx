import { FaTrashAlt, FaExclamationCircle } from "react-icons/fa";

export default function DeleteAllModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            {/* Backdrop with Blur */}
            <div
                className="absolute inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 ease-out border border-red-100">
                <div className="p-8 text-center">
                    {/* Icon Header */}
                    <div className="mx-auto w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-inner border border-red-100">
                        <FaTrashAlt className="text-red-600 text-5xl" />
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-3">
                        <FaExclamationCircle className="text-red-500" />
                        <h3 className="text-2xl font-black text-slate-800">حذر شديد!</h3>
                    </div>

                    <p className="text-slate-600 mb-8 leading-relaxed font-bold">
                        أنت على وشك <span className="text-red-600 underline">حذف كلي لجميع المنتجات</span> من السجل. آيا أنت متأكد تماماً؟
                        <span className="text-xs text-slate-400 mt-4 block p-3 bg-slate-50 rounded-xl border border-slate-100 italic">
                            * هذا الإجراء سيقوم بتفريغ المخزن بالكامل ولا يمكن التراجع عنه أبداً.
                        </span>
                    </p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-rose-500 text-white font-black rounded-2xl hover:from-red-700 hover:to-rose-600 transition-all shadow-xl shadow-red-200 active:scale-95"
                        >
                            نعم، احذف كل شيء
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-4 px-6 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
                        >
                            تراجع (إغلاق)
                        </button>
                    </div>
                </div>

                {/* Decorative Bottom Bar */}
                <div className="h-2 w-full bg-gradient-to-r from-red-600 via-rose-500 to-red-600"></div>
            </div>
        </div>
    );
}
