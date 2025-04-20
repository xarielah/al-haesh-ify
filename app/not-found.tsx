'use client'

import { Button } from "@/components/ui/button"
import { ArrowLeft, Frown } from 'lucide-react'
import Link from "next/link"
import { useEffect, useState } from "react"

export default function NotFound() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="max-w-md w-full mx-auto text-center space-y-8">
                <div className="relative">
                    <h1 className="text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-purple-600">
                        404
                    </h1>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-10">
                        {mounted && (
                            <div className="glitch-container">
                                <div className="glitch-text" data-text="404">404</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-center">
                        <Frown className="h-12 w-12 text-slate-500" />
                    </div>
                    <h2 className="text-2xl font-bold">עמוד לא נמצא</h2>
                    <p className="text-gray-400">
                        העמוד שניסיתם לנווט אליו אינו קיים או שהרשומה נמחקה או שאין לכם גישה לגשת למשאב הזה.
                    </p>
                </div>

                <div className="pt-6">
                    <Link href="/">
                        <Button className="bg-gradient-to-r from-purple-800 to-purple-600 hover:from-slate-600 hover:to-purple-700 text-white">
                            חזרה לדף הבית
                            <ArrowLeft className="mr-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            {mounted && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="noise-bg"></div>
                </div>
            )}
        </div>
    )
}
