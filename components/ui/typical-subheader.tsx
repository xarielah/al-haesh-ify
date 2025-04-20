import { cn } from "@/lib/utils"

interface TypicalSubheaderProps {
    children: string,
    className?: string
}

export default function TypicalSubheader({ children, className }: TypicalSubheaderProps) {
    return (
        <p className={cn(className)}>{children}</p>
    )
}