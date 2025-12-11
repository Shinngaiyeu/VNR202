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
  "binh-dan-hoc-vu": {
    title: "Phát động phong trào Bình dân học vụ",
    date: "9/1945",
    description: "Phong trào xóa nạn mù chữ trong toàn dân",
    content: [
      "Bối cảnh: Sau Cách mạng Tháng Tám, 95% dân số Việt Nam mù chữ. 'Giặc dốt' là một trong ba thứ giặc nguy hiểm cần loại bỏ ngay lập tức.",
      "Chủ trương: Chủ tịch Hồ Chí Minh ký sắc lệnh thành lập Nha Bình dân học vụ (9/1945). Phát động phong trào 'Bình dân học vụ' với mục tiêu 'diệt giặc dốt'. Kêu gọi toàn dân học chữ Quốc ngữ để nâng cao dân trí, thực hiện quyền làm chủ của nhân dân.",
      "Hình thức: Lớp học được mở khắp nơi (đình, chùa, nhà dân), học mọi lúc mọi nơi với tinh thần 'người biết chữ dạy người chưa biết chữ'. Phong trào diễn ra sôi nổi từ thành thị đến nông thôn, từ miền xuôi đến miền núi.",
      "Ý nghĩa: Đây là cuộc cách mạng văn hóa to lớn, thể hiện quyết tâm xây dựng một nền giáo dục mới, nâng cao dân trí để nhân dân thực sự làm chủ đất nước.",
    ],
    images: [
      { caption: "Lớp học Bình dân học vụ" },
      { caption: "Nhân dân học chữ Quốc ngữ" },
      { caption: "Người biết dạy người chưa biết" },
    ],
  },
  "doi-song-moi": {
    title: "Phong trào Đời sống mới",
    date: "10/1945",
    description: "Xây dựng nền văn hóa mới, xóa bỏ tệ nạn xã hội",
    content: [
      "Mục đích: Xây dựng một nền văn hóa mới, xóa bỏ những tàn tích lạc hậu của chế độ thực dân phong kiến.",
      "Nội dung: Vận động toàn dân thực hiện 'Cần, Kiệm, Liêm, Chính'. Xây dựng nếp sống văn hóa mới, đời sống mới. Đẩy lùi các tệ nạn xã hội, hủ tục, thói quen cũ lạc hậu cản trở sự tiến bộ.",
      "Các hoạt động cụ thể: Vận động xóa bỏ các tệ nạn cờ bạc, cá độ, ma túy. Thay đổi phong tục tập quán lạc hậu như cưới xin phô trương, tang lễ lãng phí. Khuyến khích lối sống lành mạnh, tiết kiệm, giản dị.",
      "Ý nghĩa: Thể hiện tính ưu việt của chế độ mới, cải thiện đời sống tinh thần cho nhân dân. Tạo nên một xã hội văn minh, tiến bộ, phù hợp với Việt Nam Dân chủ Cộng hòa.",
    ],
    images: [
      { caption: "Phong trào Đời sống mới" },
      { caption: "Nhân dân thực hành Cần Kiệm Liêm Chính" },
      { caption: "Xây dựng nếp sống văn hóa mới" },
    ],
  },
  "thanh-tuu-xoa-mu-chu": {
    title: "2,5 triệu người biết chữ",
    date: "12/1946",
    description: "Thành tựu vang dội của phong trào Bình dân học vụ",
    content: [
      "Thành tựu: Chỉ trong một thời gian ngắn (từ tháng 9/1945 đến cuối năm 1946), phong trào xóa nạn mù chữ đã đạt được con số kỷ lục.",
      "Số liệu: Cả nước đã có hơn 2,5 triệu người dân biết đọc, biết viết chữ Quốc ngữ. Tỷ lệ mù chữ giảm mạnh từ 95% xuống còn khoảng 80%, đây là bước tiến vượt bậc chưa từng có trong lịch sử giáo dục Việt Nam.",
      "Tác động: Trình độ dân trí được nâng lên rõ rệt. Nhân dân có thể đọc báo, hiểu chính sách, tham gia tích cực vào các hoạt động xã hội và chính trị. Nhân dân tin tưởng tuyệt đối vào chế độ mới và Chủ tịch Hồ Chí Minh.",
      "Ý nghĩa lịch sử: Tạo cơ sở vững chắc để củng cố chính quyền cách mạng. Đây là minh chứng sinh động cho chính sách dân sinh của Đảng và Chính phủ, thể hiện sự quan tâm sâu sắc đến quyền được học tập của nhân dân.",
    ],
    images: [
      { caption: "Người dân vui mừng biết đọc biết viết" },
      { caption: "Lớp học Bình dân học vụ đông đúc" },
      { caption: "Thành tựu xóa mù chữ lịch sử" },
    ],
  },
  "nam-bo-khang-chien": {
    title: "Nam Bộ kháng chiến",
    date: "23/9/1945",
    description: "Quân dân Nam Bộ anh dũng kháng chiến chống thực dân Pháp",
    content: [
      "Sự kiện: Đêm 22 rạng sáng ngày 23/9/1945, thực dân Pháp nổ súng đánh chiếm Sài Gòn - Chợ Lớn, mở đầu cuộc chiến tranh xâm lược Việt Nam lần thứ hai.",
      "Chủ trương của Đảng: Sáng 23/9, Xứ ủy Nam Bộ họp hội nghị, quyết định phát động toàn dân kháng chiến. Trung ương Đảng và Chính phủ phát động phong trào 'Nam tiến', chi viện sức người, sức của cho miền Nam với tinh thần 'Thà chết tự do còn hơn sống nô lệ'.",
      "Diễn biến: Quân dân Nam Bộ anh dũng chiến đấu, kiên cường bám đất giữ nước trước hỏa lực mạnh của quân Pháp. Dù thiếu thốn về vũ khí, lương thực nhưng quyết tâm kháng chiến không lay chuyển.",
      "Ý nghĩa: Thể hiện tinh thần yêu nước quật cường của quân dân Nam Bộ. Chủ tịch Hồ Chí Minh đã tặng nhân dân Nam Bộ danh hiệu cao quý 'Thành đồng Tổ quốc', ghi nhận công lao to lớn trong sự nghiệp kháng chiến cứu nước.",
    ],
    images: [
      { caption: "Quân dân Nam Bộ kháng chiến" },
      { caption: "Chiến sĩ Nam Bộ anh dũng" },
      { caption: "Thành đồng Tổ quốc" },
    ],
  },
  "xay-dung-quan-doi": {
    title: "Xây dựng Quân đội Quốc gia",
    date: "1945-1946",
    description: "Củng cố lực lượng vũ trang, xây dựng quân đội chính quy",
    content: [
      "Bối cảnh: Mặc dù Đội Việt Nam Tuyên truyền Giải phóng quân (tiền thân của QĐNDVN) đã thành lập ngày 22/12/1944, nhưng sau năm 1945, nhiệm vụ cấp bách là phải xây dựng một quân đội chính quy cho Nhà nước mới.",
      "Nội dung: Đảng và Chính phủ khẩn trương xây dựng Quân đội quốc gia và lực lượng Công an nhân dân. Các lực lượng vũ trang được củng cố, tổ chức lại; tích cực mua sắm vũ khí, tích trữ lương thực, thuốc men. Xây dựng các căn cứ địa kháng chiến (ATK) ở cả miền Bắc và miền Nam.",
      "Kết quả: Đến cuối năm 1946, Việt Nam đã có hơn 8 vạn bộ đội chính quy, lực lượng công an và hàng vạn dân quân tự vệ được tổ chức chặt chẽ.",
      "Ý nghĩa: Việc xây dựng lực lượng vũ trang mạnh là nền tảng quan trọng để bảo vệ chính quyền cách mạng và sẵn sàng cho cuộc kháng chiến toàn quốc. Quân đội nhân dân Việt Nam trở thành lực lượng trung thành tuyệt đối với Đảng, với nhân dân.",
    ],
    images: [
      { caption: "Bộ đội Việt Nam tập luyện" },
      { caption: "Xây dựng lực lượng vũ trang" },
      { caption: "Căn cứ địa kháng chiến" },
    ],
  },
  "toan-quoc-khang-chien": {
    title: "Toàn quốc kháng chiến",
    date: "19/12/1946",
    description: "Cuộc kháng chiến toàn quốc chống thực dân Pháp",
    content: [
      "Nguyên nhân: Thực dân Pháp liên tiếp gây hấn (đánh chiếm Hải Phòng, Lạng Sơn) và gửi tối hậu thư ngày 18/12/1946 đòi tước vũ khí của ta. Thiện chí hòa bình của Việt Nam đã bị cự tuyệt.",
      "Quyết định lịch sử: Ngày 18/12/1946, Hội nghị Ban Thường vụ Trung ương Đảng tại Vạn Phúc (Hà Đông) quyết định phát động toàn quốc kháng chiến. Đêm 19/12/1946, Chủ tịch Hồ Chí Minh ra Lời kêu gọi toàn quốc kháng chiến với lời kêu gọi bất hủ: 'Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ.'",
      "Diễn biến: Khoảng 20 giờ ngày 19/12, đèn điện Hà Nội vụt tắt, pháo đài Láng nổ súng báo hiệu. Quân dân thủ đô chiến đấu với tinh thần 'Quyết tử cho Tổ quốc quyết sinh', giam chân địch trong thành phố suốt 60 ngày đêm.",
      "Ý nghĩa: Đánh dấu sự bắt đầu cuộc kháng chiến toàn quốc chống thực dân Pháp xâm lược, mở ra trang sử vẻ vang của dân tộc Việt Nam trong cuộc đấu tranh giành độc lập dân tộc và thống nhất đất nước.",
    ],
    images: [
      { caption: "Hà Nội kháng chiến" },
      { caption: "Quân dân chiến đấu bảo vệ thủ đô" },
      { caption: "60 ngày đêm anh dũng" },
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
