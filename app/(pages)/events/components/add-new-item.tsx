"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { useState } from "react";
import ItemForm from "./item-form";



interface AddNewItemProps {
    onAddNewItem: (item: any) => void
}

export default function AddNewItem({ onAddNewItem }: AddNewItemProps) {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
            <DialogTrigger asChild>
                <Button variant="outline">הוספת פריט</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>הוספת פריט חדש</DialogTitle>
                    <DialogDescription>
                        המלצת העורך - בחרו בנוסף קטגוריה ומשתתף כדי שיהיה ניתן לאתר בקלות פריטים שנפלו בין הכיסאות.
                    </DialogDescription>
                </DialogHeader>
                <ItemForm onSubmit={(item) => {
                    onAddNewItem(item)
                    setOpen(false)
                }}>
                    <DialogFooter>
                        <Button type="submit">הוספת הפריט לרשימה</Button>
                    </DialogFooter>
                </ItemForm>
            </DialogContent>
        </Dialog>
    )
}
