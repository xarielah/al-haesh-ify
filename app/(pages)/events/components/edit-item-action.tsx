"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { IEventItem } from "@/lib/db/models/item.model";
import { Pen } from "lucide-react";
import { useState } from "react";
import ItemForm from "./item-form";



interface AddNewItemProps {
    onItemEdit: (item: Partial<IEventItem>) => void
    item: IEventItem
}

export default function EditActionItem({ onItemEdit, item }: AddNewItemProps) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm"><Pen className="size-4" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>עריכת פריט קיים</DialogTitle>
                    <DialogDescription>
                        המלצת העורך - בחרו בנוסף קטגוריה ומשתתף כדי שיהיה ניתן לאתר בקלות פריטים שנפלו בין הכיסאות.
                    </DialogDescription>
                </DialogHeader>
                <ItemForm item={item} onSubmit={(item) => {
                    onItemEdit(item)
                    setOpen(false)
                }}>
                    <Button type="submit">שמירת שינויים</Button>
                </ItemForm>
            </DialogContent>
        </Dialog>
    )
}
