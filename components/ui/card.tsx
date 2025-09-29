import React from "react"

interface CardProps {
    children: React.ReactNode;
    className?: string;
}


const Card = ({ children, className }: CardProps) => (
    <div className={`rounded-xl shadow-xl bg-white ${className}`}>
        {children}
    </div>
)

const CardHeader = ({ children, className }: CardProps) => (
    <div className={`p-6 flex flex-col ${className}`}>
        {children}
    </div>
)

const CardContent = ({ children, className }: CardProps) => (
    <div className={`font-bold text-lg mb-2 ${className}`}>
        {children}
    </div>
)

const CardFooter = ({ children, className }: CardProps) => (
    <div className={`m-5 ${className}`}>
        {children}

    </div>
)

export {
    Card,
    CardHeader,
    CardContent,
    CardFooter
}