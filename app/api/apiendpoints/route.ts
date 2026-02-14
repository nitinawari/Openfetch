import {auth} from "@/auth"
import { db } from "@/lib/db"
import { ApiEndPointSchema } from "@/lib/validation"
import { unauthorized } from "next/navigation"
import { userAgent } from "next/server"
import { success } from "zod"


export async function POST(request : Request){
    const session = await auth()

    if(!session?.user?.id){
        return Response.json(
            {message:"Unauthorized" , success:false},
            {status: 401}
        )
    }

    try {
        const body =await request.json()
        const apiEndPoint = ApiEndPointSchema.safeParse(body);
        if(!apiEndPoint.success){
            return Response.json(
                {message:"invalid api data" , success:false},
                {status: 400}
            )
        }

        const newApiEndpoint  = await db.apiEndPoints.create({
            data: {
                userId:session.user.id,
                categoryId : apiEndPoint.data.categoryId,
                name:apiEndPoint.data.name,
                url:apiEndPoint.data.url,
                method:apiEndPoint.data.method
            }
        })

        return Response.json(
            { success: true, data: newApiEndpoint },
            { status: 201 },
        )

    } catch (error) {
        return Response.json(
            {message:"internal server error" , success : false },
            {status : 500}
        )
        
    }

}

export async function GET(request : Request){

    const session = await auth();

    if(!session?.user?.id){
        return Response.json(
            {message:"unauthorized" , success:false},
            {status:401}
        )
    }

    try {
        const response = await db.apiEndPoints.findMany({
            where :{
                userId:session.user.id
            },
            select:{
                id:true,
                name:true,
                category:{
                    select:{
                        name:true
                    }
                },
                url:true,
                method:true
            }
        })
        const formattedResponce = response.map(api => ({
        ...api,
        category: api.category.name
        }))

        console.log("respone======>" , formattedResponce)
        return Response.json(
            { success: true, data: formattedResponce},
            { status: 200 }
        )

    } catch (error) {
         return Response.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
        
}