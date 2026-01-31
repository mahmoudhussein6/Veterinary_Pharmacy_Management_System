import { FaFileUpload } from "react-icons/fa";
import { readExcelFile } from "../utils/excelParser";
import { useProducts } from "../context/ProductsContext";

export default function ExcelUploader() {
    const { setProducts } = useProducts();

    const handleUpload = async (e) => {
        const data = await readExcelFile(e.target.files[0]);
        setProducts(data);
    };

    return (
        <div className="flex items-center gap-2">
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow flex items-center gap-2">
                <FaFileUpload /> رفع ملف Excel
                <input type="file" onChange={handleUpload} className="hidden" accept=".xlsx, .xls" />
            </label>
        </div>
    );
}
