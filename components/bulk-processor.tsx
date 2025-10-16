"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { advancedAnalyzeText, AdvancedAnalysisResult } from "@/lib/advanced-sentiment-analysis"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, FileText } from "lucide-react"

interface BulkProcessorProps {
  onComplete?: (results: AdvancedAnalysisResult[]) => void;
}

export default function BulkProcessor({ onComplete }: BulkProcessorProps) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<AdvancedAnalysisResult[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleProcess = async () => {
    if (!input.trim()) return

    setLoading(true)
    setError(null)
    setProgress(0)
    setResults([])

    try {
      // Split input by new lines, filter out empty lines
      const texts = input.split('\n').filter(text => text.trim().length > 0)
      const totalTexts = texts.length
      const batchResults: AdvancedAnalysisResult[] = []

      for (let i = 0; i < totalTexts; i++) {
        const text = texts[i]
        // Process each text
        const result = await advancedAnalyzeText(text)
        batchResults.push(result)
        
        // Update progress
        setProgress(Math.round(((i + 1) / totalTexts) * 100))
      }

      setResults(batchResults)
      
      // Call onComplete callback if provided
      if (onComplete) {
        onComplete(batchResults)
      }
    } catch (err) {
      console.error("Bulk processing error:", err)
      setError("An error occurred during bulk processing. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getSummary = () => {
    if (results.length === 0) return null

    const positiveCount = results.filter(r => r.impliedSentiment === 'positive').length
    const negativeCount = results.filter(r => r.impliedSentiment === 'negative').length
    const neutralCount = results.filter(r => r.impliedSentiment === 'neutral').length
    const sarcasmCount = results.filter(r => r.sarcasmDetected).length

    return {
      total: results.length,
      positive: positiveCount,
      negative: negativeCount,
      neutral: neutralCount,
      sarcasm: sarcasmCount,
      positivePercent: Math.round((positiveCount / results.length) * 100),
      negativePercent: Math.round((negativeCount / results.length) * 100),
      neutralPercent: Math.round((neutralCount / results.length) * 100),
      sarcasmPercent: Math.round((sarcasmCount / results.length) * 100)
    }
  }

  const summary = getSummary()

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Bulk Text Analysis
        </CardTitle>
        <CardDescription>
          Process multiple texts at once (one text per line)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Textarea
            placeholder="Enter multiple texts to analyze (one per line)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-32"
            disabled={loading}
          />
          
          {loading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {summary && (
            <div className="rounded-lg border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Analysis Summary</h3>
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>{summary.total} texts processed</span>
                </Badge>
              </div>
              
              <div className="grid gap-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Positive</span>
                    <span>{summary.positive} ({summary.positivePercent}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary/20">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{ width: `${summary.positivePercent}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Negative</span>
                    <span>{summary.negative} ({summary.negativePercent}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary/20">
                    <div
                      className="h-full rounded-full bg-red-500"
                      style={{ width: `${summary.negativePercent}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Neutral</span>
                    <span>{summary.neutral} ({summary.neutralPercent}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary/20">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${summary.neutralPercent}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Sarcasm Detected</span>
                    <span>{summary.sarcasm} ({summary.sarcasmPercent}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary/20">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{ width: `${summary.sarcasmPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleProcess} 
          disabled={loading || !input.trim()}
          className="w-full"
        >
          {loading ? `Processing (${progress}%)` : "Process All Texts"}
        </Button>
      </CardFooter>
    </Card>
  )
}