"use client"

import { useState } from "react"
import AnalysisCard from "@/components/analysis-card"
import Header from "@/components/header"
import SentimentVisualization from "@/components/sentiment-visualization"
import BulkProcessor from "@/components/bulk-processor"
import { AdvancedAnalysisResult } from "@/lib/advanced-sentiment-analysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, LineChart, PieChart } from "lucide-react"

export default function Home() {
  const [analysisHistory, setAnalysisHistory] = useState<AdvancedAnalysisResult[]>([])

  const handleAnalysisResults = (results: AdvancedAnalysisResult | null) => {
    if (results) {
      setAnalysisHistory(prev => [...prev, results])
    }
  }

  const handleBulkResults = (results: AdvancedAnalysisResult[]) => {
    setAnalysisHistory(prev => [...prev, ...results])
  }

  return (
    <main className="min-h-screen bg-background bg-gradient-to-br from-background to-background/80">
      <Header />
      <div className="container mx-auto p-4 md:p-6 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-6 animate-slide-up">Sentiment Analysis Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="single" className="w-full">
              <TabsList className="mb-2 border-b border-gray-200 w-full flex space-x-6">
                <TabsTrigger value="single" className="pb-2 text-gray-600 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-700">
                  Single Text Analysis
                </TabsTrigger>
                <TabsTrigger value="bulk" className="pb-2 text-gray-600 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-700">
                  Bulk Processing
                </TabsTrigger>
              </TabsList>
              <TabsContent value="single">
                <AnalysisCard onResults={handleAnalysisResults} />
              </TabsContent>
              <TabsContent value="bulk">
                <BulkProcessor onComplete={handleBulkResults} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-8">
            <SentimentVisualization analysisHistory={analysisHistory} />
            
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-2 border-b border-gray-100">
                <CardTitle className="text-base font-medium text-gray-700">
                  Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-sm text-gray-600">Total Analyzed</span>
                    <span className="font-medium text-gray-800">{analysisHistory.length}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-sm text-gray-600">Sarcasm Detected</span>
                    <span className="font-medium text-indigo-600">
                      {analysisHistory.filter(item => item.sarcasmDetected).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Confidence</span>
                    <span className="font-medium text-blue-600">
                      {analysisHistory.length > 0 
                        ? Math.round(analysisHistory.reduce((sum, item) => sum + item.literalConfidence, 0) / analysisHistory.length * 100)
                        : 0}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
