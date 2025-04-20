"use client";

import AddNewItem from "./add-new-item";

interface EventDetailsNavProps {
    onAddNewItem: (item: any) => void
}

export default function EventDetailsNav({ onAddNewItem }: EventDetailsNavProps) {
    return <nav className="flex gap-4">
        <AddNewItem onAddNewItem={onAddNewItem} />
    </nav>
}   