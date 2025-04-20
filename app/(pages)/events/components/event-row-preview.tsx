import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import Link from "next/link"

interface EventPreviewProps {
    event: any
}

export default function EventRowPreview({ event }: EventPreviewProps) {
    return <TableRow className="hover:bg-muted/50">
        <TableCell className="hover:bg-slate-100">
            <Link href={`/events/${event._id}`}>
                <Button variant="link">{event.title}</Button>
            </Link>
        </TableCell>
        <TableCell className="hover:bg-slate-100">{event.date}</TableCell>
        <TableCell className="hover:bg-slate-100">{event.time}</TableCell>
        <TableCell className="hover:bg-slate-100">{event.place}</TableCell>
        <TableCell className="hover:bg-slate-100">{`${event.members.length} משתתפים`}</TableCell>
    </TableRow>
}