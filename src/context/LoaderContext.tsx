"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoaderContextType {
    isLoading: boolean;
    showLoader: () => void;
    hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
    const [loadingCount, setLoadingCount] = useState(0);

    const showLoader = () => setLoadingCount((prev) => prev + 1);
    const hideLoader = () => setLoadingCount((prev) => Math.max(0, prev - 1));

    const isLoading = loadingCount > 0;

    return (
        <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
            {children}
            {isLoading && <GlobalLoader />}
        </LoaderContext.Provider>
    );
}

export function useLoader() {
    const context = useContext(LoaderContext);
    if (context === undefined) {
        throw new Error('useLoader must be used within a LoaderProvider');
    }
    return context;
}

function GlobalLoader() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/30 backdrop-blur-sm transition-all duration-300">
            <div className="relative">
                {/* Outer Ring */}
                <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
                {/* Inner Rotating Ring */}
                <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-transparent border-t-brand-600 animate-spin"></div>
            </div>
        </div>
    );
}
