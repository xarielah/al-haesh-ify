import { cn } from "@/lib/utils"

interface TypicalWrapperProps {
    children: React.ReactNode[],
    className?: string
}

export default function TypicalWrapper({ children, className }: TypicalWrapperProps) {
    return (
        <section className={cn("grid gap-4", className)}>
            {children}
        </section>
    )
}