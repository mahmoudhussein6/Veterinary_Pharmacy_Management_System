import { FaPlus, FaSave, FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProducts } from "../context/ProductsContext";


export default function ProductForm({ editingProduct, clearEdit }) {
    const { addProduct, updateProduct } = useProducts();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (editingProduct) {
            Object.keys(editingProduct).forEach((key) => {
                setValue(key, editingProduct[key]);
            });
        } else {
            reset({
                name: "",
                description: "",
                size: "",
                stock_closed: "",
                stock_open: "",
                price_office: "",
                price_public: "",
                price_per_cc: "",
                expiry_date: "",
                active_ingredient: ""
            });
        }
    }, [editingProduct, setValue, reset]);

    const onSubmit = (data) => {
        if (editingProduct) {
            updateProduct(editingProduct.id, data);
            clearEdit();
        } else {
            addProduct({ ...data, id: Date.now() });
        }
        reset();
    };

    const PREDEFINED_DESCRIPTIONS = [
        "إضافات",
        "املاح معدنية",
        "تجريعات حقن",
        "خافض حرارة",
        "خماير",
        "رافع مناعة",
        "شرب مضاد حيوي",
        "غسول كلوي",
        "فيتامينات حقن",
        "مضاد اجهاد حراري",
        "مضاد حيوي حقن",
        "مضاد حيوي شرب",
        "مضاد فيروسي",
        "مضاد كلوستريديا",
        "مضاد كوكسيديا",
        "منشط كبد",
        "موسع شعب",
        "هـ سيلينيوم"
    ].sort((a, b) => a.localeCompare(b, 'ar'));

    const PREDEFINED_SIZES = [
        "100 جم",
        "100 سم",
        "150 سم",
        "2 جم",
        "20 سم",
        "200 جم",
        "50 سم",
        "كيلو",
        "لتر",
        "نص كيلو",
        "نص لتر"
    ].sort((a, b) => a.localeCompare(b, 'ar'));

    const ErrorMsg = ({ name }) => errors[name] ? (
        <span className="text-red-500 text-[10px] font-bold mt-1 bg-red-50 px-2 py-0.5 rounded border border-red-100">{errors[name].message}</span>
    ) : null;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 rounded-lg shadow-lg border-2 transition-all ${editingProduct ? 'bg-blue-50 border-blue-200' : 'bg-white border-green-100'}`}
        >
            <div className="flex flex-col gap-1">
                <label className={`text-sm font-semibold ${editingProduct ? 'text-blue-800' : 'text-green-800'}`}>اسم المنتج</label>
                <input {...register("name", { required: "مطلوب" })} placeholder="اسم المنتج" className={errors.name ? 'border-red-300 ring-1 ring-red-100' : ''} />
                <ErrorMsg name="name" />
            </div>

            <div className="flex flex-col gap-1">
                <label className={`text-sm font-semibold ${editingProduct ? 'text-blue-800' : 'text-green-800'}`}>المادة الفعالة</label>
                <input {...register("active_ingredient", { required: "مطلوب" })} placeholder="المادة الفعالة" className={errors.active_ingredient ? 'border-red-300 ring-1 ring-red-100' : ''} />
                <ErrorMsg name="active_ingredient" />
            </div>

            <div className="flex flex-col gap-1">
                <label className={`text-sm font-semibold ${editingProduct ? 'text-blue-800' : 'text-green-800'}`}>وصفه</label>
                <input {...register("description", { required: "مطلوب" })} placeholder="وصفه" list="description-suggestions" className={errors.description ? 'border-red-300 ring-1 ring-red-100' : ''} />
                <datalist id="description-suggestions">
                    {PREDEFINED_DESCRIPTIONS.map((desc, index) => (
                        <option key={index} value={desc} />
                    ))}
                </datalist>
                <ErrorMsg name="description" />
            </div>

            <div className="flex flex-col gap-1">
                <label className={`text-sm font-semibold ${editingProduct ? 'text-blue-800' : 'text-green-800'}`}>الحجم</label>
                <input {...register("size", { required: "مطلوب" })} placeholder="الحجم" list="size-suggestions" className={errors.size ? 'border-red-300 ring-1 ring-red-100' : ''} />
                <datalist id="size-suggestions">
                    {PREDEFINED_SIZES.map((size, index) => (
                        <option key={index} value={size} />
                    ))}
                </datalist>
                <ErrorMsg name="size" />
            </div>

            <div className="flex flex-col gap-1">
                <label className={`text-sm font-semibold ${editingProduct ? 'text-blue-800' : 'text-green-800'}`}>مغلق (كمية)</label>
                <input {...register("stock_closed", { required: "مطلوب", min: { value: 0.1, message: "أكبر من 0" } })} type="number" step="0.1" placeholder="مغلق" className={errors.stock_closed ? 'border-red-300 ring-1 ring-red-100' : ''} />
                <ErrorMsg name="stock_closed" />
            </div>

            <div className="flex flex-col gap-1">
                <label className={`text-sm font-semibold ${editingProduct ? 'text-blue-800' : 'text-green-800'}`}>مفتوح (كمية)</label>
                <input {...register("stock_open", { min: { value: 0, message: "أكبر من أو يساوي 0" } })} type="number" step="0.1" placeholder="مفتوح (اختياري)" className={errors.stock_open ? 'border-red-300 ring-1 ring-red-100' : ''} />
                <ErrorMsg name="stock_open" />
            </div>

            <div className="flex flex-col gap-1">
                <label className={`text-sm font-semibold ${editingProduct ? 'text-blue-800' : 'text-green-800'}`}>سعر المكتب</label>
                <input {...register("price_office", { required: "مطلوب", min: { value: 0.01, message: "أكبر من 0" } })} type="number" step="0.01" placeholder="سعر المكتب" className={errors.price_office ? 'border-red-300 ring-1 ring-red-100' : ''} />
                <ErrorMsg name="price_office" />
            </div>

            <div className="flex flex-col gap-1">
                <label className={`text-sm font-semibold ${editingProduct ? 'text-blue-800' : 'text-green-800'}`}>سعر الجمهور</label>
                <input {...register("price_public", { required: "مطلوب", min: { value: 0.01, message: "أكبر من 0" } })} type="number" step="0.01" placeholder="سعر الجمهور" className={errors.price_public ? 'border-red-300 ring-1 ring-red-100' : ''} />
                <ErrorMsg name="price_public" />
            </div>

            <div className="flex flex-col gap-1">
                <label className={`text-sm font-semibold ${editingProduct ? 'text-blue-800' : 'text-green-800'}`}>سعر سم / جم</label>
                <input {...register("price_per_cc", { min: { value: 0.01, message: "أكبر من 0" } })} type="number" step="0.01" placeholder="سعر سم / جم (اختياري)" className={errors.price_per_cc ? 'border-red-300 ring-1 ring-red-100' : ''} />
                <ErrorMsg name="price_per_cc" />
            </div>

            <div className="flex flex-col gap-1">
                <label className={`text-sm font-semibold ${editingProduct ? 'text-blue-800' : 'text-green-800'}`}>تاريخ الانتهاء</label>
                <input {...register("expiry_date", { required: "مطلوب" })} type="date" className={errors.expiry_date ? 'border-red-300 ring-1 ring-red-100' : ''} />
                <ErrorMsg name="expiry_date" />
            </div>

            <div className="md:col-span-2 lg:col-span-3 flex gap-4 mt-2">
                <button
                    type="submit"
                    className={`flex-1 font-bold py-3 px-6 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 ${editingProduct ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-green-700 hover:bg-green-800 text-white'}`}
                >
                    {editingProduct ? <><FaSave /> تعديل المنتج</> : <><FaPlus /> إضافة منتج جديد</>}
                </button>
                {editingProduct && (
                    <button
                        type="button"
                        onClick={clearEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                        <FaTimes /> إلغاء
                    </button>
                )}
            </div>
        </form>
    );
}
