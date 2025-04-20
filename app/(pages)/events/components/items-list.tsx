import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IEventItem } from "@/lib/db/models/item.model"
import { useAppSelector } from "@/lib/store/hooks"
import ItemRowPreview from "./item-row-preview"

interface ItemsListProps {
    onItemEdit: (item: Partial<IEventItem>) => void
    onItemDelete: (item: IEventItem) => void
}

export default function ItemsList({ onItemEdit, onItemDelete }: ItemsListProps) {
    const { items } = useAppSelector(state => state.eventsStore.currentEvent!)

    return (
        <section className="items-list">
            <Table>
                {items.length === 0 && <TableCaption><p className="text-center">אין פריטים להצגה</p></TableCaption>}
                <TableHeader className="font-bold sticky top-0 bg-white">
                    <TableRow>
                        {items.length > 0 && <TableHead className="w-[25px] hover:bg-slate-100"></TableHead>}
                        {items.length > 0 && <TableHead className="w-[25px] hover:bg-slate-100"></TableHead>}
                        <TableHead className="w-[250px] hover:bg-slate-100">שם פריט</TableHead>
                        <TableHead className="hover:bg-slate-100">קטגוריה</TableHead>
                        <TableHead className="hover:bg-slate-100">באחריות</TableHead>
                        <TableHead className="hover:bg-slate-100">הערות נוספות</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map(item => (
                        <ItemRowPreview
                            key={item._id}
                            item={item}
                            onItemEdit={onItemEdit}
                            onItemDelete={onItemDelete}
                        />
                    ))}
                </TableBody>
            </Table>
        </section>
    )
}   