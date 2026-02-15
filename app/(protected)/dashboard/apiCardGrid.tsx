"use client"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";
import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card"
import Link from "next/link";

interface ApiCardProps {
    ActiveCategoryId: string | null
}

interface Category {
    id: string,
    name: string
}
interface ApiEndPoints {
    id: string,
    name: string,
    category: string,
    url: string
    method: string,
}
export const ApiCardsPage = ({ActiveCategoryId}:ApiCardProps) => {


    const [apiEndPoints, setApiEndPoints] = useState<ApiEndPoints[]>([])
    const [apiName, setApiName] = useState<string>("")
    const [apiUrl, setApiUrl] = useState<string>("")
    const [apiMethod, setApiMethod] = useState<string>("")
    const [category, setCategory] = useState<Category[]>([])
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isCategory, setIsCategory] = useState<boolean>(false)
    const [isMethod, setIsMethod] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [isCreating, setIsCreating] = useState<boolean>(false)

    const METHODS = ["GET", "POST", "PATCH"] as const;

    const selectedCategory = category.find(
        (cat) => cat.id === selectedCategoryId
    );

    const ActiveCategory = category.find(
        (cat) => cat.id === ActiveCategoryId
    )
    //categorywise
    const filteredApis = ActiveCategoryId
    ? apiEndPoints.filter((api) => api.category === ActiveCategory?.name)
    :apiEndPoints;

    //fetch categories
    useEffect(() => {
        fetchCategories()
        fetchApiEndPoints()
    }, [])

    const fetchApiEndPoints = async () => {
        try {
            const res = await fetch('/api/apiendpoints')
            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.message || "Failed to load api");
            }
            setApiEndPoints(result.data)
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Failed to load api"
            );
        }
    }
    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/categories")
            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.message || "Failed to load categories");
            }

            setCategory(result.data)

        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Failed to load categories"
            );
        }
    }

    const HandleSubmit = async () => {
        try {
            setIsCreating(true);
            const newApiEndPoint = await saveApiEndPoint()
            setIsCreating(false);
            setIsOpen(false)

        } catch (error) {
            setError(error instanceof Error ? error.message : "something went wrong");
        }
    }

    const saveApiEndPoint = async () => {
        const res = await fetch("/api/apiendpoints",
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    name: apiName,
                    url: apiUrl,
                    method: apiMethod,
                    categoryId: selectedCategoryId
                })
            })
        const result = await res.json()

        return result.data
    }
    return (
        <div className="">
            <div className="">
                <div className="space-y-2 mt-2">
                    {filteredApis.map((api) => (
                        <Card key={api.id} className="bg-[#13161B] text-white  ">
                            <div className="text-sm font-semibold px-6 pt-6">{api.name} </div>
                            <span className="px-6 mt-3 text-sm font-light text-gray-500">{api.category}</span>
                            <div className="m-5 p-2">
                                <span className="px-2 text-sm text-green-900 py-1  font-semibold  border border-green-800 rounded-xl bg-[#102320]">
                                    {api.method}
                                </span>
                                <span className=" ml-5 p-2 rounded-xl bg-[#23272F] text-sm text-gray-400">
                                    {api.url}
                                </span>
                            </div>
                            <div className="w-30 ml-70 ">
                                <Link href={`/dashboard/api/${api.id}`}>
                                <Button variant="outline"
                                >
                                View details
                                </Button>
                                </Link>
                            </div>
                        </ Card>

                    ))}
                </div>
                <Button
                    className="w-md mt-2 "
                    onClick={() => { setIsOpen(v => !v) }}
                >
                    Add new +
                </Button>
            </div>
            {isOpen &&
                <div className="fixed inset-0 ">
                    {/* backdrop */}
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm "

                    />
                    {/* model container */}
                    <div className=" relative flex justify-center items-center min-h-screen">
                        {/* Dialog box */}
                        <div className=" bg-white w-full max-w-md rounded-xl shadow-xl p-6 ">
                            <div className="flex justify-between">
                                <h1 className="text-lg font-semibold text-gray-700">Create your api </h1>
                                <IoMdClose
                                    className="h-6 w-6  text-gray-500 hover:text-black hover:cursor-pointer"
                                    onClick={() => {
                                        setIsMethod(false)
                                        setIsCategory(false)
                                        setIsOpen(false)

                                    }}
                                />
                            </div>
                            <div className="h-px bg-gray-300 mt-3 " />

                            <div className="mt-5 space-y-2">
                                <div>
                                    <Label className="text-gray-600 ">Name<span className="text-red-500"> *</span></Label>
                                    <Input
                                        placeholder="Name"
                                        disabled={isCreating}
                                        onChange={(e) => setApiName(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <Label className="text-gray-600 ">Category <span className="text-red-500"> *</span></Label>

                                    <div className="relative"
                                        onClick={() => {
                                            setIsCategory(v => !v)
                                            setIsMethod(false)
                                        }}
                                    >
                                        <Input placeholder="Category"
                                            value={selectedCategory?.name || ""}
                                            readOnly
                                            disabled={isCreating}
                                        />
                                        <IoIosArrowDropdown className="absolute right-3 top-3  pointer-events-none " />
                                    </div>
                                    {isCategory &&
                                        <div className="absolute right-0 w-full p-2 bg-white z-50  border border-gray-300 mt-1 rounded-md  font-medium ">
                                            {category.map((cat) => (
                                                <div key={cat.id}
                                                    className="h-9 hover:bg-gray-200 flex items-center p-2  hover:cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedCategoryId(cat.id)
                                                        setIsCategory(false)
                                                    }
                                                    }
                                                >
                                                    {cat.name}
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </div>
                                <div>
                                    <Label className="text-gray-600 ">Url <span className="text-red-500"> *</span></Label>
                                    <Input
                                        placeholder="https://"
                                        disabled={isCreating}
                                        onChange={(e) => setApiUrl(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <Label className="text-gray-600 ">Method <span className="text-red-500"> *</span></Label>

                                    <div className="relative"
                                        onClick={() => {
                                            setIsMethod(v => !v)
                                            setIsCategory(false)
                                        }
                                        }
                                    >
                                        <Input readOnly value={apiMethod} disabled={isCreating} />
                                        <IoIosArrowDropdown className="absolute right-3 top-3  pointer-events-none " />
                                    </div>

                                    {isMethod &&
                                        <div className=" absolute z-50 bg-white w-full border border-gray-300 mt-1 rounded-md  font-medium ">
                                            {METHODS.map((method) => (
                                                <div
                                                    key={method}
                                                    className="h-9 hover:bg-gray-200 flex items-center p-2 text-sm hover:cursor-pointer"
                                                    onClick={() => {
                                                        setApiMethod(method);
                                                        setIsMethod(false);
                                                    }}
                                                >
                                                    {method}
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </div>
                                <div className="flex space-x-1">
                                    <Button className="mt-2" disabled={isCreating} onClick={() => {
                                        setIsOpen(false)
                                        setIsMethod(false)
                                        setIsCategory(false)
                                    }}>Cancel</Button>

                                    <Button
                                        className="mt-2"
                                        onClick={HandleSubmit}
                                    >
                                        {isCreating ? "saving..." : "save"}
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }

        </div>

    )
}