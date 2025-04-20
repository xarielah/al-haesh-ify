import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, CalendarRange, Clock10, MapPin, Users } from "lucide-react"
import EventRowPreview from "./event-row-preview"

interface EventsListProps {
    events: any[]
}

export default function EventsList({ events }: EventsListProps) {
    return (
        <section className="events-list">
            <Table>
                {events.length === 0 && <TableCaption><p className="text-center">אין אירועים להצגה</p></TableCaption>}
                <TableHeader className="font-bold">
                    <TableRow>
                        <TableHead className="w-[350px] hover:bg-slate-100">
                            <div className="flex items-center gap-1">
                                <CalendarRange className="size-4" />
                                אירוע
                            </div>
                        </TableHead>
                        <TableHead className="hover:bg-slate-100">
                            <div className="flex items-center gap-1">
                                <Calendar className="size-4" />
                                תאריך
                            </div>
                        </TableHead>
                        <TableHead className="hover:bg-slate-100">
                            <div className="flex items-center gap-1">
                                <Clock10 className="size-4" />
                                שעה
                            </div>
                        </TableHead>
                        <TableHead className="hover:bg-slate-100">
                            <div className="flex items-center gap-1">
                                <MapPin className="size-4" />
                                מיקום
                            </div>
                        </TableHead>
                        <TableHead className="hover:bg-slate-100">
                            <div className="flex items-center gap-1">
                                <Users className="size-4" />
                                מספר משתתפים
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {events.map(event => <EventRowPreview key={event._id} event={event} />)}
                </TableBody>
            </Table>
        </section>
    )
}