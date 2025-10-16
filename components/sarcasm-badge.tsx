import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SarcasmBadgeProps {
  confidence?: number;
}

export default function SarcasmBadge({ confidence = 0.8 }: SarcasmBadgeProps) {
  // Determine emoji based on confidence level
  const getEmoji = () => {
    if (confidence > 0.8) return "😏";
    if (confidence > 0.6) return "🙃";
    return "🤔";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            className="bg-indigo-500 hover:bg-indigo-600 text-white relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              SARCASM DETECTED {getEmoji()}
            </span>
            <span 
              className="absolute inset-0 bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ width: `${confidence * 100}%` }}
            />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Sarcasm detected with {Math.round(confidence * 100)}% confidence</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
