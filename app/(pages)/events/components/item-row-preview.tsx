import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { IEventItem } from "@/lib/db/models/item.model";
import { getTextColor } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import DeleteItemDialog from "./delete-item-dialog";
import EditActionItem from "./edit-item-action";

interface ItemPreviewProps {
    item: IEventItem
    onItemEdit: (item: Partial<IEventItem>) => void
    onItemDelete: (item: IEventItem) => void
}

export default function ItemRowPreview({ item, onItemEdit, onItemDelete }: ItemPreviewProps) {
    return <TableRow>
        <TableCell className="hover:bg-slate-100">
            <EditActionItem item={item} onItemEdit={onItemEdit} />
        </TableCell>
        <TableCell className="hover:bg-slate-100">
            <DeleteItemDialog onDelete={() => onItemDelete(item)} />
        </TableCell>
        <TableCell className="hover:bg-slate-100">{item.title}</TableCell>
        <TableCell className="hover:bg-slate-100">
            {item.category ? (
                <span style={{
                    backgroundColor: item.category.color,
                    color: getTextColor(item.category.color)
                }} className="rounded-sm px-2 py-1 shadow-sm">{item.category.name}</span>
            ) : (
                <span className="text-gray-400">ללא קטגוריה</span>
            )}

        </TableCell>
        <TableCell className="hover:bg-slate-100">
            {item.assigned ? (
                <div className="flex items-center gap-2">
                    <Avatar className="size-6 rounded-full">
                        <AvatarImage src={item.assigned.image!} alt={item.assigned.name!} />
                        <AvatarFallback>{item.assigned.name!.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{item.assigned.name}</span>
                </div>
            ) : (
                <span className="text-gray-400">אין אחראי למשימה</span>
            )}

        </TableCell>
        <TableCell className="hover:bg-slate-100 truncate max-w-[200px]">{item.comment ? (
            <span>{item.comment}</span>
        ) : (
            <span className="text-gray-400">אין הערות נוספות</span>
        )}</TableCell>
    </TableRow>
}