// Advanced sentiment analysis model with improved accuracy and sarcasm detection

export interface AdvancedAnalysisResult {
  literalSentiment: 'positive' | 'negative' | 'neutral';
  literalConfidence: number;
  impliedSentiment: 'positive' | 'negative' | 'neutral';
  impliedConfidence: number;
  sarcasmDetected: boolean;
  sarcasmConfidence: number;
  emotionalIntensity: number;
  dominantEmotions: string[];
  contextualFactors: string[];
}

// Enhanced sentiment lexicon with weighted scores
const sentimentLexicon: Record<string, number> = {
  // Positive terms
  'amazing': 0.9, 'awesome': 0.8, 'excellent': 0.85, 'fantastic': 0.9, 'great': 0.7,
  'good': 0.6, 'happy': 0.7, 'love': 0.8, 'wonderful': 0.85, 'brilliant': 0.85,
  'perfect': 0.9, 'outstanding': 0.85, 'superb': 0.85, 'terrific': 0.8, 'delightful': 0.75,
  'pleased': 0.6, 'joy': 0.8, 'exciting': 0.7, 'impressed': 0.7, 'thrilled': 0.8,
  
  // Negative terms
  'awful': -0.8, 'bad': -0.6, 'terrible': -0.85, 'horrible': -0.9, 'disappointing': -0.7,
  'hate': -0.9, 'dislike': -0.7, 'poor': -0.6, 'worst': -0.9, 'annoying': -0.7,
  'frustrating': -0.8, 'pathetic': -0.8, 'disgusting': -0.85, 'dreadful': -0.8, 'miserable': -0.8,
  'upset': -0.7, 'angry': -0.8, 'furious': -0.9, 'outraged': -0.9, 'irritated': -0.6,
  
  // Intensifiers
  'very': 1.5, 'extremely': 1.8, 'incredibly': 1.7, 'absolutely': 1.6, 'totally': 1.5,
  'completely': 1.6, 'utterly': 1.7, 'really': 1.4, 'so': 1.3, 'quite': 1.2,
  
  // Negators
  'not': -1, 'never': -1, "don't": -1, "doesn't": -1, "didn't": -1,
  "won't": -1, "can't": -1, "couldn't": -1, "shouldn't": -1, "wouldn't": -1
};

// Emotion categories
const emotions: Record<string, string[]> = {
  'joy': ['happy', 'delighted', 'pleased', 'thrilled', 'excited', 'ecstatic', 'content'],
  'anger': ['angry', 'furious', 'outraged', 'irritated', 'annoyed', 'frustrated', 'mad'],
  'sadness': ['sad', 'unhappy', 'depressed', 'miserable', 'gloomy', 'heartbroken', 'down'],
  'fear': ['afraid', 'scared', 'terrified', 'anxious', 'worried', 'nervous', 'panicked'],
  'surprise': ['surprised', 'amazed', 'astonished', 'shocked', 'stunned', 'startled', 'dumbfounded'],
  'disgust': ['disgusted', 'repulsed', 'revolted', 'appalled', 'nauseated', 'offended', 'sickened']
};

// Enhanced sarcasm patterns with confidence weights
const sarcasmPatterns: Array<{pattern: RegExp, weight: number}> = [
  { pattern: /\byeah right\b|\bsuuure\b|\bsuure\b|\bsure thing\b/i, weight: 0.8 },
  { pattern: /\boh great\b|\bjust great\b|\bjust what I needed\b/i, weight: 0.7 },
  { pattern: /\bthanks a lot\b|\bthanks for nothing\b/i, weight: 0.75 },
  { pattern: /\bhow nice\b|\bhow wonderful\b|\bhow convenient\b/i, weight: 0.65 },
  { pattern: /\bwow\b.*\bimpressive\b/i, weight: 0.6 },
  { pattern: /\bI'm shocked\b|\bI'm surprised\b|\bI'm stunned\b/i, weight: 0.6 },
  { pattern: /\bexactly what I wanted\b|\bexactly what I needed\b/i, weight: 0.7 },
  { pattern: /\bcouldn't be happier\b|\bcouldn't be more thrilled\b/i, weight: 0.7 },
  { pattern: /\bbrilliant\b|\bgenius\b|\bso smart\b/i, weight: 0.65 },
  { pattern: /\bwhat a surprise\b/i, weight: 0.6 },
  { pattern: /(!+).*(!+)/i, weight: 0.5 }, // Multiple exclamation marks
  { pattern: /\b(ha){2,}\b/i, weight: 0.6 }, // Repeated "ha"
  { pattern: /\bwow\b.*\bamazing\b/i, weight: 0.55 },
  { pattern: /\bI love\b.*\bso much\b/i, weight: 0.5 },
  { pattern: /\bfantastic\b.*\breally\b/i, weight: 0.5 },
  { pattern: /\bexcellent\b.*\bservice\b/i, weight: 0.45 },
  { pattern: /\bperfect\b.*\btiming\b/i, weight: 0.5 },
  { pattern: /\bthank you\b.*\bso much\b/i, weight: 0.4 },
  { pattern: /\bI'm so happy\b/i, weight: 0.5 },
  { pattern: /\bjust my luck\b/i, weight: 0.7 }
];

// Contextual factors that might affect sentiment interpretation
const contextualFactors = [
  'question', 'hypothetical', 'conditional', 'past experience', 
  'future expectation', 'comparison', 'contrast', 'irony'
];

// Detect contextual factors in text
function detectContextualFactors(text: string): string[] {
  const factors: string[] = [];
  
  if (text.includes('?')) factors.push('question');
  if (/\bif\b|\bwould\b|\bcould\b|\bmight\b/i.test(text)) factors.push('hypothetical');
  if (/\bused to\b|\bpreviously\b|\bbefore\b|\bin the past\b/i.test(text)) factors.push('past experience');
  if (/\bwill\b|\bgoing to\b|\bexpect\b|\bhope\b/i.test(text)) factors.push('future expectation');
  if (/\bbetter than\b|\bworse than\b|\bmore\b|\bless\b/i.test(text)) factors.push('comparison');
  if (/\bbut\b|\bhowever\b|\balthough\b|\bdespite\b/i.test(text)) factors.push('contrast');
  if (/\bironic\b|\birony\b/i.test(text)) factors.push('irony');
  
  return factors;
}

// Detect dominant emotions in text
function detectEmotions(text: string): string[] {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const emotionCounts: Record<string, number> = {};
  
  Object.entries(emotions).forEach(([emotion, terms]) => {
    emotionCounts[emotion] = 0;
    terms.forEach(term => {
      if (words.includes(term)) {
        emotionCounts[emotion]++;
      }
    });
  });
  
  // Get emotions with counts > 0, sorted by count
  const dominantEmotions = Object.entries(emotionCounts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([emotion]) => emotion);
  
  return dominantEmotions.length > 0 ? dominantEmotions : ['neutral'];
}

// Calculate literal sentiment with improved algorithm
function calculateLiteralSentiment(text: string): { sentiment: 'positive' | 'negative' | 'neutral', confidence: number } {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  let score = 0;
  let relevantWords = 0;
  let multiplier = 1;
  let negationActive = false;
  let negationWindow = 0;
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    
    // Check if word is a negator
    if (['not', 'never', "don't", "doesn't", "didn't", "won't", "can't", "couldn't", "shouldn't", "wouldn't"].includes(word)) {
      negationActive = true;
      negationWindow = 4; // Apply negation to the next 4 words
      multiplier = -1;
      continue;
    }
    
    // Check if word is an intensifier
    if (['very', 'extremely', 'incredibly', 'absolutely', 'totally', 'completely', 'utterly', 'really', 'so', 'quite'].includes(word)) {
      multiplier = multiplier * 1.5;
      continue;
    }
    
    // Check if word has sentiment
    if (sentimentLexicon[word]) {
      score += sentimentLexicon[word] * multiplier;
      relevantWords++;
      
      // Only reset multiplier if it's from an intensifier, not from negation
      if (!negationActive) {
        multiplier = 1;
      }
    }
    
    // Decrease negation window
    if (negationActive) {
      negationWindow--;
      if (negationWindow <= 0) {
        negationActive = false;
        multiplier = 1;
      }
    }
  }
  
  // Calculate final sentiment and confidence
  let sentiment: 'positive' | 'negative' | 'neutral';
  let confidence: number;
  
  if (relevantWords === 0) {
    sentiment = 'neutral';
    confidence = 1.0;
  } else {
    const normalizedScore = score / Math.max(1, relevantWords);
    
    if (normalizedScore > 0.2) {
      sentiment = 'positive';
      confidence = Math.min(Math.abs(normalizedScore), 1);
    } else if (normalizedScore < -0.2) {
      sentiment = 'negative';
      confidence = Math.min(Math.abs(normalizedScore), 1);
    } else {
      sentiment = 'neutral';
      confidence = 1 - Math.min(Math.abs(normalizedScore) * 3, 0.5);
    }
  }
  
  return { sentiment, confidence };
}

// Detect sarcasm with improved pattern recognition
function detectSarcasm(text: string, literalSentiment: 'positive' | 'negative' | 'neutral'): { detected: boolean, confidence: number } {
  let sarcasmScore = 0;
  let totalWeight = 0;
  
  // Check for sarcasm patterns
  sarcasmPatterns.forEach(({ pattern, weight }) => {
    if (pattern.test(text)) {
      sarcasmScore += weight;
      totalWeight += weight;
    }
  });
  
  // Check for sentiment contradictions (positive words in negative context or vice versa)
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  let positiveWords = 0;
  let negativeWords = 0;
  
  words.forEach(word => {
    if (sentimentLexicon[word] > 0.5) positiveWords++;
    if (sentimentLexicon[word] < -0.5) negativeWords++;
  });
  
  // Contradiction between positive words and negative context indicators
  const negativeContextIndicators = /\bbut\b|\bhowever\b|\balthough\b|\bdespite\b|\bunfortunately\b/i.test(text);
  
  if (literalSentiment === 'positive' && (negativeWords > 0 || negativeContextIndicators)) {
    sarcasmScore += 0.4;
    totalWeight += 0.4;
  }
  
  // Extreme positive sentiment can be sarcastic in certain contexts
  if (literalSentiment === 'positive' && /\bperfect\b|\bgreat\b|\bwonderful\b|\bamazing\b/i.test(text) && 
      (/\bjust\b|\breally\b|\bso\b/i.test(text))) {
    sarcasmScore += 0.3;
    totalWeight += 0.3;
  }
  
  // Check for excessive punctuation or capitalization
  if (/[!]{2,}/.test(text)) {
    sarcasmScore += 0.25;
    totalWeight += 0.25;
  }
  
  if (/[A-Z]{3,}/.test(text)) {
    sarcasmScore += 0.25;
    totalWeight += 0.25;
  }
  
  // Check for quotation marks which might indicate sarcasm
  if (/"[^"]*"/g.test(text)) {
    sarcasmScore += 0.2;
    totalWeight += 0.2;
  }
  
  // Calculate final sarcasm confidence
  const confidence = totalWeight > 0 ? sarcasmScore / totalWeight : 0;
  const detected = confidence > 0.5; // Lower threshold for better detection
  
  return { detected, confidence };
}

// Calculate implied sentiment based on literal sentiment and sarcasm
function calculateImpliedSentiment(
  literalSentiment: 'positive' | 'negative' | 'neutral',
  literalConfidence: number,
  sarcasmDetected: boolean,
  sarcasmConfidence: number
): { sentiment: 'positive' | 'negative' | 'neutral', confidence: number } {
  if (!sarcasmDetected) {
    return { sentiment: literalSentiment, confidence: literalConfidence };
  }
  
  // If sarcasm is detected, flip the sentiment with adjusted confidence
  let impliedSentiment: 'positive' | 'negative' | 'neutral';
  let impliedConfidence: number;
  
  if (literalSentiment === 'positive') {
    impliedSentiment = 'negative';
    impliedConfidence = literalConfidence * sarcasmConfidence;
  } else if (literalSentiment === 'negative') {
    impliedSentiment = 'positive';
    impliedConfidence = literalConfidence * sarcasmConfidence;
  } else {
    // If literal sentiment is neutral, implied sentiment remains neutral
    impliedSentiment = 'neutral';
    impliedConfidence = literalConfidence;
  }
  
  return { sentiment: impliedSentiment, confidence: impliedConfidence };
}

// Calculate emotional intensity
function calculateEmotionalIntensity(text: string): number {
  const exclamationCount = (text.match(/!/g) || []).length;
  const allCapsCount = (text.match(/\b[A-Z]{2,}\b/g) || []).length;
  const intensifierCount = (text.match(/\b(very|extremely|incredibly|absolutely|totally|completely|utterly|really|so|quite)\b/gi) || []).length;
  
  // Calculate intensity score (0-1)
  const intensityScore = Math.min(
    (exclamationCount * 0.2 + allCapsCount * 0.3 + intensifierCount * 0.2),
    1
  );
  
  return intensityScore;
}

// Main analysis function
export async function advancedAnalyzeText(text: string): Promise<AdvancedAnalysisResult> {
  try {
    // Handle empty or invalid input
    if (!text || typeof text !== 'string' || text.trim() === '') {
      return {
        literalSentiment: 'neutral',
        literalConfidence: 1.0,
        impliedSentiment: 'neutral',
        impliedConfidence: 1.0,
        sarcasmDetected: false,
        sarcasmConfidence: 0,
        emotionalIntensity: 0,
        dominantEmotions: ['neutral'],
        contextualFactors: []
      };
    }
    
    // Calculate literal sentiment
    const { sentiment: literalSentiment, confidence: literalConfidence } = calculateLiteralSentiment(text);
    
    // Detect sarcasm
    const { detected: sarcasmDetected, confidence: sarcasmConfidence } = detectSarcasm(text, literalSentiment);
    
    // Calculate implied sentiment
    const { sentiment: impliedSentiment, confidence: impliedConfidence } = calculateImpliedSentiment(
      literalSentiment,
      literalConfidence,
      sarcasmDetected,
      sarcasmConfidence
    );
    
    // Calculate emotional intensity
    const emotionalIntensity = calculateEmotionalIntensity(text);
    
    // Detect dominant emotions
    const dominantEmotions = detectEmotions(text);
    
    // Detect contextual factors
    const contextualFactors = detectContextualFactors(text);
    
    // Return comprehensive analysis result
    return {
      literalSentiment,
      literalConfidence,
      impliedSentiment,
      impliedConfidence,
      sarcasmDetected,
      sarcasmConfidence,
      emotionalIntensity,
      dominantEmotions,
      contextualFactors
    };
  } catch (error) {
    console.error("Error in sentiment analysis:", error);
    // Return safe default values in case of error
    return {
      literalSentiment: 'neutral',
      literalConfidence: 0.5,
      impliedSentiment: 'neutral',
      impliedConfidence: 0.5,
      sarcasmDetected: false,
      sarcasmConfidence: 0,
      emotionalIntensity: 0,
      dominantEmotions: ['neutral'],
      contextualFactors: []
    };
  }
}