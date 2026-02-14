import { db } from "@/lib/db";
import FetchApiResponce from "./FetchApiResponce";

export default async function ApiDetailPage({ params }: { params: Promise<{ id: string }> }) {

    const { id: categoryId } = await params;

    const api = await db.apiEndPoints.findUnique({
        where: { id: categoryId },
    });

    
    if (!api) {
        return (
            <div className="min-h-screen flex justify-center items-center ">
                <div className=" border shadow-md rounded-md">
                    <p className="p-10">Not found</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0C0A09] text-white ">
            <div className="max-w-7xl mx-auto  pt-10 ">
                <div className="flex justify-between ">
                    <h1 className="font-bold text-4xl ">{api.name}</h1>
                </div>
                <div className="flex gap-2">
                    <h1 className="text-[#A1A1AA] text-sm ">Monitor for</h1>
                    <p className="text-green-500 text-sm ">{api.url}</p>
                </div>
                <span className=" inline-block  bg-blue-500/40 text-blue-400 border border-blue-500/30 rounded-lg mt-2 text-sm font-semibold px-2 py-1">{api.method}</span>

                <div className="mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className=" rounded-md ring-1 ring-gray-700 bg-[#1C1917]  shadow-2xl p-4">
                            Currently Up for
                        </div>
                        <div className=" rounded-md ring-1 ring-gray-700 bg-[#1C1917]  shadow-2xl p-4">
                            Last Checked At
                        </div>
                        <div className=" rounded-md ring-1 ring-gray-700 bg-[#1C1917]  shadow-2xl p-4">
                            Last 24 hours
                        </div>
                    </div>
                </div>
                <FetchApiResponce url={api.url} />
            </div>

        </div>
    );
}
