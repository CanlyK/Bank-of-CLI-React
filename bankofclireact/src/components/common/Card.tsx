import type { ReactNode } from "react";

interface CardProps {
    className?: string;
    children: ReactNode;
}

export default function Card({ className = "", children }: CardProps) {
    return (
        <div className={`${className} rounded-card bg-white shadow-card`}>
            {children}
        </div>
    );
}
