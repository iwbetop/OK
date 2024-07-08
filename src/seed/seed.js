const { prisma } = require("./db");

const { 
  users,
  admin
} = require("../assets/user")
const { 
  course
} = require("../assets/course")
const { 
  skills
} = require("../assets/skills")
const { 
  roles
} = require("../assets/role")
const { 
  permissions,
  superAdminPermissions
} = require("../assets/permissions")

async function Seed(){ 
    // await prisma.role.createMany({
    //   data: roles
    // })
    // await prisma.permission.createMany({
    //   data: permissions
    // })
    // await prisma.rolePermission.createMany({
    //     data: superAdminPermissions
    // })
    // await prisma.user.createMany({
    //   data: admin
    // })
    // await prisma.user.createMany({
    //   data: users
    // })
    // await prisma.course.createMany({
    //   data: course
    // })
    // await prisma.skill.createMany({
    //   data: skills
    // })

    console.log("finsied")
};

Seed()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// run node 