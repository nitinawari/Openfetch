"use client"
import { Button } from "@/components/ui/Button";
import { useState } from "react";

interface FetchApiResponceProps {
    url: string
}
export default function FetchApiResponce({ url }: FetchApiResponceProps) {

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);

    const runApi = async () => {
        setLoading(true);
        try {
            const res = await fetch(url);
            const text = await res.text();
            setResponse(text);
        } catch {
            setResponse("Failed to fetch");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8">
            <div className="flex justify-between">
                <h1 className="font-bold text-2xl">Responce</h1>
                <Button
                    size="sm"
                    variant="outline"
                    className="bg-green-500"
                    onClick={runApi}
                >fetch</Button>
            </div>

            <div className="min-h-[100px] border border-gray-700 rounded-md mt-4 p-4 bg-[#1C1917] flex items-center justify-center">
                {loading ? (
                    <div className="text-gray-400">Loading...</div>
                ) : response ? (
                    <div className="w-full text-sm whitespace-pre-wrap">
                        {response}
                    </div>
                ) : (
                    <div className="text-gray-500">Not Found</div>
                )}
            </div>

        </div>
    )
}