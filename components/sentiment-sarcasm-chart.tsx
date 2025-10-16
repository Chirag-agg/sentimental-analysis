"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalysisResult } from "@/lib/sentiment-analysis"
import { useEffect, useState } from "react"

interface SentimentSarcasmChartProps {
  data: AnalysisResult[] | null
}

export default function SentimentSarcasmChart({ data }: SentimentSarcasmChartProps) {
  const [stats, setStats] = useState({
    totalAnalyzed: 0,
    sarcasmPercentage: 0,
    sentimentDistribution: {
      positive: 0,
      negative: 0,
      neutral: 0
    }
  })

  useEffect(() => {
    if (!data || data.length === 0) return

    const totalCount = data.length
    const sarcasmCount = data.filter(item => item.sarcasmDetected).length
    
    const sentimentCounts = data.reduce((acc, item) => {
      if (item.impliedSentiment === "POSITIVE") acc.positive++
      else if (item.impliedSentiment === "NEGATIVE") acc.negative++
      else acc.neutral++
      return acc
    }, { positive: 0, negative: 0, neutral: 0 })

    setStats({
      totalAnalyzed: totalCount,
      sarcasmPercentage: (sarcasmCount / totalCount) * 100,
      sentimentDistribution: {
        positive: (sentimentCounts.positive / totalCount) * 100,
        negative: (sentimentCounts.negative / totalCount) * 100,
        neutral: (sentimentCounts.neutral / totalCount) * 100
      }
    })
  }, [data])

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl">Sentiment & Sarcasm Insights</CardTitle>
        <CardDescription>Analysis of detected patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {stats.totalAnalyzed > 0 ? (
          <>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground font-medium">Sarcasm Detection Rate</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full transition-all duration-1000"
                    style={{ width: `${stats.sarcasmPercentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold">{stats.sarcasmPercentage.toFixed(1)}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground font-medium">Sentiment Distribution</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Positive</span>
                    <span className="text-xs font-medium">{stats.sentimentDistribution.positive.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-1000"
                      style={{ width: `${stats.sentimentDistribution.positive}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Neutral</span>
                    <span className="text-xs font-medium">{stats.sentimentDistribution.neutral.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-chart-4 rounded-full transition-all duration-1000"
                      style={{ width: `${stats.sentimentDistribution.neutral}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Negative</span>
                    <span className="text-xs font-medium">{stats.sentimentDistribution.negative.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-destructive rounded-full transition-all duration-1000"
                      style={{ width: `${stats.sentimentDistribution.negative}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No analysis data available yet. Analyze some text to see insights.
          </div>
        )}
      </CardContent>
    </Card>
  )
}