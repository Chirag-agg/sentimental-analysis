"use client"

import { useState } from "react"
import { ArrowRight, Sparkles, Zap, TrendingUp, Shield, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnalysisCard from "@/components/analysis-card"
import Header from "@/components/header"
import SentimentVisualization from "@/components/sentiment-visualization"
import BulkProcessor from "@/components/bulk-processor"
import { AdvancedAnalysisResult } from "@/lib/advanced-sentiment-analysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false)
  const [analysisHistory, setAnalysisHistory] = useState<AdvancedAnalysisResult[]>([])

  const handleAnalysisResults = (results: AdvancedAnalysisResult | null) => {
    if (results) {
      setAnalysisHistory(prev => [...prev, results])
    }
  }

  const handleBulkResults = (results: AdvancedAnalysisResult[]) => {
    setAnalysisHistory(prev => [...prev, ...results])
  }

  if (showDashboard) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
        <Header />
        <div className="container mx-auto p-4 md:p-6 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-emerald-700 bg-clip-text text-transparent mb-2 animate-slide-up">
              Sentiment Analysis Dashboard
            </h1>
            <p className="text-slate-600 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Advanced AI-powered text analysis with real-time insights
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="single" className="w-full">
                <TabsList className="bg-white border border-slate-200 shadow-sm">
                  <TabsTrigger
                    value="single"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
                  >
                    Single Analysis
                  </TabsTrigger>
                  <TabsTrigger
                    value="bulk"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
                  >
                    Bulk Processing
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="single" className="animate-fade-in">
                  <AnalysisCard onResults={handleAnalysisResults} />
                </TabsContent>
                <TabsContent value="bulk" className="animate-fade-in">
                  <BulkProcessor onComplete={handleBulkResults} />
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-8">
              <SentimentVisualization analysisHistory={analysisHistory} />

              <Card className="border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/30">
                  <CardTitle className="text-lg font-semibold text-slate-800">
                    Analysis Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50/50 hover:bg-blue-50 transition-colors">
                      <span className="text-sm font-medium text-slate-700">Total Analyzed</span>
                      <span className="text-xl font-bold text-blue-600">{analysisHistory.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                      <span className="text-sm font-medium text-slate-700">Sarcasm Detected</span>
                      <span className="text-xl font-bold text-emerald-600">
                        {analysisHistory.filter(item => item.sarcasmDetected).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-amber-50/50 hover:bg-amber-50 transition-colors">
                      <span className="text-sm font-medium text-slate-700">Avg. Confidence</span>
                      <span className="text-xl font-bold text-amber-600">
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

        <div className="container mx-auto px-4 pt-20 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              AI-Powered Sentiment Analysis
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-slide-up">
              <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-emerald-700 bg-clip-text text-transparent">
                Understand Every
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Emotion & Intent
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Advanced sentiment analysis powered by cutting-edge AI. Detect emotions, sarcasm, and hidden meanings in text with unprecedented accuracy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                onClick={() => setShowDashboard(true)}
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Process thousands of texts in seconds with our optimized AI engine.</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800">Highly Accurate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Advanced algorithms detect nuances like sarcasm and context with 95%+ accuracy.</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800">Deep Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Visual analytics and detailed metrics help you understand sentiment trends.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent animate-slide-up">
              Ready to Transform Your Text Analysis?
            </h2>
            <p className="text-xl text-slate-600 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Join thousands of teams using our platform to understand customer feedback, social media sentiment, and more.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: '0.2s' }}
              onClick={() => setShowDashboard(true)}
            >
              Start Analyzing Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Nuance AI</span>
            </div>
            <p className="text-slate-600 text-sm">2025 Nuance AI. Advanced sentiment analysis powered by AI.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
