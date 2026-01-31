import { FaSearch } from "react-icons/fa";

export default function SearchBar({ setSearch }) {
    return (
        <div className="relative">
            <span className="absolute inset-y-0 left-0 ml-2 flex items-center pr-3 pointer-events-none text-green-600">
                <FaSearch />
            </span>
            <input
                placeholder="بحث عن منتج..."
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pr-12 pl-4 py-2 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-right"
            />
        </div>
    );
}
