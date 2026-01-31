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
                price_per_cc: row["سعر سم"] || 0,
                expiry_date: row["تاريخ الانتهاء"] || ""
            }));

            resolve(mappedData);
        };
        reader.readAsBinaryString(file);
    });
};

export const exportToExcel = (products) => {
    const dataToExport = products.map(p => ({
        "اسم المنتج": p.name,
        "المادة الفعالة": p.active_ingredient,
        "وصفه": p.description,
        "مغلق": p.stock_closed,
        "مفتوح": p.stock_open,
        "الحجم": p.size,
        "سعر المكتب": p.price_office,
        "سعر الجمهور": p.price_public,
        "سعر سم": p.price_per_cc,
        "تاريخ الانتهاء": p.expiry_date
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Apply a filename with current date
    const date = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `pharmacy_inventory_${date}.xlsx`);
};
