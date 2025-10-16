"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SentimentBadge from "./sentiment-badge"
import SarcasmBadge from "./sarcasm-badge"
import { advancedAnalyzeText, AdvancedAnalysisResult } from "@/lib/advanced-sentiment-analysis"

interface AnalysisResult extends AdvancedAnalysisResult {}

export default function AnalysisCard({ onResults }: { onResults: (results: AnalysisResult | null) => void }) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!input.trim()) return

    setLoading(true)
    setShowResults(false)
    setError(null)

    try {
      // Use our advanced sentiment analysis model
      const analysisResults = await advancedAnalyzeText(input);

      setResults(analysisResults)
      setLoading(false)
      setShowResults(true)
      onResults(analysisResults)
    } catch (error) {
      console.error("Error analyzing text:", error);
      setLoading(false);
      setError("An error occurred during analysis. Please try again.");
    }
  }

  return (
    <Card className="border-slate-200 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Sentiment & Sarcasm Analysis</CardTitle>
        <CardDescription>Real-time multi-layer sentiment detection</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Area */}
        <div className="space-y-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to analyze sentiment and detect sarcasm..."
            className="w-full h-32 px-4 py-3 rounded-lg bg-input border border-slate-200 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none pulse-glow-on-focus animate-fade-in"
            style={{
              boxShadow: input ? "0 0 20px rgba(0, 217, 255, 0.3)" : "none",
            }}
          />
          <Button
            onClick={handleAnalyze}
            disabled={!input.trim() || loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-lg transition-all duration-300 disabled:opacity-50 animate-slide-up"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                Analyzing...
              </span>
            ) : (
              "Analyze Text"
            )}
          </Button>
        </div>

        {/* Results Area */}
        {showResults && results && (
          <div className="space-y-4 pt-6 border-t border-slate-200 animate-fade-in">
            {/* Layer 1: Literal Sentiment */}
            <div className="slide-up space-y-2 animate-slide-up">
              <div className="text-sm text-muted-foreground font-medium">Layer 1: Literal Sentiment</div>
              <div className="flex items-center justify-between">
                <SentimentBadge sentiment={results.literalSentiment} />
                <div className="flex-1 mx-4 h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      results.literalSentiment === "POSITIVE"
                        ? "bg-accent"
                        : results.literalSentiment === "NEGATIVE"
                          ? "bg-destructive"
                          : "bg-chart-4"
                    }`}
                    style={{ width: `${results.literalConfidence * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-foreground w-12 text-right">
                  {(results.literalConfidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Layer 2: Sarcasm Detection */}
            {results.sarcasmDetected && (
              <div className="slide-up" style={{ animationDelay: "0.2s" }}>
                <SarcasmBadge confidence={results.sarcasmConfidence} />
              </div>
            )}

            {/* Layer 3: True Sentiment */}
            <div className="slide-up" style={{ animationDelay: results.sarcasmDetected ? "0.4s" : "0.2s" }}>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground font-medium">Layer 3: Implied Sentiment</div>
                <div className="flex items-center justify-between">
                  <SentimentBadge sentiment={results.impliedSentiment} />
                  <div className="flex-1 mx-4 h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        results.impliedSentiment === "POSITIVE"
                          ? "bg-accent"
                          : results.impliedSentiment === "NEGATIVE"
                            ? "bg-destructive"
                            : "bg-chart-4"
                      }`}
                      style={{ width: `${results.impliedConfidence * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-foreground w-12 text-right">
                    {(results.impliedConfidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
