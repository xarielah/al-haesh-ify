"use client";

import { eventsActions } from "@/actions/events.action";
import AuthGuard from "@/components/guards/auth-guard";
import TypicalHeader from "@/components/ui/typical-header";
import TypicalHr from "@/components/ui/typical-hr";
import TypicalSubheader from "@/components/ui/typical-subheader";
import TypicalWrapper from "@/components/ui/typical-wrapper";
import { IEventItem } from "@/lib/db/models/item.model";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventDetailsNav from "../components/event-details-nav";
import FilterList from "../components/filter-list";
import ItemsList from "../components/items-list";

export default function EventDetails() {
    const { eventId } = useParams();
    const event = useAppSelector(state => state.eventsStore.currentEvent)
    const { itemsFilterBy } = useAppSelector(state => state.eventsStore)
    const [loading, setLoading] = useState<boolean>(true);
    const [actionPending, setActionPending] = useState<boolean>(false);
    const dispatch = useAppDispatch()

    useEffect(() => {
        setLoading(true);
        eventsActions.getCurrentEventById(dispatch, eventId as string, itemsFilterBy)
            .finally(() => setLoading(false))
    }, [eventId, itemsFilterBy])

    const handleAddNewItem = (item: Partial<IEventItem>) => {
        setActionPending(true);
        eventsActions.addEventItem(dispatch, event!, { ...item, event: event!._id })
            .finally(() => setActionPending(false))
    }

    const handleItemEdit = (item: Partial<IEventItem>) => {
        setActionPending(true);
        eventsActions.updateEventItem(dispatch, event!, item)
            .finally(() => setActionPending(false))
    }

    const handleItemDelete = (item: IEventItem) => {
        setActionPending(true);
        eventsActions.deleteEventItem(dispatch, event!, item)
            .finally(() => setActionPending(false))
    }

    if (loading) return <p>טוען...</p>
    if (!event) return notFound()
    return (
        <AuthGuard>
            <TypicalWrapper>
                <TypicalHeader>אירוע: {event.title}</TypicalHeader>
                <TypicalSubheader>{event.description}</TypicalSubheader>
                <TypicalHr />
                <div className="flex items-center md:justify-between flex-col md:flex-row md:gap-0 gap-6">
                    <FilterList />
                    <EventDetailsNav onAddNewItem={handleAddNewItem} />
                </div>
                <ItemsList onItemEdit={handleItemEdit} onItemDelete={handleItemDelete} />
            </TypicalWrapper>
        </AuthGuard>
    )
}

