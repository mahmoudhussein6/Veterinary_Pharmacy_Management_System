import * as XLSX from "xlsx";

export const readExcelFile = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const workbook = XLSX.read(e.target.result, { type: "binary" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rawData = XLSX.utils.sheet_to_json(sheet);

            const mappedData = rawData.map(row => ({
                id: Date.now() + Math.random(),
                name: row["اسم المنتج"] || "",
                active_ingredient: row["المادة الفعالة"] || "",
                description: row["وصفه"] || "",
                stock_closed: row["مغلق"] || 0,
                stock_open: row["مفتوح"] || 0,
                size: row["الحجم"] || "",
                price_office: row["سعر المكتب"] || 0,
                price_public: row["سعر الجمهور"] || 0,
                price_per_cc: row["سعر سم / جم"] || row["سعر سم"] || 0,
                expiry_date: row["تاريخ الانتهاء"] || ""
            }));

            resolve(mappedData);
        };
        reader.readAsBinaryString(file);
    });
};

export const exportToExcel = (products) => {
    const calculateDaysRemaining = (expiryDate) => {
        if (!expiryDate) return "-";
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const expiry = new Date(expiryDate);
        expiry.setHours(0, 0, 0, 0);
        const diffTime = expiry - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const isArabic = (text) => {
        if (!text) return false;
        const firstChar = text.trim()[0];
        return /[\u0600-\u06FF]/.test(firstChar);
    };

    const sortedProducts = [...products].sort((a, b) => {
        const aIsAr = isArabic(a.name);
        const bIsAr = isArabic(b.name);

        // Arabic first, then English
        if (aIsAr && !bIsAr) return -1;
        if (!aIsAr && bIsAr) return 1;

        return a.name.localeCompare(b.name, 'ar', { numeric: true, sensitivity: 'accent' });
    });

    const dataToExport = sortedProducts.map(p => ({
        "اسم المنتج": p.name,
        "المادة الفعالة": p.active_ingredient,
        "وصفه": p.description,
        "مغلق": p.stock_closed,
        "مفتوح": p.stock_open || 0,
        "الحجم": p.size,
        "سعر المكتب": p.price_office,
        "سعر الجمهور": p.price_public,
        "سعر سم / جم": p.price_per_cc || 0,
        "الإجمالي": (Number(p.stock_closed) || 0) * (Number(p.price_office) || 0),
        "تاريخ الانتهاء": p.expiry_date,
        "الأيام المتبقية": calculateDaysRemaining(p.expiry_date)
    }));

    // Add Grand Total row
    const grandTotal = products.reduce((acc, p) => acc + ((Number(p.stock_closed) || 0) * (Number(p.price_office) || 0)), 0);
    dataToExport.push({
        "اسم المنتج": "إجمالي قيمة المخزن (مغلق)",
        "الإجمالي": grandTotal
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    const date = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `pharmacy_inventory_${date}.xlsx`);
};
