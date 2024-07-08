import prisma from "@/lib/db"

export async function GetUsers(){
    return await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            status: true
        }
    })
}

export async function getTotalUsers() {
    return await prisma.user.count({
        where: { role: { name: "USER" } }
    });
}