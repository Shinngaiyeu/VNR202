import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, Calendar, Play } from "lucide-react"
import Link from "next/link"

export default async function EventPage({ params }: { params: Promise<{ category: string; event: string }> }) {
  const { category, event } = await params

  // Sample event data - in a real app, this would come from a database
  const eventData = {
    title: "Sự kiện lịch sử",
    date: "1945",
    description: "Chi tiết về sự kiện lịch sử quan trọng trong giai đoạn trước Cách mạng Tháng Tám.",
    content: [
      "Đây là nội dung chi tiết về sự kiện lịch sử. Trong một ứng dụng thực tế, nội dung này sẽ được lấy từ cơ sở dữ liệu dựa trên tham số URL.",
      "Sự kiện này có ý nghĩa quan trọng trong tiến trình lịch sử đấu tranh giành độc lập của dân tộc Việt Nam.",
      "Những bài học kinh nghiệm từ sự kiện này vẫn còn giá trị đến ngày nay.",
    ],
    images: [
      { query: "vietnam historical event 1945", caption: "Hình ảnh tư liệu 1" },
      { query: "vietnamese revolution historical photo", caption: "Hình ảnh tư liệu 2" },
      { query: "vietnam independence movement 1940s", caption: "Hình ảnh tư liệu 3" },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Link
              href={`/boi-canh-truoc-1945/${category}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Link>

            <div className="flex items-center gap-2 text-primary text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              <span>{eventData.date}</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6 max-w-4xl">
              {eventData.title}
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl">{eventData.description}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Main content */}
              <div className="prose prose-lg max-w-none mb-12">
                {eventData.content.map((paragraph, index) => (
                  <p key={index} className="text-foreground leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Video section */}
              <div className="mb-12">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Video tư liệu</h2>
                <div className="aspect-video relative rounded-xl overflow-hidden bg-muted">
                  <img src="/vietnam-historical-documentary-footage.jpg" alt="Video tư liệu" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Images gallery */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Hình ảnh tư liệu</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {eventData.images.map((image, index) => (
                    <div key={index} className="group">
                      <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-muted mb-3">
                        <img
                          src={`/.jpg?height=300&width=400&query=${encodeURIComponent(image.query)}`}
                          alt={image.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground text-center">{image.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
