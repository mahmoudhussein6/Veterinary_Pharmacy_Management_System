import { FaBoxes, FaCalendarTimes, FaMoneyBillWave } from "react-icons/fa";
import { useProducts } from "../context/ProductsContext";

export default function Dashboard() {
    const { products } = useProducts();

    const expired = products.filter(
        (p) => p.expiry_date && new Date(p.expiry_date) < new Date()
    );

    const totalValue = products.reduce((acc, p) => {
        const qty = (Number(p.stock_closed) || 0) + (Number(p.stock_open) || 0);
        return acc + (qty * (Number(p.price_office) || 0));
    }, 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-green-600 flex justify-between items-center">
                <div>
                    <h3 className="text-gray-500 text-sm font-bold uppercase">إجمالي المنتجات</h3>
                    <p className="text-3xl font-bold text-gray-800">{products.length}</p>
                </div>
                <FaBoxes className="text-4xl text-green-200" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-red-600 flex justify-between items-center">
                <div>
                    <h3 className="text-gray-500 text-sm font-bold uppercase">منتهية الصلاحية</h3>
                    <p className="text-3xl font-bold text-red-600">{expired.length}</p>
                </div>
                <FaCalendarTimes className="text-4xl text-red-200" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-blue-600 flex justify-between items-center">
                <div>
                    <h3 className="text-gray-500 text-sm font-bold uppercase">قيمة المخزون</h3>
                    <p className="text-3xl font-bold text-blue-600">{totalValue.toFixed(2)}</p>
                </div>
                <FaMoneyBillWave className="text-4xl text-blue-200" />
            </div>
        </div>
    );
}
