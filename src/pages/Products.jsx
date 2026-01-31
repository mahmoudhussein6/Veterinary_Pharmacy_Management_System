import { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import ExcelUploader from "../components/ExcelUploader";
import ExcelExporter from "../components/ExcelExporter";
import SearchBar from "../components/SearchBar";
import { useProducts } from "../context/ProductsContext";

export default function Products() {
    const { products } = useProducts();
    const [search, setSearch] = useState("");
    const [editingProduct, setEditingProduct] = useState(null);

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-2">
                    <ExcelUploader />
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
            />
        </div>
    );
}
