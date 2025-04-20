"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IEventItem, ItemCategory } from "@/lib/db/models/item.model";
import { useAppSelector } from "@/lib/store/hooks";
import { Plus } from "lucide-react";
import { MongoUser } from "next-auth";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AddCategory from "./add-category";
import { PickCategory } from "./pick-category";
import { PickMember } from "./pick-member";

interface NewItemInput {
    title: string
    category: Omit<ItemCategory, "_id"> | ItemCategory
    | null
    assigned: MongoUser | null | undefined
    comment: string
}

interface ItemFormProps {
    item?: Partial<IEventItem>
    onSubmit: (item: Partial<IEventItem>) => void;
    children: React.ReactNode
}


export default function ItemForm({ item, onSubmit, children }: ItemFormProps) {
    const [isAddCategory, setIsAddCategory] = useState<boolean>(false)
    const { categories, members } = useAppSelector(state => state.eventsStore.currentEvent!);

    const { register, setValue, handleSubmit, control, watch, formState: { errors } } = useForm<NewItemInput>({
        defaultValues: {
            title: "",
            category: null,
            assigned: null,
            comment: ""
        }
    })


    useEffect(() => {
        if (!item) return;
        setValue('title', item.title!)
        setValue('assigned', item.assigned)

        const category = categories.find(category => category._id === item.category?._id)
        setValue('category', category || null)
    }, [])

    const preOnSubmit = (data: NewItemInput) => {
        const itemToSubmit: any = {
            title: data.title,
            category: data.category,
            assigned: data.assigned,
            comment: data.comment
        }

        if (item) {
            itemToSubmit._id = item._id;
        }

        onSubmit(itemToSubmit as Partial<IEventItem>);
    }

    return (
        <form onSubmit={handleSubmit(preOnSubmit)}>
            <div className="grid gap-4 py-4">
                <div className="grid items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        מה מביאים?
                    </Label>
                    <div className="grid gap-2">
                        <Input {...register('title', { required: true })} className="col-span-3" />
                        {errors.title && <p className="text-sm text-red-500">שדה זה הוא שדה חובה</p>}
                    </div>
                </div>
                <div className="grid items-center gap-4">
                    <Label htmlFor="assigned" className="text-right">
                        מי מביא?
                    </Label>
                    <PickMember
                        members={members}
                        onChange={(member) => setValue('assigned', member)}
                        value={watch('assigned')}
                    />
                </div>
                <div className="grid items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                        תחום הפריט?
                    </Label>
                    <div className="flex gap-2">
                        <PickCategory
                            disabled={isAddCategory}
                            categories={categories}
                            onChange={(category) => setValue('category', category)}
                            value={watch('category') || null}
                            className="flex-1"
                        />
                        <Button type="button" disabled={isAddCategory} onClick={() => setIsAddCategory(true)}>
                            חדש
                            <Plus />
                        </Button>
                    </div>
                    {isAddCategory && (
                        <Controller
                            control={control}
                            name="category"
                            render={({ field: { onChange, value } }) => (
                                <AddCategory
                                    onCancel={() => setIsAddCategory(false)}
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    )}
                </div>
                <div className="grid items-center gap-4">
                    <Label htmlFor="assigned" className="text-right">
                        הערות נוספות?
                    </Label>
                    <div className="grid gap-1">
                        <Textarea {...register('comment')} placeholder="הערות נוספות" className="w-full" />
                        {watch('comment').length > 0 && <p className="text-sm text-slate-700">250/{watch('comment').length}</p>}
                    </div>
                    {errors.comment && <p className="text-sm text-red-500">מקסימום של 250 תווים להערה</p>}
                </div>
            </div>
            {children}
        </form>
    )
}