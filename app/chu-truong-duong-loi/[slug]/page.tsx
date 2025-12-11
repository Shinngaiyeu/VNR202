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
    images: { query: string; caption: string }[]
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
      { query: "vietnam communist party central committee meeting 1945", caption: "Hội nghị Trung ương Đảng" },
      { query: "vietnam resistance building nation poster 1945", caption: "Khẩu hiệu Kháng chiến kiến quốc" },
      { query: "ho chi minh leading party meeting 1945", caption: "Chủ tịch Hồ Chí Minh chủ trì hội nghị" },
    ],
    videoQuery: "5rM9evyIrkc",
  },
  "tong-tuyen-cu-1946": {
    title: "Tổng tuyển cử bầu Quốc hội khóa I",
    date: "6/1/1946",
    description: "Cuộc Tổng tuyển cử đầu tiên trong lịch sử Việt Nam",
    content: [
      "Ngày 6/1/1946, cuộc Tổng tuyển cử bầu Quốc hội đầu tiên được tổ chức trên toàn quốc, đánh dấu một bước ngoặt lịch sử quan trọng.",
      "Đây là lần đầu tiên trong lịch sử Việt Nam, toàn dân được thực hiện quyền công dân, bầu ra cơ quan quyền lực cao nhất của Nhà nước.",
      "Hơn 89% cử tri đi bầu cử, bất chấp sự phá hoại của kẻ thù và điều kiện khó khăn. Cuộc bầu cử diễn ra sôi nổi từ thành thị đến nông thôn, từ miền xuôi đến miền núi.",
      "Kết quả, 333 đại biểu được bầu vào Quốc hội, đại diện cho mọi tầng lớp nhân dân, các đảng phái, tôn giáo, dân tộc. Quốc hội khóa I ra đời, khẳng định tính pháp lý của nước Việt Nam Dân chủ Cộng hòa.",
    ],
    images: [
      { query: "vietnam first general election 1946 voting booth", caption: "Nhân dân đi bỏ phiếu" },
      { query: "vietnamese voters election 1946 queue", caption: "Cử tri xếp hàng bầu cử" },
      { query: "vietnam election ballot 1946 historical", caption: "Phiếu bầu cử lịch sử" },
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
      { query: "ho chi minh signing preliminary agreement 1946", caption: "Lễ ký Hiệp định Sơ bộ" },
      { query: "vietnam france preliminary agreement document 1946", caption: "Văn bản Hiệp định Sơ bộ" },
      { query: "ho chi minh sainteny preliminary agreement 1946", caption: "Chủ tịch Hồ Chí Minh và Jean Sainteny" },
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
      { query: "ho chi minh appeal resistance december 1946", caption: "Chủ tịch Hồ Chí Minh đọc Lời kêu gọi" },
      { query: "vietnam hanoi resistance december 1946", caption: "Hà Nội kháng chiến" },
      { query: "vietnamese soldiers december 1946 resistance", caption: "Chiến sĩ sẵn sàng chiến đấu" },
    ],
    videoQuery: "ho chi minh national resistance appeal 1946 video",
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
      { query: "vietnam police operation 1946 security", caption: "Lực lượng công an làm nhiệm vụ" },
      { query: "on nhu hau street hanoi 1946", caption: "Phố Ôn Như Hầu" },
      { query: "vietnam counterrevolutionary arrest 1946", caption: "Bắt giữ phần tử phản động" },
    ],
  },
  "quoc-hoi-phien-dau-tien": {
    title: "Quốc hội họp phiên đầu tiên",
    date: "2/3/1946",
    description: "Phiên họp lịch sử của Quốc hội khóa I",
    content: [
      "Ngày 2/3/1946, Quốc hội khóa I họp phiên đầu tiên tại Nhà hát Lớn Hà Nội, với sự tham dự của 333 đại biểu được bầu từ cuộc Tổng tuyển cử ngày 6/1/1946.",
      "Quốc hội đã công nhận Chính phủ Liên hiệp Kháng chiến do Chủ tịch Hồ Chí Minh đứng đầu, với sự tham gia của các đảng phái chính trị và nhân sĩ tiêu biểu.",
      "Phiên họp đã thông qua danh sách các thành viên Chính phủ và các chức danh quan trọng, đặt nền móng cho bộ máy nhà nước Việt Nam Dân chủ Cộng hòa.",
      "Đây là sự kiện có ý nghĩa lịch sử to lớn, đánh dấu sự ra đời chính thức của cơ quan quyền lực nhà nước cao nhất, thể hiện ý chí thống nhất của toàn dân tộc.",
    ],
    images: [
      { query: "vietnam national assembly first session march 1946", caption: "Phiên họp Quốc hội đầu tiên" },
      { query: "hanoi opera house national assembly 1946", caption: "Nhà hát Lớn Hà Nội - nơi họp Quốc hội" },
      { query: "ho chi minh national assembly speech 1946", caption: "Chủ tịch Hồ Chí Minh phát biểu trước Quốc hội" },
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
      { query: "ho chi minh paris 1946 negotiation", caption: "Chủ tịch Hồ Chí Minh tại Paris" },
      { query: "vietnam france modus vivendi signing 1946", caption: "Ký kết Tạm ước tại Paris" },
      { query: "ho chi minh fontainebleau conference 1946", caption: "Hội nghị Fontainebleau" },
    ],
  },
  "hien-phap-1946": {
    title: "Hiến pháp năm 1946",
    date: "9/11/1946",
    description: "Bản Hiến pháp đầu tiên của Việt Nam",
    content: [
      "Ngày 9/11/1946, Quốc hội khóa I thông qua bản Hiến pháp đầu tiên của nước Việt Nam Dân chủ Cộng hòa.",
      "Hiến pháp 1946 khẳng định chủ quyền quốc gia thuộc về toàn thể nhân dân, các quyền tự do dân chủ cơ bản của công dân được đảm bảo.",
      "Hiến pháp quy định cơ cấu tổ chức bộ máy nhà nước với Quốc hội là cơ quan quyền lực cao nhất, Chính phủ là cơ quan hành chính cao nhất.",
      "Bản Hiến pháp 1946 là nền tảng pháp lý vững chắc cho Nhà nước Việt Nam Dân chủ Cộng hòa, thể hiện khát vọng độc lập, tự do và tinh thần dân chủ của dân tộc Việt Nam.",
    ],
    images: [
      { query: "vietnam first constitution 1946 document", caption: "Bản Hiến pháp 1946" },
      { query: "vietnam national assembly constitution vote 1946", caption: "Quốc hội thông qua Hiến pháp" },
      { query: "ho chi minh constitution proclamation 1946", caption: "Công bố Hiến pháp" },
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
