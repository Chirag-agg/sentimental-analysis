"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SentimentDistribution() {
  const [expandedSegment, setExpandedSegment] = useState<string | null>(null)

  const segments = [
    { label: "Positive", value: 45, color: "#00ff41", subBreakdown: { genuine: 38, sarcastic: 7 } },
    { label: "Negative", value: 35, color: "#ff3333", subBreakdown: { genuine: 32, sarcastic: 3 } },
    { label: "Neutral", value: 20, color: "#ffa500", subBreakdown: { genuine: 18, sarcastic: 2 } },
  ]

  const total = segments.reduce((sum, seg) => sum + seg.value, 0)

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-lg">Dataset Nuance Breakdown</CardTitle>
        <CardDescription>Click segments for details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Donut Chart */}
        <div className="flex justify-center">
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {segments.map((segment, idx) => {
                const percentage = (segment.value / total) * 100
                const circumference = 2 * Math.PI * 30
                const offset = circumference - (percentage / 100) * circumference
                const startAngle = segments.slice(0, idx).reduce((sum, s) => sum + (s.value / total) * 360, 0)

                return (
                  <circle
                    key={idx}
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke={segment.color}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{
                      transform: `rotate(${startAngle}deg)`,
                      transformOrigin: "50px 50px",
                      cursor: "pointer",
                      opacity: expandedSegment === segment.label ? 1 : 0.8,
                      transition: "opacity 0.3s",
                    }}
                    onClick={() => setExpandedSegment(expandedSegment === segment.label ? null : segment.label)}
                  />
                )
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{total}</div>
                <div className="text-xs text-muted-foreground">samples</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {segments.map((segment) => (
            <div
              key={segment.label}
              onClick={() => setExpandedSegment(expandedSegment === segment.label ? null : segment.label)}
              className="cursor-pointer p-2 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
                  <span className="text-sm font-medium text-foreground">{segment.label}</span>
                </div>
                <span className="text-sm font-semibold text-primary">{segment.value}</span>
              </div>

              {expandedSegment === segment.label && (
                <div className="ml-5 text-xs text-muted-foreground space-y-1 slide-up">
                  <div>Genuine: {segment.subBreakdown.genuine}</div>
                  <div className="text-secondary">Sarcastic: {segment.subBreakdown.sarcastic}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
