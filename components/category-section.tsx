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
  "chinh-tri": {
    bg: "bg-gradient-to-br from-red-50 to-yellow-50/50 bg-pattern",
    icon: "bg-red-600 text-yellow-400",
    accent: "text-red-600",
    border: "border-red-200",
  },
  "kinh-te": {
    bg: "bg-gradient-to-br from-yellow-50 to-red-50/50 bg-pattern",
    icon: "bg-yellow-500 text-red-700",
    accent: "text-yellow-600",
    border: "border-yellow-200",
  },
  "giao-duc": {
    bg: "bg-gradient-to-br from-red-50/80 to-yellow-50/80 bg-pattern",
    icon: "bg-red-700 text-yellow-300",
    accent: "text-red-700",
    border: "border-red-200",
  },
  "quan-su": {
    bg: "bg-gradient-to-br from-yellow-50/80 to-red-50/80 bg-pattern",
    icon: "bg-yellow-600 text-red-800",
    accent: "text-yellow-700",
    border: "border-yellow-200",
  },
}

interface CategorySectionProps {
  category: "chinh-tri" | "kinh-te" | "giao-duc" | "quan-su"
  title: string
  description: string
  href: string
  imageQuery: string
  index: number
}

export function CategorySection({ category, title, description, href, imageQuery, index }: CategorySectionProps) {
  const Icon = categoryIcons[category]
  const colors = categoryColors[category]
  const isReversed = index % 2 === 1

  return (
    <section className={cn("py-16 md:py-24", colors.bg)}>
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",
            isReversed && "lg:grid-flow-dense",
          )}
        >
          {/* Icon & Title Side */}
          <div className={cn("space-y-6", isReversed && "lg:col-start-2")}>
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg",
                  colors.icon,
                )}
              >
                <Icon className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div>
                <span className={cn("text-sm font-medium uppercase tracking-wider", colors.accent)}>Lĩnh vực</span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>

            <Link
              href={href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all shadow-md hover:shadow-lg hover:gap-3 bg-red-600 text-white hover:text-yellow-400"
            >
              Xem chi tiết
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Image Side */}
          <div className={cn("relative", isReversed && "lg:col-start-1")}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={`/images/${category}-${href.includes('truoc-1945') ? 'truoc' : 'sau'}-1945.png`}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Decorative elements */}
            <div
              className={cn(
                "absolute -z-10 w-full h-full rounded-2xl top-4 -right-4 opacity-20",
                colors.border,
                "border-4",
              )}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
