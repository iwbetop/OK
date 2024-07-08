"use client"

import { ColumnDef } from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Form } from "@/components/form/form"
import { REMOVEPERMISSION } from "@/actions/superadmin/removePermission"
import { Button } from "@/components/ui/button"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"

export type Permission = {
    id: string,
    role: {
        id: string
    }
    permission: {
        id: string
        name: string
        description: string
    }
}

export const columns: ColumnDef<Permission>[] = [
    {
      accessorKey: "permission.name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "permission.description",
      header: "Description"
    },
    // Actions
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Form form={REMOVEPERMISSION}>
                      <input type="hidden" name="id" value={row.original.id} />
                      <DropdownMenuItem>
                        <Button type="submit" variant="ghost" size="dropdown">
                          Delete Permission
                        </Button>
                      </DropdownMenuItem>
                    </Form>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
        }
    }
  ]