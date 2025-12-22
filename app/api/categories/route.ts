import { auth } from "@/auth"
import { db } from "@/lib/db"
import { CategorySchema } from "@/lib/validation"
import { Prisma } from "@/prisma/generated/prisma/client"

export async function POST(request: Request) {
    const session = await auth()

    if (!session?.user?.id) {
        return Response.json(
            { message: "Unauthorized", success: false },
            { status: 401 }
        )
    }

    try {
        const body = await request.json()

        const category = CategorySchema.safeParse(body);
        if (!category.success) {
            return Response.json(
                { message: "Invalid category name", success: false },
                { status: 400 }
            )
        }

        const response = await db.category.create(
            {
                data: {
                    userId: session.user.id,
                    name: category.data.categoryName
                }
            }
        )
        return Response.json(
            { success: true, data: response },
            { status: 201 },
        )
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return Response.json(
                    { success: false, message: "Category already exists" },
                    { status: 409 }
                )
            }
        }
        return Response.json(
            { message: 'Internal server error', success: false },
            { status: 500 }
        )
    }
}

export async function GET(request: Request) {
    const session = await auth()

    if (!session?.user?.id) {
        return Response.json(
            { message: "Unauthorized", success: false },
            { status: 401 }
        )
    }
    try {
        const response = await db.category.findMany({
            where: {
                userId: session.user.id
            },
            orderBy: { name: "asc" },
            select: {
                id: true,
                name: true
            }
        })

        return Response.json(
            { success: true, data: response },
            { status: 200 }
        )
    } catch (error) {
        return Response.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }

}