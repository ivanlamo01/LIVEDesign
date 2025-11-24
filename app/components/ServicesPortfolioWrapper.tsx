"use client";

import ServicesBackground from "./ServicesBackground";

interface ServicesPortfolioWrapperProps {
    children: React.ReactNode;
}

export default function ServicesPortfolioWrapper({ children }: ServicesPortfolioWrapperProps) {
    return (
        <div className="relative bg-slate-950 overflow-hidden">
            <ServicesBackground />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
