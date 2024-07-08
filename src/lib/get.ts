import prisma from "@/lib/db";

export async function GetUserByID(id: string){
    try{
        const user = await prisma.user.findUnique({ where: { id }, include: { 
            course: true, achievements: true, projects: true,
            educations: true, role: true, skill: {
                select: {
                    id: true,
                    skill: {
                        select: {
                            name: true
                        }
                    }
                }
            }
         } });
        return user;
    }catch{
        return null
    }
}
export async function GetUserByEMAIL(email: string){
    const user = await prisma.user.findUnique({ where: { email }, include: {
        course: true, achievements: true, projects: true,
        educations: true, skill: true, role: true
    } });
    return user;
}

export async function GetCourses(){
    const courses = await prisma.course.findMany();
    return courses;
}

export async function GetEmailTokenByEMAIL(email: string){
    const emailToken = await prisma.emailToken.findFirst({ where: { email } });
    return emailToken;
}
export async function GetEmailTokenByTOKEN(token: string){
    const emailToken = await prisma.emailToken.findFirst({ where: { token } });
    return emailToken;
}
export async function GetPasswordTokenByEMAIL(email: string){
    const passwordResetToken = await prisma.passwordToken.findFirst({ where: { email } });
    return passwordResetToken;
}
export async function GetPasswordTokenByTOKEN(token: string){
    const passwordResetToken = await prisma.passwordToken.findFirst({ where: { token } });
    return passwordResetToken;
}

export async function GetSkills(){
    const skills = await prisma.skill.findMany();
    return skills;
}

export async function GetUserSkills(id: string){
    const skills = await prisma.userSkill.findMany({
        where: { userId: id },
        include: { skill: true }
    });
    return skills;
}
  