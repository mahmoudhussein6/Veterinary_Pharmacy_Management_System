import { useState, useRef } from "react";
import { FaFileUpload } from "react-icons/fa";
import { readExcelFile } from "../utils/excelParser";
import { useProducts } from "../context/ProductsContext";
import ExcelImportModal from "./ExcelImportModal";
import SuccessModal from "./SuccessModal";

export default function ExcelUploader() {
    const { setProducts } = useProducts();
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files?.[0]) {
            setIsImportModalOpen(true);
        }
    };

    const handleConfirmImport = async () => {
        const file = fileInputRef.current?.files[0];
        if (!file) return;

        try {
            const data = await readExcelFile(file);
            if (data && data.length > 0) {
                setProducts(data);
                setSuccessMessage(`تم استيراد ${data.length} منتج بنجاح!`);
                setIsSuccessModalOpen(true);
            } else {
                alert("لم يتم العثور على بيانات صالحة في الملف. يرجى التأكد من أسماء الأعمدة.");
            }
        } catch (error) {
            console.error("Excel import error:", error);
            alert("حدث خطأ أثناء قراءة الملف. يرجى التأكد من أنه ملف Excel صالح.");
        }

        if (fileInputRef.current) fileInputRef.current.value = '';
        setIsImportModalOpen(false);
    };

    const handleCancel = () => {
        if (fileInputRef.current) fileInputRef.current.value = '';
        setIsImportModalOpen(false);
    };

    return (
        <div className="flex items-center gap-2">
            <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-all shadow-md flex items-center gap-2 active:scale-95 group">
                <FaFileUpload className="text-lg group-hover:bounce" />
                <span>استيراد من Excel</span>
                <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                    accept=".xlsx, .xls"
                />
            </label>

            <ExcelImportModal
                isOpen={isImportModalOpen}
                onClose={handleCancel}
                onConfirm={handleConfirmImport}
            />

            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                message={successMessage}
            />
        </div>
    );
}
