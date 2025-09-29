import React from "react"

interface cardProps {
    children: React.ReactNode;
    className?: string
}


const card = ({ children, className }: cardProps) => {
    <div className={`rounded-xl shadow-xl bg-white ${className}`}>
        {children}
    </div>
}

const cardHeader = ({ children, className }: cardProps) => {
    <div className={`p-6 flex flex-col ${className}`}>
        {children}
    </div>
}

const cardContent = ({ children, className }: cardProps) => {
    <div className={`font-bold text-lg mb-2 ${className}`}>
        {children}
    </div>
}

const cardFooter = ({ children, className }: cardProps) => {
    <div className={`m-5 ${className}`}>
        {children}

    </div>
}

export {
    card,
    cardHeader,
    cardContent,
    cardFooter
}