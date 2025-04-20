"use client"


import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ItemCategory } from "@/lib/db/models/item.model"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface PickCategoryProps {
    onChange: (value: ItemCategory | Omit<ItemCategory, "_id"> | null) => void
    value: ItemCategory | Omit<ItemCategory, "_id"> | null
    categories: ItemCategory[]
    disabled?: boolean
    className?: string
}

export function PickCategory({ onChange, value, categories, className, disabled = false }: PickCategoryProps) {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" disabled={disabled} className={cn("justify-start", className)}>
                    {(value && !disabled) ? (
                        <div className="flex gap-2 items-center">
                            <div className="size-4 rounded-sm shadow-md" style={{ backgroundColor: value.color }}></div>
                            <span className="pb-1">{value.name}</span>
                        </div>
                    ) : (
                        <span className="text-gray-500">לא נבחרה קטגוריה</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <CategoriesList setOpen={setOpen} setSelectedCategory={onChange} categories={categories} />
            </PopoverContent>
        </Popover>
    )
}

function CategoriesList({
    setOpen,
    setSelectedCategory,
    categories
}: {
    setOpen: (open: boolean) => void
    setSelectedCategory: (status: ItemCategory | null) => void
    categories: ItemCategory[]
}) {
    return (
        <Command>
            <CommandInput placeholder="סינון קטגוריות" />
            <CommandList>
                <CommandEmpty>אין קטגוריות ברשימה.</CommandEmpty>
                <CommandGroup>
                    {categories.map((category) => (
                        <CommandItem
                            key={category._id}
                            value={category._id}
                            onSelect={(value) => {
                                setSelectedCategory(
                                    categories.find((category) => category._id === value) || null
                                )
                                setOpen(false)
                            }}
                        >
                            <div className="flex gap-2 items-center">
                                <div className="size-4 rounded-sm shadow-md" style={{ backgroundColor: category.color }}></div>
                                <span className="pb-1">{category.name}</span>
                            </div>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
