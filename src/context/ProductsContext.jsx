import { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(
        JSON.parse(localStorage.getItem("products")) || []
    );

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    const addProduct = (product) =>
        setProducts([...products, product]);

    const updateProduct = (id, updatedProduct) =>
        setProducts(products.map((p) => (p.id === id ? { ...updatedProduct, id } : p)));

    const deleteProduct = (id) =>
        setProducts(products.filter((p) => p.id !== id));

    return (
        <ProductsContext.Provider
            value={{ products, setProducts, addProduct, updateProduct, deleteProduct }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => useContext(ProductsContext);
