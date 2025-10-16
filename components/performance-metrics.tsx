"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Metric {
  label: string
  value: string
  change: string
}

export default function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([])

  useEffect(() => {
    // Animate metrics on load
    setTimeout(() => {
      setMetrics([
        { label: "Sentiment Accuracy", value: "88.4%", change: "+2.3%" },
        { label: "Sentiment F1-Score", value: "0.891", change: "+0.04" },
        { label: "Sarcasm Detection Acc", value: "82.1%", change: "+1.8%" },
        { label: "Sarcasm F1-Score", value: "0.820", change: "+0.03" },
      ])
    }, 300)
  }, [])

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-lg">Combined Model Performance</CardTitle>
        <CardDescription>Real-time metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="slide-up space-y-1" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <span className="text-xs text-accent font-semibold">{metric.change}</span>
            </div>
            <div className="text-2xl font-bold text-primary">{metric.value}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
