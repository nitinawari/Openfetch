import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CategorySchema } from "@/lib/validation";
import { Prisma } from "@/prisma/generated/prisma/client";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: categoryId } = await params;

    const session = await auth();
    if (!session?.user?.id) {
        return Response.json(
            { message: 'unauthorized', success: false },
            { status: 401 }
        )
    }

    try {
        const response = await db.category.deleteMany({
            where: {
                userId: session.user.id,
                id: categoryId
            }
        })
        if (response.count === 0) {
            return Response.json(
                { success: false, message: "Category not found" },
                { status: 404 }
            );
        }
        return Response.json(
            { success: true },
            { status: 200 }

        )
    } catch (error) {
        return Response.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        )
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: categoryId } = await params;

    const session = await auth();
    if (!session?.user?.id) {
        return Response.json(
            { message: 'unauthorized', success: false },
            { status: 401 }
        )
    }

    try {
        const body = await request.json();

        const category = CategorySchema.safeParse(body);
        if (!category.success) {
            return Response.json(
                { message: 'invalid category name', success: false },
                { status: 400 }
            )
        }

        const response = await db.category.updateMany({
            where: {
                id: categoryId,
                userId: session.user.id
            },
            data: {
                name: category.data.categoryName
            }
        })

        if (response.count === 0) {
            return Response.json(
                { success: false, message: "category not found" },
                { status: 404 }
            )
        }

        const updatedCategory = await db.category.findUnique({
            where: { id: categoryId },
        });

        return Response.json(
            { success: true, data: updatedCategory },
            { status: 200 }

        )
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return Response.json(
                    { message: "category already exist", success: false },
                    { status: 409 }
                )

            }
        }
        return Response.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        )
    }
}