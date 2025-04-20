"use client"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { MongoUser } from "next-auth"
import { useState } from "react"

interface PickMemberProps {
    onChange: (value: MongoUser | null) => void
    value: MongoUser | undefined | null
    members: MongoUser[]
    className?: string
}

export function PickMember({ onChange, value, members, className }: PickMemberProps) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start", className)}>
                    {value ? <>{value.name}</> : <span className="text-gray-500">לא נבחר משתמש</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <MembersList setOpen={setOpen} setSelectedMember={onChange} members={members} />
            </PopoverContent>
        </Popover>
    )
}

function MembersList({
    setOpen,
    setSelectedMember,
    members
}: {
    setOpen: (open: boolean) => void
    setSelectedMember: (member: MongoUser | null) => void
    members: any[]
}) {
    return (
        <Command>
            <CommandInput placeholder="סינון משתמשים" />
            <CommandList>
                <CommandEmpty>אין משתמשים ברשימה.</CommandEmpty>
                <CommandGroup>
                    {members.map((member) => (
                        <CommandItem
                            key={member._id}
                            value={member._id}
                            onSelect={(value) => {
                                setSelectedMember(
                                    members.find((member) => member._id === value) || null
                                )
                                setOpen(false)
                            }}
                        >
                            {member.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
