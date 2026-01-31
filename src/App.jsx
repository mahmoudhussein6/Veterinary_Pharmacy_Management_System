import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";

export default function App() {
  const { user } = useAuth();

  if (!user) return <Login />;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-arabic" dir="rtl">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-10">
        <Dashboard />
        <Products />
      </div>
    </div>
  );
}
