import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

interface TimelineEventProps {
  date: string
  title: string
  description: string
  href: string
  imageQuery: string
  isLast?: boolean
}

export function TimelineEvent({ date, title, description, href, imageQuery, isLast = false }: TimelineEventProps) {
  return (
    <div className="relative flex gap-6">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-md z-10" />
        {!isLast && <div className="w-0.5 flex-1 bg-border" />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{description}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="aspect-video sm:w-48 relative rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img
                src={`/.jpg?height=120&width=200&query=${encodeURIComponent(imageQuery)}`}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-end">
              <Link
                href={href}
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all"
              >
                Xem chi tiết sự kiện
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
