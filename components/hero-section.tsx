interface HeroSectionProps {
  title: string
  subtitle?: string
  description: string
  imageQuery: string
  pageName?: string
}

export function HeroSection({ title, subtitle, description, imageQuery, pageName }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={pageName ? `/images/hero/${pageName}.png` : `/.jpg?height=800&width=1600&query=${encodeURIComponent(imageQuery)}`}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        {/* Red tint overlay */}
        <div className="absolute inset-0 bg-red-900/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl">
          {subtitle && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-400 text-red-800 text-sm font-semibold mb-6">
              {subtitle}
            </span>
          )}

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance drop-shadow-lg">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl text-pretty">{description}</p>

          {/* Decorative line */}
          <div className="mt-8 flex items-center gap-4">
            <div className="h-1 w-20 bg-yellow-400 rounded-full" />
            <div className="h-1 w-10 bg-yellow-400/60 rounded-full" />
            <div className="h-1 w-5 bg-yellow-400/30 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
