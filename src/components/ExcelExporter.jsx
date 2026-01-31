import { FaFileDownload } from "react-icons/fa";
import { exportToExcel } from "../utils/excelParser";
import { useProducts } from "../context/ProductsContext";

export default function ExcelExporter() {
    const { products } = useProducts();

    return (
        <button
            onClick={() => exportToExcel(products)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow flex items-center gap-2"
        >
            <FaFileDownload /> حفظ كـ Excel
        </button>
    );
}
