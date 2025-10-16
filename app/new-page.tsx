"use client"

import { useState } from "react"
import AnalysisCard from "@/components/analysis-card"
import NewHeader from "@/components/NewHeader"
import SentimentVisualization from "@/components/sentiment-visualization"
import BulkProcessor from "@/components/bulk-processor"
import { AdvancedAnalysisResult } from "@/lib/advanced-sentiment-analysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewHome() {
  const [analysisHistory, setAnalysisHistory] = useState<AdvancedAnalysisResult[]>([])
  const [activeTab, setActiveTab] = useState("single")

  const handleAnalysisResults = (results: AdvancedAnalysisResult | null) => {
    if (results) {
      setAnalysisHistory(prev => [results, ...prev].slice(0, 10)) // Keep only last 10 analyses
    }
  }

  const handleBulkResults = (results: AdvancedAnalysisResult[]) => {
    setAnalysisHistory(prev => [...results, ...prev].slice(0, 10)) // Keep only last 10 analyses
  }

  const totalAnalyzed = analysisHistory.length
  const sarcasmCount = analysisHistory.filter(item => item.sarcasmDetected).length
  const avgConfidence = analysisHistory.length > 0 
    ? Math.round(analysisHistory.reduce((sum, item) => sum + item.literalConfidence, 0) / analysisHistory.length * 100)
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <NewHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Sentiment Analysis
          </h1>
          <p className="mt-2 text-muted-foreground">
            Analyze text for sentiment and detect sarcasm with AI-powered precision
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              <TabsList className="w-full h-14 px-4 bg-transparent">
                <TabsTrigger 
                  value="single" 
                  className="flex-1 h-10 data-[state=active]:bg-muted data-[state=active]:shadow-sm"
                >
                  Single Analysis
                </TabsTrigger>
                <TabsTrigger 
                  value="bulk" 
                  className="flex-1 h-10 data-[state=active]:bg-muted data-[state=active]:shadow-sm"
                >
                  Bulk Processing
                </TabsTrigger>
              </TabsList>
              
              <div className="p-6">
                <TabsContent value="single" className="m-0">
                  <AnalysisCard onResults={handleAnalysisResults} />
                </TabsContent>
                <TabsContent value="bulk" className="m-0">
                  <BulkProcessor onComplete={handleBulkResults} />
                </TabsContent>
              </div>
            </Tabs>

            {/* Recent Analyses */}
            {analysisHistory.length > 0 && (
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Recent Analyses</h3>
                <div className="space-y-4">
                  {analysisHistory.map((result, index) => (
                    <div key={index} className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {result.text.length > 60 ? `${result.text.substring(0, 60)}...` : result.text}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span className={`px-2 py-0.5 rounded-full ${
                              result.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                              result.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {result.sentiment}
                            </span>
                            {result.sarcasmDetected && (
                              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                                Sarcasm
                              </span>
                            )}
                            <span>{Math.round(result.literalConfidence * 100)}% confidence</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Analysis Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Analyzed</span>
                  <span className="font-medium">{totalAnalyzed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Sarcasm Detected</span>
                  <span className="font-medium text-purple-600">{sarcasmCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Confidence</span>
                  <div className="flex items-center">
                    <span className="font-medium text-blue-600">{avgConfidence}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sentiment Visualization */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Sentiment Overview</h3>
              <SentimentVisualization analysisHistory={analysisHistory} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
