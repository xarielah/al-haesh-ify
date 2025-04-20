import { Button } from "@/components/ui/button"
import { ColorPicker } from "@/components/ui/color-picker"
import { Input } from "@/components/ui/input"
import { ItemCategory } from "@/lib/db/models/item.model"
import { getRandomColor } from "@/lib/utils"
import { X } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"

interface AddCategoryProps {
    onCancel: () => void
    onChange: (category: Omit<ItemCategory, "_id">) => void,
    value: Omit<ItemCategory, "_id"> | null
}

export default function AddCategory({ onCancel, onChange, value }: AddCategoryProps) {
    const [category, setCategory] = useState<Omit<ItemCategory, "_id">>(value || {
        name: "",
        color: getRandomColor(),
    })

    useEffect(() => {
        onChange(category)
    }, [category])

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCategory(category => ({ ...category, name: e.target.value }))
    }

    return (
        <div className="flex gap-2">
            <Input placeholder="שם קטגוריה" onChange={handleNameChange} />
            <ColorPicker onChange={(color: string) => setCategory(category => ({ ...category, color }))} value={category.color} />
            <Button variant="destructive" onClick={onCancel}><X /></Button>
        </div>
    )
}