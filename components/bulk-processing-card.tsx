"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BulkProcessingCard() {
  const [activeTab, setActiveTab] = useState<"batch" | "train">("batch")
  const [trainingEnabled, setTrainingEnabled] = useState(false)

  const mockBatchResults = [
    { id: 1, text: "This product is amazing!", sentiment: "POSITIVE", sarcasm: false, implied: "POSITIVE" },
    { id: 2, text: "Oh great, another bug...", sentiment: "POSITIVE", sarcasm: true, implied: "NEGATIVE" },
    { id: 3, text: "The weather is okay", sentiment: "NEUTRAL", sarcasm: false, implied: "NEUTRAL" },
  ]

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl">Bulk Processing & Model Enhancement</CardTitle>
        <CardDescription>Batch analysis and model training</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("batch")}
            className={`px-4 py-2 font-medium text-sm transition-all duration-300 border-b-2 ${
              activeTab === "batch"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Analyze Batch
          </button>
          <button
            onClick={() => setActiveTab("train")}
            className={`px-4 py-2 font-medium text-sm transition-all duration-300 border-b-2 ${
              activeTab === "train"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Train Model
          </button>
        </div>

        {/* Batch Tab */}
        {activeTab === "batch" && (
          <div className="space-y-4 fade-in">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">📁</div>
              <p className="text-foreground font-medium">Drag and drop CSV file here</p>
              <p className="text-sm text-muted-foreground">or click to browse</p>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Text</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Sentiment</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Sarcasm</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Implied</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBatchResults.map((row) => (
                    <tr key={row.id} className="border-b border-border hover:bg-primary/5 transition-colors">
                      <td className="py-3 px-4 text-foreground">{row.text}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            row.sentiment === "POSITIVE"
                              ? "bg-accent/20 text-accent"
                              : row.sentiment === "NEGATIVE"
                                ? "bg-destructive/20 text-destructive"
                                : "bg-chart-4/20 text-chart-4"
                          }`}
                        >
                          {row.sentiment}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            row.sarcasm ? "bg-secondary/20 text-secondary" : "bg-muted/20 text-muted-foreground"
                          }`}
                        >
                          {row.sarcasm ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            row.implied === "POSITIVE"
                              ? "bg-accent/20 text-accent"
                              : row.implied === "NEGATIVE"
                                ? "bg-destructive/20 text-destructive"
                                : "bg-chart-4/20 text-chart-4"
                          }`}
                        >
                          {row.implied}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Train Tab */}
        {activeTab === "train" && (
          <div className="space-y-4 fade-in">
            <p className="text-sm text-muted-foreground">
              Upload a labeled dataset (.csv) with text, sentiment, and sarcasm columns.
            </p>

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">📊</div>
              <p className="text-foreground font-medium">Upload training dataset</p>
              <p className="text-sm text-muted-foreground">CSV format with text, sentiment, sarcasm columns</p>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/10 border border-secondary/30">
              <label className="text-sm font-medium text-foreground">Enable Sarcasm Module Training</label>
              <button
                onClick={() => setTrainingEnabled(!trainingEnabled)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  trainingEnabled ? "bg-secondary" : "bg-border"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                    trainingEnabled ? "right-1" : "left-1"
                  }`}
                ></div>
              </button>
            </div>

            <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-2 rounded-lg transition-all duration-300">
              Start Training
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
