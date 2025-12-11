import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, BookOpen, Clock, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[70vh] flex items-center">
          <div className="absolute inset-0">
            <img
              src="/images/image.png"
              alt="Biểu tượng Đảng Cộng sản Việt Nam"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
          </div>

          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-yellow-400 text-sm font-medium mb-6 border border-yellow-400/30">
                Lịch Sử Việt Nam
              </span>

              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight text-balance drop-shadow-lg">
                Cách Mạng Tháng Tám <br />
                <span className="text-yellow-400">1945</span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-10 text-pretty drop-shadow">
                Khám phá hành trình đấu tranh giành độc lập của dân tộc Việt Nam, từ những ngày tháng đen tối dưới ách
                thực dân đến thắng lợi vẻ vang của Cách mạng Tháng Tám.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/boi-canh-truoc-1945"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg"
                >
                  Bắt đầu tìm hiểu
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/chu-truong-duong-loi"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl font-medium hover:bg-white/20 transition-colors"
                >
                  Chủ trương của Đảng
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <blockquote className="max-w-4xl mx-auto text-center">
              <p className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed italic mb-6">
                "Phòng trưng bày hậu quả chất độc da cam là nơi mà thời gian như ngừng lại. Đây không chỉ là ký ức lịch
                sử — đó là lời kêu gọi về lòng nhân ái, sự đồng cảm và trách nhiệm cùng nhau gìn giữ hòa bình cho thế hệ
                mai sau."
              </p>
            </blockquote>
          </div>
        </section> */}

        {/* Navigation Cards */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Khám phá các giai đoạn lịch sử
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tìm hiểu chi tiết về từng giai đoạn quan trọng trong lịch sử đấu tranh giành độc lập của dân tộc
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Card 1 */}
              <Link href="/boi-canh-truoc-1945" className="group">
                <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src="/french-colonial-vietnam-1940s-historical.jpg"
                      alt="Bối cảnh trước 1945"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
                      <Clock className="w-4 h-4" />
                      <span>Trước 1945</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      Bối cảnh trước 1945
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      Thời kỳ Pháp thuộc và những thuận lợi, khó khăn trước Cách mạng Tháng Tám
                    </p>
                  </div>
                </div>
              </Link>

              {/* Card 2 */}
              <Link href="/boi-canh-sau-1945" className="group">
                <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src="/vietnam-independence-day-1945-september-historical.jpg"
                      alt="Bối cảnh sau 1945"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Sau 2/9/1945</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      Bối cảnh sau 1945
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      Tình thế "Ngàn cân treo sợi tóc" và những thách thức sau ngày độc lập
                    </p>
                  </div>
                </div>
              </Link>

              {/* Card 3 */}
              <Link href="/chu-truong-duong-loi" className="group">
                <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src="/ho-chi-minh-declaration-independence-vietnam-1945.jpg"
                      alt="Chủ trương đường lối"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
                      <Users className="w-4 h-4" />
                      <span>Đường lối</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      Chủ trương đường lối của Đảng
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      Quyết sách sáng suốt và các sự kiện quan trọng từ 1945-1946
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1945</div>
                <div className="text-muted-foreground text-sm">Năm độc lập</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">15</div>
                <div className="text-muted-foreground text-sm">Năm chuẩn bị</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">2M+</div>
                <div className="text-muted-foreground text-sm">Người học chữ</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">2/9</div>
                <div className="text-muted-foreground text-sm">Ngày Quốc khánh</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
