"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ModelEvolution() {
  const [hoveredVersion, setHoveredVersion] = useState<number | null>(null)

  const data = [
    { version: "v1", sentiment: 82, sarcasm: 0.71 },
    { version: "v2", sentiment: 84, sarcasm: 0.75 },
    { version: "v3", sentiment: 86, sarcasm: 0.79 },
    { version: "v4", sentiment: 88.4, sarcasm: 0.82 },
  ]

  const maxSentiment = 100
  const maxSarcasm = 1

  return (
    <Card className="border-slate-200 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-lg">Model Evolution</CardTitle>
        <CardDescription>Performance over versions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Chart */}
        <div className="relative h-40 flex items-end gap-2">
          <svg className="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="none">
            {/* Sentiment Line */}
            <polyline
              points={data
                .map((d, i) => `${(i / (data.length - 1)) * 300},${150 - (d.sentiment / maxSentiment) * 120}`)
                .join(" ")}
              fill="none"
              stroke="#00d9ff"
              strokeWidth="2"
              className="draw-line"
              strokeDasharray="1000"
            />

            {/* Sarcasm Line */}
            <polyline
              points={data
                .map((d, i) => `${(i / (data.length - 1)) * 300},${150 - (d.sarcasm / maxSarcasm) * 120}`)
                .join(" ")}
              fill="none"
              stroke="#9f2b68"
              strokeWidth="2"
              className="draw-line"
              strokeDasharray="1000"
              style={{ animationDelay: "0.3s" }}
            />

            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((y) => (
              <line
                key={y}
                x1="0"
                y1={150 - y * 120}
                x2="300"
                y2={150 - y * 120}
                stroke="#2a3142"
                strokeWidth="0.5"
                opacity="0.3"
              />
            ))}
          </svg>

          {/* Data Points */}
          <div className="absolute inset-0 flex items-end justify-between px-2">
            {data.map((d, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1"
                onMouseEnter={() => setHoveredVersion(i)}
                onMouseLeave={() => setHoveredVersion(null)}
              >
                <div className="relative">
                  {hoveredVersion === i && (
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-card border border-slate-200 rounded px-2 py-1 text-xs whitespace-nowrap slide-up">
                      <div className="text-primary">Sentiment: {d.sentiment}%</div>
                      <div className="text-secondary">Sarcasm: {d.sarcasm}</div>
                    </div>
                  )}
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">Sentiment Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-muted-foreground">Sarcasm F1-Score</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
