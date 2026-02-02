import { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import ExcelExporter from "../components/ExcelExporter";
import SearchBar from "../components/SearchBar";
import { useProducts } from "../context/ProductsContext";
import SEO from "../components/SEO";

export default function Products() {
    const { products } = useProducts();
    const [search, setSearch] = useState("");
    const [editingProduct, setEditingProduct] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

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
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-2">

                    <ExcelExporter />
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
        </div>
    );
}
