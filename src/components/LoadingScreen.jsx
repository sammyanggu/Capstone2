import React from 'react';

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-[999]">
            <div className="flex flex-col items-center gap-6">
                {/* Animated circle spinner */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
                    <div 
                        className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 border-r-emerald-500 animate-spin"
                    ></div>
                </div>
                
                {/* Loading text */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Loading...</h2>
                    <p className="text-slate-400">Getting everything ready for you</p>
                </div>
            </div>
            
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>
        </div>
    );
}
