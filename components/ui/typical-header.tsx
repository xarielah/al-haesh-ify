import { cn } from "@/lib/utils"

interface TypicalHeaderProps {
    children: string | string[],
    className?: string
}

export default function TypicalHeader({ children, className }: TypicalHeaderProps) {
    return (
        <h1 className={cn("text-2xl font-bold", className)}>{children}</h1>
    )
}