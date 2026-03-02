import { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(
        JSON.parse(localStorage.getItem("products")) || []
    );

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    const addProduct = (productData) =>
        setProducts([...products, { ...productData, id: Date.now() + Math.random() }]);

    const updateProduct = (id, updatedProduct) =>
        setProducts(products.map((p) => (p.id === id ? { ...updatedProduct, id } : p)));

    const deleteProduct = (id) =>
        setProducts(products.filter((p) => p.id !== id));

    const clearAllProducts = () =>
        setProducts([]);

    return (
        <ProductsContext.Provider
            value={{ products, setProducts, addProduct, updateProduct, deleteProduct, clearAllProducts }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => useContext(ProductsContext);
