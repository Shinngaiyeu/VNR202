import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, Calendar, Play } from "lucide-react"
import Link from "next/link"

const eventDataMap: Record<string, {
  title: string
  date: string
  description: string
  content: string[]
  images: { query: string; caption: string }[]
  videoQuery?: string
}> = {
  "khai-thac-lan-1": {
    title: "Cuộc khai thác thuộc địa lần thứ nhất",
    date: "1897-1914",
    description: "Thời kỳ khai thác thuộc địa đầu tiên do Toàn quyền Paul Doumer thực hiện",
    content: [
      "Thời gian: Diễn ra từ năm 1897 đến năm 1914, do Toàn quyền Paul Doumer thực hiện.",
      "Mục đích: Biến Việt Nam thành thị trường tiêu thụ hàng hóa của Pháp, vơ vét tài nguyên và bóc lột nhân công rẻ mạt.",
      "Tác động xã hội: Làm biến đổi cơ cấu xã hội, phân hóa các giai cấp cũ (địa chủ, nông dân) và hình thành các giai cấp, tầng lớp mới (công nhân, tư sản, tiểu tư sản).",
      "Hậu quả chính trị: Mâu thuẫn giữa toàn thể dân tộc Việt Nam với thực dân Pháp và phong kiến phản động trở thành mâu thuẫn chủ yếu và gay gắt nhất.",
    ],
    images: [
      { query: "french colonial exploitation vietnam first phase mining", caption: "Khai thác mỏ thời Pháp thuộc" },
      { query: "paul doumer indochina governor vietnam", caption: "Toàn quyền Paul Doumer" },
      { query: "vietnamese workers colonial exploitation 1900s", caption: "Công nhân Việt Nam bị bóc lột" },
    ],
    videoQuery: "0-1X18fVbWY",
  },
  "khai-thac-lan-2": {
    title: "Cuộc khai thác thuộc địa lần thứ hai",
    date: "1919-1929",
    description: "Thời kỳ khai thác thuộc địa sau Chiến tranh thế giới thứ nhất",
    content: [
      "Thời gian: Diễn ra từ năm 1919 đến năm 1929 (sau Chiến tranh thế giới thứ nhất).",
      "Mục đích: Pháp đầu tư vốn lớn với tốc độ nhanh nhằm biến Đông Dương thành thị trường tiêu thụ hàng hóa, vơ vét tài nguyên và bóc lột nhân công rẻ mạt để bù đắp thiệt hại sau chiến tranh.",
      "Tác động xã hội: Làm sâu sắc thêm sự phân hóa giai cấp trong xã hội Việt Nam. Giai cấp công nhân: Tăng nhanh về số lượng (đến năm 1929 có hơn 22 vạn người) và trưởng thành về chất lượng. Giai cấp tư sản: Ra đời, phân hóa thành tư sản mại bản và tư sản dân tộc. Tầng lớp tiểu tư sản: Phát triển đông đảo, nhạy bén với thời cuộc.",
      "Hậu quả chính trị: Mâu thuẫn giữa toàn thể dân tộc Việt Nam với thực dân Pháp trở nên gay gắt hơn bao giờ hết, tạo điều kiện cho các phong trào yêu nước theo khuynh hướng mới phát triển.",
    ],
    images: [
      { query: "french rubber plantation vietnam 1920s colonial", caption: "Đồn điền cao su thời Pháp" },
      { query: "vietnamese workers exploitation 1920s indochina", caption: "Công nhân bị bóc lột" },
      { query: "vietnam working class 1920s formation", caption: "Giai cấp công nhân hình thành" },
    ],
    videoQuery: "apnFTlbapXs",
  },
  "nan-doi-1945": {
    title: "Nạn đói khủng khiếp 1945",
    date: "1944-1945",
    description: "Thảm họa nạn đói làm 2 triệu người Việt Nam chết đói",
    content: [
      "Mức độ thảm khốc: Nạn đói diễn ra từ cuối năm 1944 đến đầu năm 1945 đã gây ra hậu quả cực kỳ nghiêm trọng, làm 2 triệu người dân chết đói.",
      "Tình trạng kinh tế: Nền kinh tế lúc đó xơ xác, tiêu điều, nông nghiệp bị hoang hóa nghiêm trọng với 50% ruộng đất bị bỏ hoang.",
      "Tác động đến Cách mạng: Khẩu hiệu \"Phá kho thóc, giải quyết nạn đói\" của Đảng trong cao trào kháng Nhật cứu nước đã thổi bùng ngọn lửa căm thù và huy động đông đảo quần chúng vùng lên khởi nghĩa.",
      "Biện pháp khắc phục của Đảng (Sau 2/9/1945): Xác định \"diệt giặc đói\" là nhiệm vụ cấp bách hàng đầu. Phát động phong trào \"Tăng gia sản xuất\" (với khẩu hiệu \"Tấc đất tấc vàng\"), thực hành tiết kiệm, lập \"Hũ gạo cứu đói\", tổ chức \"Tuần lễ vàng\". Bãi bỏ thuế thân, giảm tô 25%, chia lại ruộng đất công và ruộng đất của đế quốc cho nông dân.",
      "Kết quả: Nhờ các biện pháp quyết liệt, đến đầu năm 1946, nạn đói cơ bản được đẩy lùi.",
    ],
    images: [
      { query: "vietnam great famine 1945 starvation", caption: "Nạn đói 1945 - Thảm họa nhân đạo" },
      { query: "vietnamese people famine 1945 suffering", caption: "Người dân chết đói hàng loạt" },
      { query: "vietnam rice rescue campaign 1945", caption: "Phong trào cứu đói sau Cách mạng" },
    ],
    videoQuery: "EXrUqklfAao",
  },
}

export default async function EventPage({ params }: { params: Promise<{ category: string; event: string }> }) {
  const { category, event } = await params

  const eventData = eventDataMap[event] || {
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
              {eventData.videoQuery && (
                <div className="mb-12">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Video tư liệu</h2>
                  <div className="aspect-video relative rounded-xl overflow-hidden bg-muted shadow-xl">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${eventData.videoQuery}`}
                      title="Video tư liệu"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
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
