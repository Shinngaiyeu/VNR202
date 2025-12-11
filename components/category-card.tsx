import Link from "next/link"
import { ArrowRight, Landmark, Coins, GraduationCap, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const categoryIcons = {
  "chinh-tri": Landmark,
  "kinh-te": Coins,
  "giao-duc": GraduationCap,
  "quan-su": Shield,
}

const categoryColors = {
  "chinh-tri": "bg-red-50 bg-pattern-card border-red-200 hover:border-red-400",
  "kinh-te": "bg-amber-50 bg-pattern-card border-amber-200 hover:border-amber-400",
  "giao-duc": "bg-blue-50 bg-pattern-card border-blue-200 hover:border-blue-400",
  "quan-su": "bg-green-50 bg-pattern-card border-green-200 hover:border-green-400",
}

const iconColors = {
  "chinh-tri": "bg-red-100 text-red-600",
  "kinh-te": "bg-amber-100 text-amber-600",
  "giao-duc": "bg-blue-100 text-blue-600",
  "quan-su": "bg-green-100 text-green-600",
}

interface CategoryCardProps {
  category: "chinh-tri" | "kinh-te" | "giao-duc" | "quan-su"
  title: string
  description: string
  href: string
  imageQuery: string
  delay?: number
}

export function CategoryCard({ category, title, description, href, imageQuery, delay = 0 }: CategoryCardProps) {
  const Icon = categoryIcons[category]

  return (
    <div
      className={cn(
        "group rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg animate-fade-in",
        categoryColors[category],
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center", iconColors[category])}>
            <Icon className="w-8 h-8" />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed line-clamp-3">{description}</p>
          </div>

          <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
            <img
              src={`/.jpg?height=200&width=400&query=${encodeURIComponent(imageQuery)}`}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <Link
            href={href}
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            Xem chi tiết
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
