import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, Calendar, Play } from "lucide-react"
import Link from "next/link"

const eventDataMap: Record<string, {
  title: string
  date: string
  description: string
  content: string[]
  images: { caption: string }[]
  videoQuery?: string
}> = {
  "tang-gia-san-xuat": {
    title: "Phong trào Tăng gia sản xuất",
    date: "1945-1946",
    description: "Phong trào đấu tranh chống nạn đói, xây dựng nền kinh tế độc lập",
    content: [
      "Bối cảnh: Ngay sau Cách mạng Tháng Tám, nước ta đối mặt với nạn đói khủng khiếp chưa từng có, hậu quả của chế độ thực dân và thiên tai, lũ lụt.",
      "Chủ trương của Đảng & Chính phủ: Xác định \"diệt giặc đói\" là nhiệm vụ cấp bách hàng đầu. Phát động các phong trào lớn với khẩu hiệu hành động quyết liệt: \"Tăng gia sản xuất ngay, tăng gia sản xuất nữa\". Khuyến khích sửa chữa đê điều, tổ chức khuyến nông, khai hoang phục hóa. Tịch thu ruộng đất của đế quốc, Việt gian chia cho nông dân nghèo.",
      "Kết quả: Sản xuất lương thực tăng lên rõ rệt cả về diện tích và sản lượng hoa màu. Đến đầu năm 1946, nạn đói cơ bản được đẩy lùi, đời sống nhân dân ổn định.",
    ],
    images: [
      { caption: "Phong trào Tăng gia sản xuất" },
      { caption: "Nông dân tích cực sản xuất" },
      { caption: "Chia ruộng đất cho nông dân" },
    ],
    videoQuery: "HvG5BEI1l8A",
  },
  "tuan-le-vang": {
    title: "Tuần lễ vàng",
    date: "1945",
    description: "Phong trào quyên góp xây dựng Quỹ độc lập",
    content: [
      "Bối cảnh: Khi mới giành chính quyền, nền tài chính nước nhà kiệt quệ, kho bạc trống rỗng do chế độ cũ để lại. Chính phủ cần nguồn lực tài chính để củng cố quốc phòng và kiến thiết đất nước.",
      "Chủ trương: Chính phủ phát động \"Tuần lễ vàng\" và xây dựng \"Quỹ độc lập\". Kêu gọi tinh thần yêu nước, sự đóng góp tự nguyện của mọi tầng lớp nhân dân vào ngân khố quốc gia.",
      "Ý nghĩa: Sự kiện này không chỉ giải quyết khó khăn tài chính trước mắt mà còn thể hiện lòng dân, sự ủng hộ tuyệt đối của nhân dân đối với chính quyền cách mạng non trẻ.",
    ],
    images: [
      { caption: "Tuần lễ vàng" },
      { caption: "Nhân dân quyên góp vàng" },
      { caption: "Xây dựng Quỹ độc lập" },
    ],
    videoQuery: "n5woKfh0ZUs",
  },
  "phat-hanh-tien": {
    title: "Phát hành tiền Việt Nam",
    date: "1946",
    description: "Phát hành đồng giấy bạc Việt Nam (giấy bạc Cụ Hồ)",
    content: [
      "Bối cảnh: Nền tài chính phụ thuộc, rối ren. Để khẳng định chủ quyền độc lập, Việt Nam cần có hệ thống tiền tệ riêng.",
      "Hành động: Xây dựng lại Ngân khố quốc gia. Chính thức phát hành đồng giấy bạc Việt Nam (còn gọi là giấy bạc Cụ Hồ).",
      "Ý nghĩa: Khẳng định chủ quyền tài chính độc lập của nước Việt Nam Dân chủ Cộng hòa. Là công cụ đắc lực để Chính phủ quản lý kinh tế, phục vụ sản xuất và chiến đấu.",
    ],
    images: [
      { caption: "Giấy bạc Cụ Hồ" },
      { caption: "Đồng tiền Việt Nam đầu tiên" },
      { caption: "Khẳng định chủ quyền tài chính" },
    ],
  },
}

export default async function EventPage({ params }: { params: Promise<{ category: string; event: string }> }) {
  const { category, event } = await params

  const eventData = eventDataMap[event] || {
    title: "Sự kiện lịch sử",
    date: "1945-1946",
    description: "Chi tiết về sự kiện lịch sử quan trọng sau ngày Độc lập 2/9/1945.",
    content: [
      "Đây là nội dung chi tiết về sự kiện lịch sử. Trong một ứng dụng thực tế, nội dung này sẽ được lấy từ cơ sở dữ liệu dựa trên tham số URL.",
      "Sự kiện này có ý nghĩa quan trọng trong việc xây dựng và bảo vệ chính quyền cách mạng non trẻ của Việt Nam.",
      "Những quyết sách sáng suốt trong giai đoạn này đã đặt nền móng vững chắc cho sự nghiệp cách mạng.",
    ],
    images: [
      { caption: "Hình ảnh tư liệu 1" },
      { caption: "Hình ảnh tư liệu 2" },
      { caption: "Hình ảnh tư liệu 3" },
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
              href={`/boi-canh-sau-1945/${category}`}
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
              {eventData.videoQuery && (
                <div className="mb-12">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Video tư liệu</h2>
                  <div className="aspect-video relative rounded-xl overflow-hidden bg-muted">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${eventData.videoQuery}`}
                      title="Video tư liệu"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0"
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Images gallery */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Hình ảnh tư liệu</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {eventData.images.map((image, index) => (
                    <div key={index} className="group">
                      <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-muted mb-3">
                        <img
                          src={`/images/gallery/${event}-${index + 1}.png`}
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
