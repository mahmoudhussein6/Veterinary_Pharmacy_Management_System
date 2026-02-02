import { FaEdit, FaTrash, FaSort, FaClipboardList, FaSearch } from "react-icons/fa";
import { useProducts } from "../context/ProductsContext";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

export default function ProductTable({ productsToDisplay, setEditingProduct, sortOrder, toggleSort }) {
    const { deleteProduct } = useProducts();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const products = productsToDisplay;

    const handleEdit = (product) => {
        setEditingProduct(product);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const confirmDelete = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (productToDelete) {
            deleteProduct(productToDelete.id);
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        const date = new Date(dateStr);
        if (isNaN(date)) return dateStr;
        return date.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
    };

    const calculateDaysRemaining = (expiryDate) => {
        if (!expiryDate) return "-";
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const expiry = new Date(expiryDate);
        expiry.setHours(0, 0, 0, 0);

        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="space-y-4">
            {/* Table Header Section */}
            <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-green-100 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2.5 rounded-xl">
                        <FaClipboardList className="text-green-700 text-xl" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">قائمة المنتجات</h2>
                        <p className="text-sm text-slate-500 font-medium">إدارة ومتابعة مخزون الصيدلية</p>
                    </div>
                </div>
                <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <span className="text-slate-500 text-sm font-bold ml-2">إجمالي الأصناف:</span>
                    <span className="text-green-700 font-black text-lg">{products.length}</span>
                </div>
            </div>

            <div className="bg-white shadow-2xl rounded-2xl border border-green-100 overflow-hidden">
                <div className="max-h-[600px] overflow-auto custom-scrollbar">
                    <table className="w-full text-sm text-right rtl border-collapse">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-gradient-to-r from-green-800 to-green-700 text-white shadow-sm font-bold text-base whitespace-nowrap">
                                <th
                                    className="px-6 py-4 cursor-pointer hover:bg-green-600 transition-colors select-none"
                                    onClick={toggleSort}
                                    title={sortOrder === "asc" ? "ترتيب تنازلي" : "ترتيب تصاعدي"}
                                >
                                    <div className="flex items-center gap-2 group">
                                        اسم المنتج
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/10 border border-white/20 text-[11px] font-bold transition-all group-hover:bg-white/20">
                                            <FaSort className="text-green-300/70" />
                                            <span className="font-sans leading-none pb-0.5">
                                                {sortOrder === "asc" ? "أ ← ي" : "ي ← أ"}
                                            </span>
                                        </div>
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-bold text-base whitespace-nowrap">المادة الفعالة</th>
                                <th className="px-6 py-4 font-bold text-base whitespace-nowrap">وصفه</th>
                                <th className="px-6 py-4 font-bold text-base whitespace-nowrap">مغلق</th>
                                <th className="px-6 py-4 font-bold text-base whitespace-nowrap">مفتوح</th>
                                <th className="px-6 py-4 font-bold text-base whitespace-nowrap">الحجم</th>
                                <th className="px-6 py-4 font-bold text-base whitespace-nowrap">سعر المكتب</th>
                                <th className="px-6 py-4 font-bold text-base whitespace-nowrap">سعر الجمهور</th>
                                <th className="px-6 py-4 font-bold text-base whitespace-nowrap">سعر سم / جم</th>
                                <th className="px-6 py-4 font-bold text-base whitespace-nowrap bg-green-900/30">الإجمالي</th>
                                <th className="px-6 py-4 font-bold text-base whitespace-nowrap">تاريخ الانتهاء</th>
                                <th className="px-6 py-4 font-bold text-base whitespace-nowrap">الأيام الباقية</th>
                                <th className="px-6 py-4 font-bold text-base text-center whitespace-nowrap">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="13" className="py-20 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in duration-500">
                                            <div className="bg-slate-50 p-6 rounded-full border border-slate-100 shadow-inner">
                                                <FaSearch className="text-slate-300 text-5xl" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-slate-700 mb-1 leading-relaxed">لا توجد نتائج مطابقة</h3>
                                                <p className="text-slate-400 font-medium leading-relaxed">تأكد من كتابة الاسم بشكل صحيح أو جرب كلمات بحث أخرى</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                products.map((p, index) => {
                                    const daysRemaining = calculateDaysRemaining(p.expiry_date);
                                    const total = (Number(p.stock_closed) || 0) * (Number(p.price_office) || 0);

                                    const isTotalRow = p.name?.includes("إجمالي") || p.name?.toLowerCase().includes("total");

                                    return (
                                        <tr
                                            key={p.id}
                                            className={`group transition-all duration-300 ${isTotalRow
                                                ? 'bg-green-800 text-white font-bold text-lg pointer-events-none'
                                                : daysRemaining !== "-" && daysRemaining < 0
                                                    ? 'bg-red-500/10 hover:bg-red-500/20'
                                                    : index % 2 === 0 ? 'bg-white' : 'bg-green-50/20'
                                                } hover:bg-green-100/40`}
                                        >
                                            <td className={`px-6 py-4 font-semibold ${isTotalRow ? 'text-white' : 'text-gray-800'}`}>{p.name}</td>
                                            <td className={`px-6 py-4 ${isTotalRow ? 'text-white/80' : 'text-gray-600'}`}>{p.active_ingredient || "-"}</td>
                                            <td className={`px-6 py-4 italic ${isTotalRow ? 'text-white/80' : 'text-gray-500'}`}>{p.description || "-"}</td>
                                            <td className={`px-6 py-4 font-medium text-center ${isTotalRow ? 'text-white' : 'text-gray-700'}`}>{p.stock_closed}</td>
                                            <td className={`px-6 py-4 font-medium text-center ${isTotalRow ? 'text-white' : 'text-gray-700'}`}>{p.stock_open || 0}</td>
                                            <td className={`px-6 py-4 ${isTotalRow ? 'text-white/90' : 'text-gray-600'}`}>{p.size}</td>
                                            <td className={`px-6 py-4 font-mono ${isTotalRow ? 'text-white' : 'text-gray-700'}`}>L.E {p.price_office}</td>
                                            <td className={`px-6 py-4 font-mono ${isTotalRow ? 'text-white' : 'text-gray-700'}`}>L.E {p.price_public}</td>
                                            <td className={`px-6 py-4 font-mono ${isTotalRow ? 'text-white' : 'text-gray-700'}`}>L.E {p.price_per_cc || 0}</td>
                                            <td className={`px-6 py-4 font-bold ${isTotalRow ? 'text-white bg-green-900/40' : 'text-indigo-700 bg-indigo-50/50'}`}>L.E {total.toFixed(2)}</td>
                                            <td className={`px-6 py-4 whitespace-nowrap ${isTotalRow ? 'text-white/80' : 'text-gray-600'}`}>{formatDate(p.expiry_date)}</td>
                                            <td className="px-6 py-4">
                                                {!isTotalRow && (
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold shadow-sm ${daysRemaining < 0
                                                        ? 'bg-red-100 text-red-600 border border-red-200'
                                                        : daysRemaining < 30
                                                            ? 'bg-orange-100 text-orange-600 border border-orange-200'
                                                            : 'bg-green-100 text-green-600 border border-green-200'
                                                        }`}>
                                                        {daysRemaining} {daysRemaining !== "-" ? "يوم" : ""}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {!isTotalRow && (
                                                    <div className="flex justify-center gap-3">
                                                        <button
                                                            onClick={() => handleEdit(p)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors shadow-sm bg-white border border-blue-100"
                                                            title="تعديل"
                                                        >
                                                            <FaEdit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => confirmDelete(p)}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors shadow-sm bg-white border border-red-100"
                                                            title="حذف"
                                                        >
                                                            <FaTrash size={18} />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                            {products.length > 0 && (
                                <tr className="bg-indigo-700 text-white font-bold text-lg">
                                    <td colSpan="9" className="px-6 py-4 text-left">إجمالي قيمة المخزن (مغلق):</td>
                                    <td className="px-6 py-4 font-bold bg-indigo-800">
                                        L.E {products.reduce((acc, p) => acc + ((Number(p.stock_closed) || 0) * (Number(p.price_office) || 0)), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td colSpan="3" className="bg-indigo-700"></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    productName={productToDelete?.name}
                />
            </div>
        </div>
    );
}
