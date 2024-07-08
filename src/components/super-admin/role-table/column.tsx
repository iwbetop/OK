"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Form, Submit } from "@/components/form/form"
import { CHANGEROLE } from "@/actions/superadmin/changeRole"
import { useState } from "react"
export type User = {
    id: string,
    email: string,
    firstName: string | null,
    lastName: string | null,
    role: {
      id: string,
      name: "ADMIN" | "SUPERADMIN" | "USER"
    } | null
}

export const columns: ColumnDef<User>[] = [
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            First Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
    accessorKey: "lastName",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "role.name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      }
    },
    // Actions
    {
        id: "actions",
        cell: ({ row }) => {
            const [ roleValue, setRoleValue ] = useState("")
            const handleRoleChangeValue = (e: string) => {
              setRoleValue(e)
            }
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
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Sheet>
                      <SheetTrigger>Change Role</SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Are you absolutely sure?</SheetTitle>
                          <SheetDescription>
                            Changing the role of the user will prevent the user from accessing certain permissions you have given to them
                          </SheetDescription>
                        </SheetHeader>
                        <div className="pt-6">
                          <Form form={CHANGEROLE}>
                            <input type="hidden" name="id" value={row.original.id} />
                            <input type="hidden" name="roleId" value={roleValue} />
                            <div className="grid gap-3">
                              <Label>Select a new role</Label>
                              <Select onValueChange={handleRoleChangeValue}>
                                  <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select Role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                  <SelectItem value="64697b01-e0e3-4e95-a3fa-36bb0d0fbb03">
                                    ADMIN
                                  </SelectItem>
                                  <SelectItem value="80dc52b9-2195-40ca-9841-fccfe5af3d03">
                                    USER
                                  </SelectItem>
                                  <SelectItem value="a86d2d78-2349-40ef-b8b6-761681050d1a">
                                    SUPERADMIN
                                  </SelectItem>
                                  </SelectContent>
                              </Select>
                              <Submit label="Change"/>
                            </div>
                          </Form>
                        </div>
                      </SheetContent>
                    </Sheet>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
        }
    }
  ]