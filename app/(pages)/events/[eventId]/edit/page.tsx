import { eventService } from "@/services/client/event.service";
import { notFound } from "next/navigation";
import EventForm from "../../components/event-form";

interface EventEditProps {
    params: Promise<{ eventId: string }>
}

export default async function EventEditPage({ params }: EventEditProps) {
    const { eventId } = await params;

    const event = await eventService.getById(eventId);

    if (!event)
        return notFound();

    return <section className="event-edit">
        <EventForm event={event} />
    </section>
}   