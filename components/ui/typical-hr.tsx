import { cn } from "@/lib/utils"

interface TypicalHrProps {
    className?: string
}

export default function TypicalHr({ className }: TypicalHrProps) {
    return (
        <hr className={cn("my-4", className)} />
    )
}