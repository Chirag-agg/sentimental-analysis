"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdvancedAnalysisResult } from "@/lib/advanced-sentiment-analysis"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SentimentVisualizationProps {
  analysisHistory: AdvancedAnalysisResult[];
}

export default function SentimentVisualization({ analysisHistory }: SentimentVisualizationProps) {
  const [stats, setStats] = useState({
    totalAnalyzed: 0,
    positiveCount: 0,
    negativeCount: 0,
    neutralCount: 0,
    sarcasmCount: 0,
    averageEmotionalIntensity: 0,
    topEmotions: [] as string[],
  });

  useEffect(() => {
    if (analysisHistory.length === 0) return;

    // Calculate statistics
    const positiveCount = analysisHistory.filter(item => item.impliedSentiment === 'positive').length;
    const negativeCount = analysisHistory.filter(item => item.impliedSentiment === 'negative').length;
    const neutralCount = analysisHistory.filter(item => item.impliedSentiment === 'neutral').length;
    const sarcasmCount = analysisHistory.filter(item => item.sarcasmDetected).length;
    
    // Calculate average emotional intensity
    const totalIntensity = analysisHistory.reduce((sum, item) => sum + item.emotionalIntensity, 0);
    const averageIntensity = totalIntensity / analysisHistory.length;
    
    // Find top emotions
    const emotionCounts: Record<string, number> = {};
    analysisHistory.forEach(item => {
      item.dominantEmotions.forEach(emotion => {
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
      });
    });
    
    const topEmotions = Object.entries(emotionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([emotion]) => emotion);
    
    setStats({
      totalAnalyzed: analysisHistory.length,
      positiveCount,
      negativeCount,
      neutralCount,
      sarcasmCount,
      averageEmotionalIntensity: averageIntensity,
      topEmotions,
    });
  }, [analysisHistory]);

  const sentimentPercentage = (count: number) => {
    return stats.totalAnalyzed > 0 ? Math.round((count / stats.totalAnalyzed) * 100) : 0;
  };

  const sarcasmPercentage = () => {
    return stats.totalAnalyzed > 0 ? Math.round((stats.sarcasmCount / stats.totalAnalyzed) * 100) : 0;
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Sentiment Analysis Dashboard</span>
          <Badge variant="outline">{stats.totalAnalyzed} texts analyzed</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sentiment" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sentiment">Sentiment Distribution</TabsTrigger>
            <TabsTrigger value="sarcasm">Sarcasm & Emotions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sentiment" className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Positive</span>
                  <span>{sentimentPercentage(stats.positiveCount)}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary/20">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ width: `${sentimentPercentage(stats.positiveCount)}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Negative</span>
                  <span>{sentimentPercentage(stats.negativeCount)}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary/20">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{ width: `${sentimentPercentage(stats.negativeCount)}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Neutral</span>
                  <span>{sentimentPercentage(stats.neutralCount)}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary/20">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${sentimentPercentage(stats.neutralCount)}%` }}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sarcasm" className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Sarcasm Detected</span>
                  <span>{sarcasmPercentage()}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary/20">
                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{ width: `${sarcasmPercentage()}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Emotional Intensity</span>
                  <span>{Math.round(stats.averageEmotionalIntensity * 100)}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary/20">
                  <div
                    className="h-full rounded-full bg-purple-500"
                    style={{ width: `${stats.averageEmotionalIntensity * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <div className="text-sm font-medium mb-2">Top Emotions</div>
                <div className="flex flex-wrap gap-2">
                  {stats.topEmotions.map((emotion, index) => (
                    <Badge key={index} variant="secondary" className="capitalize">
                      {emotion}
                    </Badge>
                  ))}
                  {stats.topEmotions.length === 0 && (
                    <span className="text-sm text-muted-foreground">No emotions detected yet</span>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}