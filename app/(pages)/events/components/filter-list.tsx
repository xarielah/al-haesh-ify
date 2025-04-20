import { eventsActions } from "@/actions/events.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ItemCategory } from "@/lib/db/models/item.model";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Search, X } from "lucide-react";
import { MongoUser } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { PickCategory } from "./pick-category";
import { PickMember } from "./pick-member";

export interface IFilterList {
    category: ItemCategory | null
    member: MongoUser | null
    search: string
}

// TODO: Fix infinite renders by filter

export default function FilterList() {
    const { categories, members } = useAppSelector(state => state.eventsStore.currentEvent!)
    const dispatch = useAppDispatch();
    const [filterBy, setFilterBy] = useState<IFilterList>({
        category: null,
        member: null,
        search: ""
    })
    const hasMounted = useRef<boolean>(false)

    useEffect(() => {
        if (!hasMounted.current) return;
        eventsActions.setItemsFilter(dispatch, filterBy)
    }, [filterBy])

    return (
        <section className="filter-list flex gap-4">
            <Input placeholder="סנן לפי שם" className="max-w-[300px]" icon={<Search className="size-4 ml-2 text-gray-600" />} />

            <div className="flex gap-1 items-center">
                <PickCategory
                    onChange={(category: any) =>
                        setFilterBy((filterBy: any) => ({ ...filterBy, category }))}
                    value={filterBy.category}
                    categories={categories}
                    className="min-w-[200px]"
                />
                {filterBy.category && <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilterBy((filterBy: any) => ({ ...filterBy, category: null }))}
                >
                    <X />
                </Button>}
            </div>

            <div className="flex gap-1 items-center">
                <PickMember
                    onChange={(member: any) =>
                        setFilterBy((filterBy: any) => ({ ...filterBy, member }))}
                    value={filterBy.member}
                    members={members}
                    className="min-w-[200px]"
                />
                {filterBy.member && <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilterBy((filterBy: any) => ({ ...filterBy, member: null }))}
                >
                    <X />
                </Button>}
            </div>
        </section>
    )
}