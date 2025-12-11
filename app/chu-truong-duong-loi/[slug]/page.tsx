import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, Calendar, Play } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const eventData: Record<
  string,
  {
    title: string
    date: string
    description: string
    content: string[]
    images: { caption: string }[]
    videoQuery?: string
  }
> = {
  "chi-thi-khang-chien-kien-quoc": {
    title: "Chỉ thị Kháng chiến kiến quốc",
    date: "25/11/1945",
    description: "Trung ương Đảng ra Chỉ thị xác định đường lối cách mạng trong tình hình mới",
    content: [
      "Ngày 25/11/1945, Trung ương Đảng ra Chỉ thị 'Kháng chiến kiến quốc', đây là văn kiện quan trọng xác định đường lối cách mạng Việt Nam trong tình hình mới sau Cách mạng Tháng Tám.",
      "Chỉ thị xác định kẻ thù chính của cách mạng Việt Nam lúc này là thực dân Pháp xâm lược. Mọi hoạt động của Đảng và nhân dân phải tập trung chống lại âm mưu xâm lược của Pháp.",
      "Nhiệm vụ hàng đầu là củng cố chính quyền, chống thực dân Pháp xâm lược, bài trừ nội phản và cải thiện đời sống nhân dân.",
      "Chỉ thị đề ra các nhiệm vụ cụ thể trên các lĩnh vực: chính trị, quân sự, kinh tế, văn hóa - xã hội, ngoại giao, tạo cơ sở cho việc xây dựng và bảo vệ chính quyền cách mạng non trẻ.",
    ],
    images: [
      { caption: "Hội nghị Trung ương Đảng" },
      { caption: "Khẩu hiệu Kháng chiến kiến quốc" },
      { caption: "Chủ tịch Hồ Chí Minh chủ trì hội nghị" },
    ],
    videoQuery: "5rM9evyIrkc",
  },
  "tong-tuyen-cu-1946": {
    title: "Tổng tuyển cử bầu Quốc hội khóa I",
    date: "6/1/1946",
    description: "Cuộc Tổng tuyển cử đầu tiên trong lịch sử Việt Nam",
    content: [
      "Chủ trương: Để khẳng định địa vị pháp lý của Nhà nước Việt Nam Dân chủ Cộng hòa, Đảng và Chủ tịch Hồ Chí Minh chủ trương sớm tổ chức cuộc bầu cử toàn quốc theo hình thức phổ thông đầu phiếu.",
      "Diễn biến: Hơn 89% cử tri cả nước đã đi bỏ phiếu, bao gồm cả đồng bào Nam Bộ phải đi bầu dưới làn đạn của giặc Pháp. Cuộc bầu cử diễn ra với tinh thần 'mỗi lá phiếu là một viên đạn bắn vào quân thù', làm thất bại âm mưu chia rẽ của kẻ thù.",
      "Kết quả: Bầu ra 333 đại biểu Quốc hội đầu tiên của nước Việt Nam Dân chủ Cộng hòa, đại diện cho mọi tầng lớp nhân dân, các đảng phái, tôn giáo, dân tộc.",
      "Ý nghĩa: Cuộc Tổng tuyển cử thành công đã khẳng định tính pháp lý của Nhà nước Việt Nam Dân chủ Cộng hòa trước nhân dân và thế giới, thể hiện ý chí độc lập tự chủ của toàn dân tộc.",
    ],
    images: [
      { caption: "Nhân dân đi bỏ phiếu" },
      { caption: "Cử tri xếp hàng bầu cử" },
      { caption: "Phiếu bầu cử lịch sử" },
    ],
    videoQuery: "-zcjkwGaa7I",
  },
  "hiep-dinh-so-bo": {
    title: "Hiệp định Sơ bộ 6/3/1946",
    date: "6/3/1946",
    description: "Hiệp định quan trọng giữa Việt Nam và Pháp",
    content: [
      "Ngày 6/3/1946, Chủ tịch Hồ Chí Minh thay mặt Chính phủ Việt Nam Dân chủ Cộng hòa ký Hiệp định Sơ bộ với đại diện Chính phủ Pháp.",
      "Theo Hiệp định, Pháp công nhận Việt Nam là một 'quốc gia tự do' có chính phủ, quốc hội, quân đội và tài chính riêng, nằm trong Liên hiệp Pháp.",
      "Việc ký Hiệp định Sơ bộ là một quyết định sáng suốt của Đảng và Chủ tịch Hồ Chí Minh, thể hiện sách lược 'hòa để tiến', tranh thủ thời gian hòa hoãn để đuổi quân Tưởng ra khỏi miền Bắc.",
      "Hiệp định giúp ta có thêm thời gian xây dựng, củng cố lực lượng, chuẩn bị cho cuộc kháng chiến lâu dài khi cần thiết.",
    ],
    images: [
      { caption: "Lễ ký Hiệp định Sơ bộ" },
      { caption: "Văn bản Hiệp định Sơ bộ" },
      { caption: "Chủ tịch Hồ Chí Minh và Jean Sainteny" },
    ],
  },
  "loi-keu-goi-toan-quoc-khang-chien": {
    title: "Lời kêu gọi Toàn quốc kháng chiến",
    date: "19/12/1946",
    description: "Lời kêu gọi lịch sử của Chủ tịch Hồ Chí Minh",
    content: [
      "Đêm 19/12/1946, trước sự gây hấn liên tiếp và tối hậu thư của thực dân Pháp, Chủ tịch Hồ Chí Minh ra Lời kêu gọi Toàn quốc kháng chiến.",
      "'Chúng ta muốn hòa bình, chúng ta phải nhân nhượng. Nhưng chúng ta càng nhân nhượng, thực dân Pháp càng lấn tới, vì chúng quyết tâm cướp nước ta lần nữa!'",
      "'Không! Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ.'",
      "'Hỡi đồng bào! Chúng ta phải đứng lên! Bất kỳ đàn ông, đàn bà, bất kỳ người già, người trẻ, không chia tôn giáo, đảng phái, dân tộc. Hễ là người Việt Nam thì phải đứng lên đánh thực dân Pháp để cứu Tổ quốc.'",
      "Lời kêu gọi đã thổi bùng ngọn lửa yêu nước trong lòng mỗi người dân Việt Nam, mở đầu cuộc kháng chiến toàn quốc chống thực dân Pháp xâm lược.",
    ],
    images: [
      { caption: "Chủ tịch Hồ Chí Minh đọc Lời kêu gọi" },
      { caption: "Hà Nội kháng chiến" },
      { caption: "Chiến sĩ sẵn sàng chiến đấu" },
    ],
    videoQuery: "RzTxaGZ4bTw",
  },
  "vu-an-on-nhu-hau": {
    title: "Phá vụ án phố Ôn Như Hầu",
    date: "12/7/1946",
    description: "Đập tan âm mưu đảo chính phản động",
    content: [
      "Ngày 12/7/1946, lực lượng công an đã phá thành công vụ án phố Ôn Như Hầu, đập tan âm mưu đảo chính của bọn Đại Việt và Quốc dân Đảng cấu kết với thực dân Pháp.",
      "Bọn phản động đã lên kế hoạch bắt cóc các thành viên Chính phủ, ám sát các lãnh đạo cách mạng, gây bạo loạn lật đổ chính quyền.",
      "Lực lượng công an đã điều tra, theo dõi và kịp thời ra tay, bắt giữ toàn bộ nhóm đầu não phản động, thu giữ nhiều vũ khí, tài liệu âm mưu đảo chính.",
      "Vụ án phố Ôn Như Hầu cho thấy sự cảnh giác cao độ và năng lực của lực lượng công an cách mạng trong việc bảo vệ chính quyền non trẻ.",
    ],
    images: [
      { caption: "Lực lượng công an làm nhiệm vụ" },
      { caption: "Phố Ôn Như Hầu" },
      { caption: "Bắt giữ phần tử phản động" },
    ],
  },
  "quoc-hoi-phien-dau-tien": {
    title: "Quốc hội họp phiên đầu tiên",
    date: "2/3/1946",
    description: "Phiên họp lịch sử của Quốc hội khóa I",
    content: [
      "Thời gian: Ngày 2/3/1946. Địa điểm: Nhà hát lớn Hà Nội.",
      "Nội dung quan trọng: Quốc hội lập ra Chính phủ chính thức gồm 10 bộ và kiện toàn nhân sự bộ máy Chính phủ do Hồ Chí Minh làm Chủ tịch. Bầu Ban Thường trực Quốc hội do cụ Nguyễn Văn Tố làm Chủ tịch.",
      "Ý nghĩa: Đây là bước kiện toàn bộ máy nhà nước, thống nhất quản lý đất nước về mặt hành chính và pháp lý. Đánh dấu sự ra đời chính thức của cơ quan quyền lực cao nhất của Nhà nước Việt Nam Dân chủ Cộng hòa.",
      "Phiên họp diễn ra trong bầu không khí trang trọng, long trọng với sự tham dự của 333 đại biểu Quốc hội, thể hiện ý chí thống nhất của toàn dân tộc trong sự nghiệp xây dựng và bảo vệ chính quyền cách mạng.",
    ],
    images: [
      { caption: "Phiên họp Quốc hội đầu tiên" },
      { caption: "Nhà hát Lớn Hà Nội - nơi họp Quốc hội" },
      { caption: "Chủ tịch Hồ Chí Minh phát biểu trước Quốc hội" },
    ],
  },
  "tam-uoc-1946": {
    title: "Tạm ước 14/9/1946",
    date: "14/9/1946",
    description: "Tiếp tục kéo dài thời gian hòa bình",
    content: [
      "Ngày 14/9/1946, tại Paris, Chủ tịch Hồ Chí Minh ký Tạm ước với Chính phủ Pháp, tiếp tục chính sách 'hòa để tiến'.",
      "Tạm ước quy định hai bên ngừng bắn ở Nam Bộ, Pháp cam kết thực hiện các quyền tự do dân chủ, hai bên tiếp tục đàm phán để giải quyết các vấn đề còn lại.",
      "Mặc dù biết rằng Pháp không thực tâm hòa bình, nhưng việc ký Tạm ước giúp ta có thêm thời gian quý báu để chuẩn bị lực lượng cho kháng chiến.",
      "Tạm ước thể hiện thiện chí hòa bình của Việt Nam, đồng thời vạch trần bản chất hiếu chiến, bội ước của thực dân Pháp trước dư luận thế giới.",
    ],
    images: [
      { caption: "Chủ tịch Hồ Chí Minh tại Paris" },
      { caption: "Ký kết Tạm ước tại Paris" },
      { caption: "Hội nghị Fontainebleau" },
    ],
  },
  "hien-phap-1946": {
    title: "Hiến pháp năm 1946",
    date: "9/11/1946",
    description: "Bản Hiến pháp đầu tiên của Việt Nam",
    content: [
      "Quá trình chuẩn bị: Ban soạn thảo Hiến pháp được thành lập do Chủ tịch Hồ Chí Minh làm trưởng ban. Dự thảo Hiến pháp được nghiên cứu, thảo luận kỹ lưỡng, lấy ý kiến rộng rãi trong nhân dân.",
      "Sự kiện: Tại kỳ họp thứ 2 Quốc hội khóa I vào ngày 9/11/1946, Quốc hội đã thông qua bản Hiến pháp đầu tiên của nước Việt Nam Dân chủ Cộng hòa (Hiến pháp năm 1946).",
      "Nội dung: Hiến pháp 1946 khẳng định chủ quyền quốc gia thuộc về toàn thể nhân dân, các quyền tự do dân chủ cơ bản của công dân. Quy định cơ cấu tổ chức bộ máy nhà nước với Quốc hội là cơ quan quyền lực cao nhất.",
      "Ý nghĩa: Đây là đạo luật cơ bản đầu tiên, khẳng định quyền độc lập, tự do của dân tộc và các quyền dân chủ cơ bản của nhân dân Việt Nam, tạo cơ sở pháp lý vững chắc cho chế độ mới.",
    ],
    images: [
      { caption: "Bản Hiến pháp 1946" },
      { caption: "Quốc hội thông qua Hiến pháp" },
      { caption: "Công bố Hiến pháp" },
    ],
  },
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = eventData[slug]

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Link
              href="/chu-truong-duong-loi"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Link>

            <div className="flex items-center gap-2 text-primary text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              <span>{event.date}</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6 max-w-4xl">{event.title}</h1>

            <p className="text-xl text-muted-foreground max-w-3xl">{event.description}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Main content */}
              <div className="prose prose-lg max-w-none mb-12">
                {event.content.map((paragraph, index) => (
                  <p key={index} className="text-foreground leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Video section */}
              {event.videoQuery && (
                <div className="mb-12">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Video tư liệu</h2>
                  <div className="aspect-video relative rounded-xl overflow-hidden bg-muted shadow-xl">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${event.videoQuery}`}
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
              {event.images && event.images.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Hình ảnh tư liệu</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {event.images.map((image, index) => (
                      <div key={index} className="group">
                        <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-muted mb-3">
                          <img
                            src={`/images/gallery/${slug}-${index + 1}.png`}
                            alt={image.caption}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground text-center">{image.caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
