import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { TimelineEvent } from "@/components/timeline-event"

const events = [
  {
    date: "25/11/1945",
    title: "Chỉ thị Kháng chiến kiến quốc",
    description:
      "Trung ương Đảng ra Chỉ thị xác định kẻ thù chính là thực dân Pháp, nhiệm vụ hàng đầu là củng cố chính quyền, chống thực dân Pháp, bài trừ nội phản và cải thiện đời sống nhân dân.",
    href: "/chu-truong-duong-loi/chi-thi-khang-chien-kien-quoc",
    imageQuery: "vietnam communist party directive 1945 resistance",
  },
  {
    date: "6/1/1946",
    title: "Tổng tuyển cử Quốc hội khóa I",
    description:
      "Tổng tuyển cử bầu Quốc hội khóa I trên cả nước, đánh dấu bước ngoặt quan trọng trong việc xây dựng chính quyền dân chủ nhân dân.",
    href: "/chu-truong-duong-loi/tong-tuyen-cu-1946",
    imageQuery: "vietnam first general election january 1946",
  },
  {
    date: "2/3/1946",
    title: "Quốc hội họp phiên đầu tiên",
    description: "Quốc hội họp phiên đầu tiên, lập Chính phủ chính thức của nước Việt Nam Dân chủ Cộng hòa.",
    href: "/chu-truong-duong-loi/quoc-hoi-phien-dau-tien",
    imageQuery: "vietnam first national assembly session march 1946",
  },
  {
    date: "6/3/1946",
    title: "Hiệp định Sơ bộ",
    description:
      "Chủ tịch Hồ Chí Minh ký Hiệp định Sơ bộ với Pháp, công nhận Việt Nam là quốc gia tự do, tranh thủ thời gian hòa hoãn để xây dựng lực lượng.",
    href: "/chu-truong-duong-loi/hiep-dinh-so-bo",
    imageQuery: "ho chi minh signing preliminary agreement france march 1946",
  },
  {
    date: "12/7/1946",
    title: "Phá vụ án phố Ôn Như Hầu",
    description:
      "Lực lượng công an phá vụ án phố Ôn Như Hầu, đập tan âm mưu đảo chính của bọn Đại Việt và Quốc dân Đảng cấu kết với Pháp.",
    href: "/chu-truong-duong-loi/vu-an-on-nhu-hau",
    imageQuery: "vietnam police operation on nhu hau street 1946",
  },
  {
    date: "14/9/1946",
    title: "Tạm ước Việt - Pháp",
    description:
      "Ký Tạm ước với Pháp để kéo dài thời gian hòa bình, tiếp tục xây dựng lực lượng chuẩn bị cho kháng chiến lâu dài.",
    href: "/chu-truong-duong-loi/tam-uoc-1946",
    imageQuery: "vietnam france modus vivendi september 1946",
  },
  {
    date: "9/11/1946",
    title: "Hiến pháp đầu tiên",
    description:
      "Quốc hội thông qua bản Hiến pháp đầu tiên của nước Việt Nam Dân chủ Cộng hòa, đặt nền móng pháp lý cho Nhà nước.",
    href: "/chu-truong-duong-loi/hien-phap-1946",
    imageQuery: "vietnam first constitution november 1946",
  },
  {
    date: "19/12/1946",
    title: "Lời kêu gọi Toàn quốc kháng chiến",
    description:
      "Chủ tịch Hồ Chí Minh ra Lời kêu gọi toàn quốc kháng chiến khi thực dân Pháp bội ước, gây hấn. Cuộc kháng chiến chống thực dân Pháp bùng nổ trên cả nước.",
    href: "/chu-truong-duong-loi/loi-keu-goi-toan-quoc-khang-chien",
    imageQuery: "ho chi minh appeal national resistance december 1946",
  },
]

export default function ChuTruongDuongLoiPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection
          title="Chủ trương đường lối của Đảng"
          subtitle="Quyết sách sáng suốt 1945-1946"
          description="Những quyết định mang tính lịch sử của Đảng và Chủ tịch Hồ Chí Minh trong giai đoạn khó khăn nhất, từ chỉ thị Kháng chiến kiến quốc đến Lời kêu gọi Toàn quốc kháng chiến."
          imageQuery="ho chi minh communist party vietnam leadership 1945 1946"
          pageName="chu-truong-duong-loi"
        />

        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Các sự kiện quan trọng theo dòng thời gian
              </h2>

              <div className="mt-12">
                {events.map((event, index) => (
                  <TimelineEvent key={event.date} {...event} isLast={index === events.length - 1} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
