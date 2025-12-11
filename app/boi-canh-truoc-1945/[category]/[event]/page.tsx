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
      { caption: "Khai thác mỏ thời Pháp thuộc" },
      { caption: "Toàn quyền Paul Doumer" },
      { caption: "Công nhân Việt Nam bị bóc lột" },
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
      { caption: "Đồn điền cao su thời Pháp" },
      { caption: "Công nhân bị bóc lột" },
      { caption: "Giai cấp công nhân hình thành" },
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
      { caption: "Nạn đói 1945 - Thảm họa nhân đạo" },
      { caption: "Người dân chết đói hàng loạt" },
      { caption: "Phong trào cứu đói sau Cách mạng" },
    ],
    videoQuery: "EXrUqklfAao",
  },
  "phap-no-sung": {
    title: "Pháp nổ súng xâm lược Việt Nam",
    date: "1/9/1858",
    description: "Thực dân Pháp mở đầu cuộc xâm lược Việt Nam",
    content: [
      "Thời gian: Ngày 1/9/1858.",
      "Sự kiện: Thực dân Pháp nổ súng xâm lược Việt Nam tại Đà Nẵng, mở đầu quá trình thôn tính nước ta.",
      "Diễn biến: Sau khi tấn công Đà Nẵng, thực dân Pháp tiếp tục mở rộng xâm lược về phía Nam, chiếm Gia Định năm 1859. Từ đó, Pháp từng bước xâm chiếm cả ba kỳ Bắc - Trung - Nam.",
      "Ý nghĩa: Đánh dấu sự khởi đầu của cuộc đấu tranh trường kỳ, gian khổ của nhân dân Việt Nam chống thực dân Pháp xâm lược trong gần một thế kỷ.",
    ],
    images: [
      { caption: "Pháp nổ súng tại Đà Nẵng 1858" },
      { caption: "Khởi đầu cuộc xâm lược" },
      { caption: "Nhân dân kháng chiến" },
    ],
  },
  "hiep-uoc-patenotre": {
    title: "Hiệp ước Patenôtre",
    date: "6/6/1884",
    description: "Triều đình nhà Nguyễn đầu hàng thực dân Pháp",
    content: [
      "Thời gian: Ngày 6/6/1884.",
      "Sự kiện: Triều đình nhà Nguyễn ký Hiệp ước Patenôtre (Hiệp ước Patơnốt), đầu hàng hoàn toàn thực dân Pháp.",
      "Nội dung: Hiệp ước công nhận quyền bảo hộ của Pháp đối với toàn bộ Việt Nam. Triều đình nhà Nguyễn từ bỏ chủ quyền quốc gia, chấp nhận làm bù nhìn cho thực dân Pháp.",
      "Ý nghĩa: Việt Nam trở thành một xứ thuộc địa, chấm dứt tư cách quốc gia độc lập. Đánh dấu sự sụp đổ hoàn toàn của triều đình phong kiến nhà Nguyễn trước âm mưu xâm lược của thực dân Pháp.",
    ],
    images: [
      { caption: "Ký kết Hiệp ước Patenôtre" },
      { caption: "Việt Nam mất độc lập" },
      { caption: "Triều đình nhà Nguyễn đầu hàng" },
    ],
  },
  "dang-thanh-lap": {
    title: "Đảng Cộng sản Việt Nam ra đời",
    date: "3/2/1930",
    description: "Sự kiện lịch sử vĩ đại của dân tộc Việt Nam",
    content: [
      "Thời gian: Ngày 3/2/1930.",
      "Sự kiện: Lãnh tụ Nguyễn Ái Quốc chủ trì Hội nghị hợp nhất các tổ chức cộng sản tại Cửu Long (Hồng Kông, Trung Quốc) thành một đảng duy nhất lấy tên là Đảng Cộng sản Việt Nam.",
      "Bối cảnh: Trước đó, phong trào cộng sản ở Việt Nam bị chia rẽ thành nhiều tổ chức khác nhau, gây yếu kém trong lãnh đạo cách mạng. Sự ra đời của Đảng là nhu cầu cấp thiết của lịch sử.",
      "Ý nghĩa: Chấm dứt sự khủng hoảng về đường lối cứu nước, mở ra bước ngoặt lịch sử vĩ đại cho cách mạng Việt Nam. Từ đây, cách mạng Việt Nam có đường lối đúng đắn, có sự lãnh đạo thống nhất của Đảng Cộng sản, tiến tới những thắng lợi vẻ vang.",
    ],
    images: [
      { caption: "Hội nghị thành lập Đảng 1930" },
      { caption: "Lãnh tụ Nguyễn Ái Quốc" },
      { caption: "Đảng Cộng sản Việt Nam ra đời" },
    ],
  },
  "cach-mang-thang-tam": {
    title: "Cách mạng Tháng Tám thành công",
    date: "8-9/1945",
    description: "Cách mạng giải phóng dân tộc vĩ đại nhất lịch sử Việt Nam",
    content: [
      "Thời gian: Tháng 8/1945 (đỉnh cao là ngày 2/9/1945).",
      "Sự kiện: Nhân dân Việt Nam dưới sự lãnh đạo của Đảng đã nổi dậy giành chính quyền từ tay phát xít Nhật. Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh ra nước Việt Nam Dân chủ Cộng hòa.",
      "Diễn biến: Từ ngày 13 đến 19/8/1945, khởi nghĩa nổ ra trên toàn quốc từ Bắc vào Nam. Ngày 19/8, khởi nghĩa Hà Nội thành công. Ngày 25/8, vua Bảo Đại thoái vị. Ngày 2/9/1945, lễ mừng độc lập long trọng được tổ chức tại Quảng trường Ba Đình, Hà Nội.",
      "Ý nghĩa: Đập tan xiềng xích nô lệ của thực dân, đế quốc; chấm dứt chế độ quân chủ chuyên chế; lập nên nhà nước công nông đầu tiên ở Đông Nam Á. Mở ra kỷ nguyên mới - kỷ nguyên độc lập dân tộc gắn liền với chủ nghĩa xã hội.",
    ],
    images: [
      { caption: "Cách mạng Tháng Tám thành công" },
      { caption: "Tuyên ngôn Độc lập 2/9/1945" },
      { caption: "Quảng trường Ba Đình lịch sử" },
    ],
  },
  "dong-kinh-nghia-thuc": {
    title: "Phong trào Đông Kinh Nghĩa Thục",
    date: "1907",
    description: "Phong trào khai dân trí tiêu biểu đầu thế kỷ XX",
    content: [
      "Bối cảnh: Đầu thế kỷ XX, các sĩ phu yêu nước muốn tìm con đường cứu nước mới, không dùng bạo động vũ trang mà chủ trương 'khai dân trí' để chấn hưng đất nước.",
      "Hoạt động: Thành lập trường học tại Hà Nội (số 10 Hàng Đào) nhằm truyền bá tư tưởng mới, dạy chữ Quốc ngữ và các môn học thực dụng. Tổ chức các buổi diễn thuyết, bình văn, xuất bản sách báo cổ động lòng yêu nước.",
      "Kết cục: Do ảnh hưởng lan rộng và tinh thần yêu nước mạnh mẽ của phong trào, thực dân Pháp lo sợ và đã ra lệnh đóng cửa trường vào tháng 12/1907.",
      "Ý nghĩa: Mặc dù bị dập tắt, phong trào đã góp phần thức tỉnh lòng yêu nước và cổ vũ tinh thần học tập, đổi mới tư duy của người Việt. Đây là biểu hiện của khuynh hướng duy tân trong phong trào yêu nước đầu thế kỷ XX.",
    ],
    images: [
      { caption: "Trường Đông Kinh Nghĩa Thục" },
      { caption: "Phong trào khai dân trí" },
      { caption: "Sĩ phu yêu nước" },
    ],
  },
  "chinh-sach-ngu-dan": {
    title: "Chính sách ngu dân của thực dân Pháp",
    date: "1884-1945",
    description: "Chính sách đen tối nhằm kìm hãm sự phát triển của dân tộc",
    content: [
      "Mục đích: Thực hiện chính sách 'ngu dân' để dễ bề cai trị và kìm hãm sự phát triển của dân tộc Việt Nam.",
      "Biểu hiện cụ thể: Hạn chế giáo dục - số lượng trường học rất ít ỏi, trong khi đó nhà tù được xây dựng nhiều hơn trường học. Đầu độc dân chúng - khuyến khích và duy trì các tệ nạn xã hội như rượu cồn, thuốc phiện để làm suy nhược giống nòi và tinh thần đấu tranh. Tuyên truyền văn hóa nô dịch - ra sức tuyên truyền tư tưởng 'khai hóa văn minh' của 'Đại Pháp' nhưng thực chất là nô dịch văn hóa.",
      "Hậu quả: Đến năm 1945, hơn 90% dân số Việt Nam bị mù chữ (thất học). Đây là một trong những tội ác nặng nề nhất của chế độ thực dân.",
      "Ý nghĩa: Chính sách ngu dân là bằng chứng rõ ràng về bản chất tàn bạo, man rợ của chế độ thực dân Pháp. Nó đã tạo ra động lực mạnh mẽ cho phong trào giải phóng dân tộc và xây dựng nền giáo dục mới sau Cách mạng Tháng Tám.",
    ],
    images: [
      { caption: "Chính sách ngu dân" },
      { caption: "Nạn mù chữ trầm trọng" },
      { caption: "Nhân dân bị kìm hãm giáo dục" },
    ],
  },
  "truyen-ba-quoc-ngu": {
    title: "Phong trào truyền bá chữ Quốc ngữ",
    date: "1936-1946",
    description: "Phong trào giáo dục xuyên suốt do Đảng lãnh đạo",
    content: [
      "Giai đoạn Mặt trận Dân chủ (1936-1939): Theo sáng kiến của Đảng, Hội Truyền bá Quốc ngữ ra đời. Từ cuối năm 1937, phong trào phát triển mạnh mẽ, giúp hàng vạn người dân lao động biết đọc, biết viết, khơi dậy lòng yêu nước qua con chữ.",
      "Giai đoạn sau Cách mạng Tháng Tám (1945-1946): Chủ tịch Hồ Chí Minh nâng phong trào lên tầm mức quốc gia với tên gọi 'Bình dân học vụ' để 'diệt giặc dốt'. Phong trào lan rộng khắp cả nước với tinh thần 'người biết chữ dạy người chưa biết chữ'.",
      "Kết quả: Đến cuối năm 1946, phong trào đã giúp hơn 2,5 triệu người thoát nạn mù chữ, giảm tỷ lệ mù chữ từ 95% xuống còn khoảng 80%.",
      "Ý nghĩa: Chữ Quốc ngữ trở thành vũ khí sắc bén để nâng cao dân trí, tuyên truyền cách mạng và xây dựng chế độ mới. Phong trào thể hiện sự quan tâm sâu sắc của Đảng và Chủ tịch Hồ Chí Minh đến quyền được học tập của nhân dân.",
    ],
    images: [
      { caption: "Phong trào truyền bá chữ Quốc ngữ" },
      { caption: "Lớp học chữ Quốc ngữ" },
      { caption: "Nhân dân học chữ Quốc ngữ" },
    ],
  },
  "duc-dau-hang": {
    title: "Phát xít Đức đầu hàng",
    date: "9/5/1945",
    description: "Chiến tranh thế giới thứ hai kết thúc tại châu Âu",
    content: [
      "Thời gian: Ngày 9/5/1945.",
      "Sự kiện: Phát xít Đức chính thức đầu hàng Liên Xô và các nước Đồng minh, chấm dứt Chiến tranh thế giới thứ hai tại châu Âu.",
      "Bối cảnh: Sau hơn 5 năm chiến tranh khốc liệt, quân đội Đồng minh đã tiến công vào Berlin, buộc Đức phải đầu hàng không điều kiện.",
      "Ý nghĩa: Chiến tranh thế giới thứ hai kết thúc tại châu Âu, tạo đà cho phe Đồng minh dồn sức tiêu diệt phát xít Nhật ở châu Á. Tạo thời cơ thuận lợi cho các phong trào giải phóng dân tộc ở châu Á, trong đó có Việt Nam.",
    ],
    images: [
      { caption: "Đức đầu hàng ngày 9/5/1945" },
      { caption: "Chiến tranh kết thúc ở châu Âu" },
      { caption: "Đồng minh chiến thắng" },
    ],
  },
  "lien-xo-danh-quan-dong": {
    title: "Liên Xô đánh tan quân Quan Đông",
    date: "8/1945",
    description: "Hồng quân Liên Xô tiêu diệt lực lượng tinh nhuệ của Nhật",
    content: [
      "Bối cảnh: Sau khi kết thúc chiến tranh ở châu Âu, Liên Xô tuyên chiến với Nhật Bản, thực hiện cam kết với Đồng minh.",
      "Sự kiện: Hồng quân Liên Xô tấn công và đánh tan đạo quân Quan Đông tinh nhuệ của Nhật đang đóng tại Mãn Châu (Trung Quốc). Chiến dịch diễn ra nhanh như chớp, quân Nhật tan vỡ hoàn toàn.",
      "Tác động: Đòn đánh này cùng với việc Mỹ ném bom nguyên tử vào Hiroshima (6/8) và Nagasaki (9/8) đã làm sụp đổ hoàn toàn tinh thần chiến đấu của quân đội Nhật, buộc Nhật phải đầu hàng.",
      "Ý nghĩa đối với Việt Nam: Làm suy yếu nghiêm trọng lực lượng Nhật ở Đông Dương, tạo điều kiện thuận lợi cho Đảng ta phát động Tổng khởi nghĩa.",
    ],
    images: [
      { caption: "Hồng quân Liên Xô tấn công" },
      { caption: "Quân Quan Đông bị tiêu diệt" },
      { caption: "Chiến dịch Mãn Châu" },
    ],
  },
  "nhat-dau-hang": {
    title: "Nhật hoàng tuyên bố đầu hàng",
    date: "15/8/1945",
    description: "Thời cơ vàng cho cách mạng Việt Nam",
    content: [
      "Thời gian: Ngày 15/8/1945.",
      "Sự kiện: Chính phủ Nhật Bản tuyên bố đầu hàng Đồng minh không điều kiện sau khi bị ném bom nguyên tử và Hồng quân Liên Xô đánh tan quân Quan Đông.",
      "Tác động trực tiếp đến Việt Nam: Quân Nhật ở Đông Dương mất hết tinh thần, chính quyền tay sai hoang mang cực độ. Xuất hiện tình trạng chân không quyền lực.",
      "Thời cơ lịch sử: Thời cơ 'ngàn năm có một' xuất hiện, Đảng ta chớp lấy thời cơ này để phát động Tổng khởi nghĩa giành chính quyền trước khi quân Đồng minh vào. Từ ngày 13-19/8/1945, khởi nghĩa nổ ra trên toàn quốc, đỉnh cao là ngày 19/8 giành chính quyền tại Hà Nội.",
    ],
    images: [
      { caption: "Nhật đầu hàng 15/8/1945" },
      { caption: "Nhật hoàng tuyên bố đầu hàng" },
      { caption: "Thời cơ cách mạng Việt Nam" },
    ],
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
