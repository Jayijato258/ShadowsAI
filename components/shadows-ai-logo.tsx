"use client"

interface ShadowsAILogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "full" | "icon" | "text"
  className?: string
}

export function ShadowsAILogo({ size = "md", variant = "full", className = "" }: ShadowsAILogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
    xl: "h-24",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-5xl",
  }

  const IconComponent = () => (
    <div className={`${sizeClasses[size]} aspect-square relative flex items-center justify-center`}>
      {/* Neural network inspired geometric design */}
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main circle */}
        <circle cx="50" cy="50" r="45" fill="url(#shadowGradient)" className="drop-shadow-lg" />

        {/* Neural network nodes */}
        <circle cx="30" cy="25" r="4" fill="white" opacity="0.9" filter="url(#glow)" />
        <circle cx="70" cy="25" r="4" fill="white" opacity="0.9" filter="url(#glow)" />
        <circle cx="50" cy="40" r="5" fill="white" opacity="1" filter="url(#glow)" />
        <circle cx="25" cy="60" r="4" fill="white" opacity="0.8" filter="url(#glow)" />
        <circle cx="75" cy="60" r="4" fill="white" opacity="0.8" filter="url(#glow)" />
        <circle cx="50" cy="75" r="4" fill="white" opacity="0.9" filter="url(#glow)" />

        {/* Connecting lines */}
        <line x1="30" y1="25" x2="50" y2="40" stroke="white" strokeWidth="1.5" opacity="0.6" />
        <line x1="70" y1="25" x2="50" y2="40" stroke="white" strokeWidth="1.5" opacity="0.6" />
        <line x1="50" y1="40" x2="25" y2="60" stroke="white" strokeWidth="1.5" opacity="0.6" />
        <line x1="50" y1="40" x2="75" y2="60" stroke="white" strokeWidth="1.5" opacity="0.6" />
        <line x1="25" y1="60" x2="50" y2="75" stroke="white" strokeWidth="1.5" opacity="0.6" />
        <line x1="75" y1="60" x2="50" y2="75" stroke="white" strokeWidth="1.5" opacity="0.6" />

        {/* Central AI symbol */}
        <text x="50" y="55" textAnchor="middle" className="fill-white font-bold text-xs" style={{ fontSize: "12px" }}>
          AI
        </text>
      </svg>
    </div>
  )

  const TextComponent = () => (
    <div className={`${textSizeClasses[size]} font-bold tracking-tight`}>
      <span className="text-foreground">Shadows</span>
      <span className="text-primary ml-1">AI</span>
    </div>
  )

  if (variant === "icon") {
    return (
      <div className={className}>
        <IconComponent />
      </div>
    )
  }

  if (variant === "text") {
    return (
      <div className={className}>
        <TextComponent />
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <IconComponent />
      <TextComponent />
    </div>
  )
}
