import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

interface DeleteItemDialogProps {
    onDelete: () => void,
}

export default function DeleteItemDialog({ onDelete, }: DeleteItemDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm"><Trash className="size-4" /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>האם אתם בטוחים שאתם רוצים למחוק את הפריט?</AlertDialogTitle>
                    <AlertDialogDescription>
                        הפעולה הזו לא ניתנת לביטול. הפריט ימחק לצמיתות ולא יהיה ניתן לשחזרו, ותדרשו להוסיף אותו מחדש.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>ביטול</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>כן, למחוק בבקשה</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}