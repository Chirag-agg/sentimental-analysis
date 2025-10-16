// Sentiment Analysis Model Integration
// This file simulates integration with a sentiment analysis model
// In a real-world scenario, this would connect to an actual ML model API

// Sample dataset for training (would be loaded from Kaggle in a real implementation)
const sampleDataset = [
  { text: "I love this product, it's amazing!", sentiment: "POSITIVE", sarcasm: false },
  { text: "This is the worst experience ever.", sentiment: "NEGATIVE", sarcasm: false },
  { text: "Yeah, sure, this is exactly what I wanted...", sentiment: "NEGATIVE", sarcasm: true },
  { text: "Well that's just perfect isn't it?", sentiment: "NEGATIVE", sarcasm: true },
  { text: "I'm completely fine with this.", sentiment: "NEUTRAL", sarcasm: false },
  { text: "Oh great, another delay. Just what we needed.", sentiment: "NEGATIVE", sarcasm: true },
  { text: "The service was okay, nothing special.", sentiment: "NEUTRAL", sarcasm: false },
  { text: "Wow, you're so smart for figuring that out!", sentiment: "NEGATIVE", sarcasm: true },
  { text: "This product exceeded my expectations!", sentiment: "POSITIVE", sarcasm: false },
  { text: "I can't believe how efficient this is!", sentiment: "POSITIVE", sarcasm: false },
];

// Sarcasm detection patterns (simplified for demonstration)
const sarcasmPatterns = [
  { pattern: /sure|exactly|perfect|great|wow|just what|oh great|genius/i, weight: 0.4 },
  { pattern: /\.\.\./i, weight: 0.3 },
  { pattern: /!/i, weight: -0.1 }, // Exclamation marks can indicate genuine excitement
  { pattern: /\?/i, weight: 0.2 }, // Questions in certain contexts can indicate sarcasm
  { pattern: /so|such|very|really|totally/i, weight: 0.3 }, // Intensifiers often used in sarcasm
];

// Sentiment lexicon (simplified for demonstration)
const sentimentLexicon = {
  positive: [
    "good", "great", "excellent", "amazing", "wonderful", "fantastic", "terrific", 
    "outstanding", "exceptional", "superb", "love", "best", "brilliant", "awesome",
    "happy", "pleased", "delighted", "satisfied", "enjoy", "impressive", "perfect"
  ],
  negative: [
    "bad", "terrible", "horrible", "awful", "poor", "disappointing", "worst",
    "hate", "dislike", "annoying", "frustrating", "useless", "pathetic", "mediocre",
    "failure", "mess", "problem", "issue", "broken", "waste", "difficult", "hard"
  ],
  neutral: [
    "okay", "ok", "fine", "average", "moderate", "acceptable", "decent", "fair",
    "standard", "common", "regular", "normal", "usual", "typical", "ordinary"
  ]
};

export interface AnalysisResult {
  literalSentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  literalConfidence: number;
  sarcasmDetected: boolean;
  sarcasmConfidence: number;
  impliedSentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  impliedConfidence: number;
}

// Function to detect sentiment based on lexicon
function detectSentiment(text: string): { sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL", confidence: number } {
  const words = text.toLowerCase().split(/\W+/);
  let positiveScore = 0;
  let negativeScore = 0;
  let neutralScore = 0;
  
  words.forEach(word => {
    if (sentimentLexicon.positive.includes(word)) positiveScore++;
    if (sentimentLexicon.negative.includes(word)) negativeScore++;
    if (sentimentLexicon.neutral.includes(word)) neutralScore++;
  });
  
  const total = positiveScore + negativeScore + neutralScore || 1;
  
  if (positiveScore > negativeScore && positiveScore > neutralScore) {
    return { sentiment: "POSITIVE", confidence: 0.5 + (positiveScore / total) * 0.5 };
  } else if (negativeScore > positiveScore && negativeScore > neutralScore) {
    return { sentiment: "NEGATIVE", confidence: 0.5 + (negativeScore / total) * 0.5 };
  } else {
    return { sentiment: "NEUTRAL", confidence: 0.5 + (neutralScore / total) * 0.5 };
  }
}

// Function to detect sarcasm
function detectSarcasm(text: string): { detected: boolean, confidence: number } {
  let sarcasmScore = 0;
  
  // Check for sarcasm patterns
  sarcasmPatterns.forEach(({ pattern, weight }) => {
    if (pattern.test(text)) {
      sarcasmScore += weight;
    }
  });
  
  // Check for sentiment contradictions (simplified)
  const { sentiment } = detectSentiment(text);
  
  // If text has positive words but overall negative sentiment or vice versa, it might be sarcasm
  const words = text.toLowerCase().split(/\W+/);
  const hasPositiveWords = words.some(word => sentimentLexicon.positive.includes(word));
  const hasNegativeWords = words.some(word => sentimentLexicon.negative.includes(word));
  
  if ((hasPositiveWords && sentiment === "NEGATIVE") || 
      (hasNegativeWords && sentiment === "POSITIVE")) {
    sarcasmScore += 0.3;
  }
  
  // Normalize score
  const normalizedScore = Math.min(Math.max(sarcasmScore, 0), 1);
  
  return { 
    detected: normalizedScore > 0.5,
    confidence: normalizedScore
  };
}

// Function to get implied sentiment (accounting for sarcasm)
function getImpliedSentiment(
  literalSentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL", 
  sarcasmDetected: boolean
): { sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL", confidence: number } {
  if (!sarcasmDetected) {
    return { sentiment: literalSentiment, confidence: 0.9 };
  }
  
  // If sarcasm is detected, the implied sentiment is often the opposite
  switch (literalSentiment) {
    case "POSITIVE":
      return { sentiment: "NEGATIVE", confidence: 0.7 };
    case "NEGATIVE":
      return { sentiment: "POSITIVE", confidence: 0.6 }; // Less confident in this direction
    default:
      return { sentiment: "NEGATIVE", confidence: 0.6 }; // Neutral with sarcasm tends to be negative
  }
}

// Main analysis function
export async function analyzeText(text: string): Promise<AnalysisResult> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Detect literal sentiment
  const { sentiment: literalSentiment, confidence: literalConfidence } = detectSentiment(text);
  
  // Detect sarcasm
  const { detected: sarcasmDetected, confidence: sarcasmConfidence } = detectSarcasm(text);
  
  // Get implied sentiment
  const { sentiment: impliedSentiment, confidence: impliedConfidence } = 
    getImpliedSentiment(literalSentiment, sarcasmDetected);
  
  return {
    literalSentiment,
    literalConfidence,
    sarcasmDetected,
    sarcasmConfidence,
    impliedSentiment,
    impliedConfidence
  };
}