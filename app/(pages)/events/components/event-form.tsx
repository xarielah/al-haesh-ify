"use client";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TypicalHeader from "@/components/ui/typical-header";
import TypicalHr from "@/components/ui/typical-hr";
import TypicalSubheader from "@/components/ui/typical-subheader";
import { IUserEvent } from "@/lib/db/models/event.model";
import { eventService } from "@/services/client/event.service";
import moment from "moment";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface EventInput {
    title: string
    description: string
    date: string
    time: string
    place: string
}

interface EventFormProps {
    event?: IUserEvent
}

export default function EventForm({ event }: EventFormProps) {
    const [loading, setLoading] = useState<boolean>(false);

    const nowString = useMemo(() => {
        return new Date().toISOString()
    }, [])

    const { register, handleSubmit, setValue, watch, getValues, formState: { errors } } = useForm<EventInput>({
        defaultValues: {
            title: event?.title || "",
            description: event?.description || "",
            date: event?.date || nowString,
            place: event?.place || "",
        },
    })

    const onSubmit: SubmitHandler<EventInput> = (data) => {
        data.date = moment(data.date).format("DD/MM/YYYY");

        setLoading(true)
        eventService.create(data)
            .then(console.log)
            .catch(console.error)
            .finally(() => setLoading(false))
    }

    const daysFromNow = useMemo(() => {
        return Math.ceil(moment(watch('date')).diff(moment(), 'days', true))
    }, [watch('date')])

    const isNew = useMemo(() => {
        return !Boolean(event);
    }, [event])

    return (
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <TypicalHeader>{!isNew ? "עריכת אירוע" : "הוספת אירוע חדש"}</TypicalHeader>
            {isNew && <TypicalSubheader>הוספת משתתפים לאירוע תתאפשר לאחר יצירת האירוע.</TypicalSubheader>}

            <TypicalHr />

            <section className="grid gap-8 mb-6">
                <div className="grid gap-2">
                    <label>מה האירוע?</label>
                    <Input {...register('title', { required: true })} placeholder="שם אירוע" />
                    {errors.title && <span className="text-red-500 text-sm">שם לאירוע הוא שדה חובה</span>}
                </div>

                <div className="grid gap-2">
                    <label>אופי האירוע בקצרה</label>
                    <Textarea {...register('description', { required: true })} placeholder="תיאור אירוע" />
                    {errors.description && <span className="text-red-500 text-sm">תיאור לאירוע הוא שדה חובה</span>}
                </div>

                <div className="grid gap-2">
                    <label>מתי זה מתקיים?</label>
                    <DatePicker className="w-full" onChange={date => setValue('date', date.toISOString())} value={new Date(getValues('date'))} futureOnly />
                    {daysFromNow > 0 && <small className="text-gray-600">{daysFromNow} ימים מהיום</small>}
                </div>

                <div className="grid gap-2">
                    <label>היכן יתקיים האירוע?</label>
                    <Input {...register('place', { required: true })} name="place" placeholder="מקום" />
                    {errors.place && <p className="text-red-500 text-sm">מקום האירוע הוא שדה חובה</p>}
                </div>
            </section>

            <Button className="md:w-max" type="submit">הוספת אירוע</Button>
        </form>
    )
}