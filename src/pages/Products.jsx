import { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import ExcelExporter from "../components/ExcelExporter";
import ExcelUploader from "../components/ExcelUploader";
import SearchBar from "../components/SearchBar";
import { useProducts } from "../context/ProductsContext";
import SEO from "../components/SEO";
import { FaTrashAlt } from "react-icons/fa";
import DeleteAllModal from "../components/DeleteAllModal";

export default function Products() {
    const { products, clearAllProducts } = useProducts();
    const [search, setSearch] = useState("");
    const [editingProduct, setEditingProduct] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);

    const isArabic = (text) => {
        if (!text) return false;
        const firstChar = text.trim()[0];
        return /[\u0600-\u06FF]/.test(firstChar);
    };

    const filteredProducts = products
        .filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
        )
        .sort((a, b) => {
            const aIsAr = isArabic(a.name);
            const bIsAr = isArabic(b.name);

            // Grouping: Arabic always before English in ASC
            if (aIsAr && !bIsAr) return sortOrder === "asc" ? -1 : 1;
            if (!aIsAr && bIsAr) return sortOrder === "asc" ? 1 : -1;

            // Same group: Alphabetical sort using Arabic collation
            const result = a.name.localeCompare(b.name, 'ar', { numeric: true, sensitivity: 'accent' });
            return sortOrder === "asc" ? result : -result;
        });

    const toggleSort = () => {
        setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    };

    return (
        <div className="space-y-6">
            <SEO title="إدارة المنتجات" />
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-green-100">
                <div className="flex flex-wrap gap-3">
                    <ExcelExporter />
                    <ExcelUploader />
                    {products.length > 0 && (
                        <button
                            onClick={() => setIsDeleteAllOpen(true)}
                            className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-bold py-2 px-4 rounded-lg transition-all border border-red-100 flex items-center gap-2 active:scale-95 group"
                            title="مسح كافة البيانات"
                        >
                            <FaTrashAlt className="group-hover:animate-bounce" />
                            <span>مسح الكل</span>
                        </button>
                    )}
                </div>
                <div className="w-full md:w-1/2">
                    <SearchBar setSearch={setSearch} />
                </div>
            </div>

            <ProductForm
                editingProduct={editingProduct}
                clearEdit={() => setEditingProduct(null)}
            />

            <ProductTable
                productsToDisplay={filteredProducts}
                setEditingProduct={setEditingProduct}
                sortOrder={sortOrder}
                toggleSort={toggleSort}
            />

            <DeleteAllModal
                isOpen={isDeleteAllOpen}
                onClose={() => setIsDeleteAllOpen(false)}
                onConfirm={clearAllProducts}
            />
        </div>
    );
}
