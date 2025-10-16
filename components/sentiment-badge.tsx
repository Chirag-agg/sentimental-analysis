export default function SentimentBadge({ sentiment }: { sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL" }) {
  /* Updated colors to professional palette */
  const colors = {
    POSITIVE: "bg-accent/15 text-accent border-accent/40",
    NEGATIVE: "bg-destructive/15 text-destructive border-destructive/40",
    NEUTRAL: "bg-chart-4/15 text-chart-4 border-chart-4/40",
  }

  const icons = {
    POSITIVE: "😊",
    NEGATIVE: "😞",
    NEUTRAL: "😐",
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${colors[sentiment]} font-semibold text-sm hover:scale-105 transition-transform`}
    >
      {icons[sentiment]}
      {sentiment}
    </div>
  )
}
