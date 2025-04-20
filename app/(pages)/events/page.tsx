"use client";

import { eventsActions } from "@/actions/events.action";
import AuthGuard from "@/components/guards/auth-guard";
import Loading from "@/components/ui/loading";
import TypicalHeader from "@/components/ui/typical-header";
import TypicalHr from "@/components/ui/typical-hr";
import TypicalSubheader from "@/components/ui/typical-subheader";
import TypicalWrapper from "@/components/ui/typical-wrapper";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect, useState } from "react";
import EventsList from "./components/events-list";

export default function EventsPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch()
    const { events } = useAppSelector(state => state.eventsStore)

    useEffect(() => {
        eventsActions.getEvents(dispatch)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <Loading />
    return (
        <AuthGuard>
            <TypicalWrapper>
                <TypicalHeader>האירועים שלי</TypicalHeader>
                <TypicalSubheader>כאן כל האירועים שיצרתם או שאתם חלק מהם יוצגו לכם ברשימה נוחה ומסודרת.</TypicalSubheader>
                <TypicalHr />
                <EventsList events={events} />
            </TypicalWrapper>
        </AuthGuard>
    )
}