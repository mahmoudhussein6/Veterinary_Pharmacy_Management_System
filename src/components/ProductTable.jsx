import { FaEdit, FaTrash } from "react-icons/fa";
import { useProducts } from "../context/ProductsContext";

export default function ProductTable({ productsToDisplay, setEditingProduct }) {
    const { deleteProduct } = useProducts();
    const products = productsToDisplay;

    const handleEdit = (product) => {
        setEditingProduct(product);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="bg-white shadow-2xl rounded-2xl border border-green-100 overflow-hidden">
            <div className="max-h-[600px] overflow-auto custom-scrollbar">
                <table className="w-full text-sm text-right rtl border-collapse">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-gradient-to-r from-green-800 to-green-700 text-white shadow-sm">
                            <th className="px-6 py-4 font-bold text-base whitespace-nowrap">اسم المنتج</th>
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
                        {products.map((p, index) => {
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
                                    <td className={`px-6 py-4 font-medium text-center ${isTotalRow ? 'text-white' : 'text-gray-700'}`}>{p.stock_open}</td>
                                    <td className={`px-6 py-4 ${isTotalRow ? 'text-white/90' : 'text-gray-600'}`}>{p.size}</td>
                                    <td className={`px-6 py-4 font-mono ${isTotalRow ? 'text-white' : 'text-gray-700'}`}>L.E {p.price_office}</td>
                                    <td className={`px-6 py-4 font-mono ${isTotalRow ? 'text-white' : 'text-gray-700'}`}>L.E {p.price_public}</td>
                                    <td className={`px-6 py-4 font-mono ${isTotalRow ? 'text-white' : 'text-gray-700'}`}>L.E {p.price_per_cc}</td>
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
                                            <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button
                                                    onClick={() => handleEdit(p)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors shadow-sm bg-white border border-blue-100"
                                                    title="تعديل"
                                                >
                                                    <FaEdit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => deleteProduct(p.id)}
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
                        })}
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
        </div>
    );
}
