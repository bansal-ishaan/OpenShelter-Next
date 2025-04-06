"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { Shield, CreditCard } from "lucide-react"

export function NFTCard() {
    const { theme } = useTheme()
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const isDark = theme === "dark"

        // Set canvas dimensions
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight

        // Card background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        if (isDark) {
        gradient.addColorStop(0, "#1a1a2e")
        gradient.addColorStop(1, "#16213e")
        } else {
        gradient.addColorStop(0, "#f0f9ff")
        gradient.addColorStop(1, "#e0f2fe")
        }

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw pattern
        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
        ctx.lineWidth = 1

        // Grid pattern
        const gridSize = 20
        for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
        }

        for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
        }

        // Draw circles
        const circleCount = 5
        for (let i = 0; i < circleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = 30 + Math.random() * 50

        const circleGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        if (isDark) {
            circleGradient.addColorStop(0, "rgba(79, 70, 229, 0.2)")
            circleGradient.addColorStop(1, "rgba(79, 70, 229, 0)")
        } else {
            circleGradient.addColorStop(0, "rgba(79, 70, 229, 0.1)")
            circleGradient.addColorStop(1, "rgba(79, 70, 229, 0)")
        }

        ctx.fillStyle = circleGradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
        }

        // Draw logo
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)"
        ctx.font = "bold 24px Inter, sans-serif"
        ctx.fillText("OPENShelter", 30, 50)

        // Draw visa text
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"
        ctx.font = "16px Inter, sans-serif"
        ctx.fillText("DIGITAL VISA", 30, 80)

        // Draw chip
        ctx.fillStyle = isDark ? "#ffd700" : "#ffd700"
        ctx.fillRect(30, 100, 50, 40)

        // Draw lines on chip
        ctx.strokeStyle = isDark ? "#1a1a2e" : "#16213e"
        ctx.lineWidth = 2
        for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(30, 110 + i * 10)
        ctx.lineTo(80, 110 + i * 10)
        ctx.stroke()
        }

        // Draw placeholder name
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)"
        ctx.font = "bold 18px Inter, sans-serif"
        ctx.fillText("JOHN DOE", 30, canvas.height - 60)

        // Draw placeholder ID
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"
        ctx.font = "14px Inter, sans-serif"
        ctx.fillText("ID: 0x1234...5678", 30, canvas.height - 30)

        // Draw expiry
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"
        ctx.font = "14px Inter, sans-serif"
        ctx.fillText("VALID THRU: 04/28", canvas.width - 150, canvas.height - 30)
    }, [theme])

    return (
        <motion.div whileHover={{ rotate: 5, scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
        <Card className="overflow-hidden">
            <CardContent className="p-0">
            <div className="relative aspect-[1.586/1] w-full">
                <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
                <div className="absolute bottom-4 right-4 flex gap-2">
                <Shield className="h-8 w-8 text-primary" />
                <CreditCard className="h-8 w-8 text-primary" />
                </div>
            </div>
            </CardContent>
        </Card>
        </motion.div>
    )
}