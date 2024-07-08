const permissions = [
    {
        id: "2250d002-5a3b-40c4-99d3-f3dc0af3ca01",
        name: 'Delete User',
        description: 'Allows a role to delete user accounts.'
    },
    {
        id: "49507d33-0549-4026-905d-a072e109015d",
        name: 'Update User',
        description: 'Allows a role to update user account information.'
    },
    {
        id: "49a5437b-166b-4a4e-95dc-1aa13219d62f",
        name: 'Create User',
        description: 'Allows a role to create new user accounts.'
    },
    {
        id: "51c68a33-058c-471f-bcd4-3fcc94b23dfc",
        name: 'Create Item (Skills and Courses)',
        description: 'Allows a role to create new items such as skills or courses.'
    },
    {
        id: "9080727a-9a2e-4eaa-b002-a199c64a252d",
        name: 'View Reports',
        description: 'Allows a role to view reports or analytics data.'
    },
    {
        id: "97b0d521-8a2e-45e8-b5b4-0d14359c59d7",
        name: 'Delete Reports',
        description: 'Allows a role to delete reports or analytics data.'
    },
    {
        id: "ac141486-145f-4c96-a34b-b8ae9b568130",
        name: 'Reset Password',
        description: 'Allows a role to initiate password reset for user accounts.'
    },
    {
        id: "b56ba73e-4938-48ab-9474-da3499c91d5b",
        name: 'Lock User',
        description: 'Allows a role to lock user accounts, typically for security reasons.'
    },
    {
        id: "e9e6e02e-69e7-4b1e-aedf-ae46e82e742d",
        name: 'Verify User',
        description: 'Allows a role to verify user accounts, often used in account activation processes.'
    },
    {
        id: "ee660e02-b68c-4237-a42b-7a3e88f58479",
        name: 'Suspend User',
        description: 'Allows a role to suspend user accounts temporarily.'
    },
    {
        id: "f9f30b9f-6810-449f-a1ac-4413c06553f9",
        name: 'Change Role',
        description: 'Allows a role to change the roles assigned to other users, within permissible limits.'
    }
];

const superAdminPermissions = [
    {
        roleId: "a86d2d78-2349-40ef-b8b6-761681050d1a",
        permissionId: "2250d002-5a3b-40c4-99d3-f3dc0af3ca01"
    },
    {
        roleId: "a86d2d78-2349-40ef-b8b6-761681050d1a",
        permissionId: "49507d33-0549-4026-905d-a072e109015d"
    },
    {
        roleId: "a86d2d78-2349-40ef-b8b6-761681050d1a",
        permissionId: "49a5437b-166b-4a4e-95dc-1aa13219d62f"
    },
    {
        roleId: "a86d2d78-2349-40ef-b8b6-761681050d1a",
        permissionId: "51c68a33-058c-471f-bcd4-3fcc94b23dfc"
    },
    {
        roleId: "a86d2d78-2349-40ef-b8b6-761681050d1a",
        permissionId: "9080727a-9a2e-4eaa-b002-a199c64a252d"
    },
    {
        roleId: "a86d2d78-2349-40ef-b8b6-761681050d1a",
        permissionId: "97b0d521-8a2e-45e8-b5b4-0d14359c59d7"
    },
    {
        roleId: "a86d2d78-2349-40ef-b8b6-761681050d1a",
        permissionId: "ac141486-145f-4c96-a34b-b8ae9b568130"
    },
    {
        roleId: "a86d2d78-2349-40ef-b8b6-761681050d1a",
        permissionId: "b56ba73e-4938-48ab-9474-da3499c91d5b"
    },
    {
        roleId: "a86d2d78-2349-40ef-b8b6-761681050d1a",
        permissionId: "e9e6e02e-69e7-4b1e-aedf-ae46e82e742d"
    },
    {
        roleId: "a86d2d78-2349-40ef-b8b6-761681050d1a",
        permissionId: "ee660e02-b68c-4237-a42b-7a3e88f58479"
    },
    {
        roleId: "a86d2d78-2349-40ef-b8b6-761681050d1a",
        permissionId: "f9f30b9f-6810-449f-a1ac-4413c06553f9"
    }
]

module.exports = {
    permissions,
    superAdminPermissions
}