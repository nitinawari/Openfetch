"use client"
import { CategoryList } from "@/app/(protected)/dashboard/categoryList";
import { Navbar } from "@/components/Navbar";
import { ApiCardsPage } from "@/app/(protected)/dashboard/apiCardGrid";
import { useState } from "react";


export const DashbaordPage = () => {
    const [ActiveCategoryId, setActiveCategoryId] = useState<string | null>(null);
    return (
        <div className="h-full">
            <div>
            <Navbar />
            </div>
            <div className="flex h-full space-x-3">
                <CategoryList
                ActiveCategoryId={ActiveCategoryId}
                setActiveCategoryId={setActiveCategoryId}
                />
                <ApiCardsPage
                ActiveCategoryId={ActiveCategoryId}
                />
            </div>
        </div>
    )
}

export default DashbaordPage;