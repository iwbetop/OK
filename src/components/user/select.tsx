"use client"
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export function SelectCateogry(){
    const [cat, setCat] = useState("OTHER");
    function handleChange(e: string){
        setCat(e)
    }

    return (
        <>
            <input type="hidden" name="category" value={cat} />
                <Select onValueChange={handleChange}>
                    
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                        <SelectItem value="SPECIAL">SPECIAL</SelectItem>
                    <SelectItem value="ACADEMIC">ACADEMIC</SelectItem>
                    <SelectItem value="EXTRA_CURRICULUM">EXTRA_CURRICULUM</SelectItem>
                </SelectContent>
                </Select>
        
        </>
    );
  }