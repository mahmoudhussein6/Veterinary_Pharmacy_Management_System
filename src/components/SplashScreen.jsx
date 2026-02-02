import { FaClinicMedical } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(onFinish, 800); // Wait for fade-out animation
        }, 2200);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-green-800 via-green-700 to-emerald-900 transition-all duration-1000 ${fadeOut ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'}`}>
            {/* Background Decorative Circles */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>

            <div className="relative flex flex-col items-center gap-8 text-center px-4">
                {/* Logo Animation */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-ping group-hover:scale-125 transition-transform"></div>
                    <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-[40px] border border-white/20 shadow-2xl animate-in zoom-in-50 duration-700">
                        <FaClinicMedical className="text-white text-7xl md:text-8xl animate-pulse" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4 animate-in slide-in-from-bottom-10 duration-1000 delay-300 fill-mode-both">
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-lg">
                        صيدلية الطبيب البيطري
                    </h1>
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-green-100/80 text-lg md:text-xl font-medium tracking-wide">
                            نظام إدارة العيادة والصيدلية المتكامل
                        </span>

                        {/* Modern Loading Bar */}
                        <div className="w-48 md:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5 mt-4">
                            <div className="h-full bg-gradient-to-r from-green-300 via-emerald-200 to-green-300 w-full animate-progress-glow"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Version Note */}
            <div className="absolute bottom-10 text-white/40 text-sm font-light tracking-widest uppercase">
                Veterinary Pharmacy v2.0
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes progress-glow {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-progress-glow {
                    animation: progress-glow 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
            `}} />
        </div>
    );
}
