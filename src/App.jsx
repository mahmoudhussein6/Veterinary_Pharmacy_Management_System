import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import Footer from "./components/Footer";
import { HelmetProvider } from "react-helmet-async";

export default function App() {
  const { user } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <HelmetProvider>
      {!user ? (
        <Login />
      ) : (
        <div className="min-h-screen bg-[#f8fafc] font-arabic flex flex-col" dir="rtl">
          <Navbar />
          <div className="flex-grow max-w-7xl mx-auto p-4 md:p-8 space-y-10 w-full">
            <Dashboard />
            <Products />
          </div>
          <Footer />
        </div>
      )}
    </HelmetProvider>
  );
}
