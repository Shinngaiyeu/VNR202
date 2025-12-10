import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TimelineEvent } from "@/components/timeline-event"
import { ArrowLeft, Landmark, Coins, GraduationCap, Shield } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const categoryData = {
  "chinh-tri": {
    title: "Chính trị",
    icon: Landmark,
    color: "text-red-600",
    bgColor: "bg-red-50",
    description:
      "Xây dựng hệ thống chính quyền cách mạng thống nhất từ Trung ương đến cơ sở, phục vụ lợi ích của nhân dân. Tổ chức Tổng tuyển cử, lập Chính phủ chính thức và thông qua Hiến pháp đầu tiên. Thực hiện sách lược mềm dẻo 'Hòa để tiến'.",
    events: [
      {
        date: "6/1/1946",
        title: "Tổng tuyển cử bầu Quốc hội khóa I",
        description:
          "Tổng tuyển cử đầu tiên trong lịch sử Việt Nam, nhân dân cả nước đi bầu cử Quốc hội, khẳng định tính pháp lý của Nhà nước.",
        href: "/boi-canh-sau-1945/chinh-tri/tong-tuyen-cu",
        imageQuery: "vietnam first general election january 1946 voting",
      },
      {
        date: "2/3/1946",
        title: "Quốc hội họp phiên đầu tiên",
        description:
          "Quốc hội khóa I họp phiên đầu tiên, lập Chính phủ Liên hiệp Kháng chiến do Chủ tịch Hồ Chí Minh đứng đầu.",
        href: "/boi-canh-sau-1945/chinh-tri/quoc-hoi-hop",
        imageQuery: "vietnam national assembly first session march 1946",
      },
      {
        date: "9/11/1946",
        title: "Thông qua Hiến pháp đầu tiên",
        description:
          "Quốc hội thông qua bản Hiến pháp đầu tiên của nước Việt Nam Dân chủ Cộng hòa, đặt nền móng pháp lý cho Nhà nước.",
        href: "/boi-canh-sau-1945/chinh-tri/hien-phap-1946",
        imageQuery: "vietnam first constitution november 1946",
      },
    ],
  },
  "kinh-te": {
    title: "Kinh tế",
    icon: Coins,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    description:
      "Xác định nhiệm vụ cấp bách là 'diệt giặc đói'. Phát động các phong trào cứu đói, tăng gia sản xuất. Bãi bỏ thuế thân, giảm tô 25%, chia ruộng đất. Phát hành đồng giấy bạc Việt Nam xây dựng nền tài chính độc lập.",
    events: [
      {
        date: "9/1945",
        title: "Phong trào Tăng gia sản xuất",
        description:
          "Chủ tịch Hồ Chí Minh kêu gọi toàn dân 'Tăng gia sản xuất! Tăng gia sản xuất ngay!' để chống nạn đói.",
        href: "/boi-canh-sau-1945/kinh-te/tang-gia-san-xuat",
        imageQuery: "vietnam rice production campaign ho chi minh 1945",
      },
      {
        date: "9/1945",
        title: "Tuần lễ vàng",
        description:
          "Phát động 'Tuần lễ vàng' kêu gọi nhân dân đóng góp vàng, bạc cho Chính phủ để xây dựng tài chính quốc gia.",
        href: "/boi-canh-sau-1945/kinh-te/tuan-le-vang",
        imageQuery: "vietnam gold week campaign september 1945",
      },
      {
        date: "11/1946",
        title: "Phát hành tiền Việt Nam",
        description: "Phát hành đồng giấy bạc Việt Nam, xây dựng nền tài chính độc lập, thay thế tiền Đông Dương.",
        href: "/boi-canh-sau-1945/kinh-te/phat-hanh-tien",
        imageQuery: "vietnam first currency banknote 1946",
      },
    ],
  },
  "giao-duc": {
    title: "Văn hóa - Giáo dục",
    icon: GraduationCap,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description:
      "Xác định nhiệm vụ 'diệt giặc dốt'. Chủ tịch Hồ Chí Minh phát động phong trào 'Bình dân học vụ' để xóa nạn mù chữ. Vận động toàn dân xây dựng 'Đời sống mới'. Đến cuối 1946, hơn 2,5 triệu người biết đọc, biết viết.",
    events: [
      {
        date: "9/1945",
        title: "Phát động phong trào Bình dân học vụ",
        description:
          "Chủ tịch Hồ Chí Minh kêu gọi toàn dân tham gia phong trào xóa mù chữ, 'người biết chữ dạy người chưa biết chữ'.",
        href: "/boi-canh-sau-1945/giao-duc/binh-dan-hoc-vu",
        imageQuery: "vietnam literacy campaign binh dan hoc vu 1945",
      },
      {
        date: "10/1945",
        title: "Phong trào Đời sống mới",
        description: "Vận động toàn dân xây dựng 'Đời sống mới', bài trừ các tệ nạn xã hội, hủ tục lạc hậu.",
        href: "/boi-canh-sau-1945/giao-duc/doi-song-moi",
        imageQuery: "vietnam new life movement 1945 cultural reform",
      },
      {
        date: "12/1946",
        title: "2,5 triệu người biết chữ",
        description:
          "Sau hơn một năm phát động, phong trào Bình dân học vụ đã dạy cho hơn 2,5 triệu người biết đọc, biết viết chữ Quốc ngữ.",
        href: "/boi-canh-sau-1945/giao-duc/thanh-tuu-xoa-mu-chu",
        imageQuery: "vietnam literacy achievement 1946 people learning",
      },
    ],
  },
  "quan-su": {
    title: "Quân sự - Quốc phòng",
    icon: Shield,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description:
      "Khẩn trương xây dựng Quân đội quốc gia và lực lượng công an nhân dân. Củng cố lực lượng vũ trang, xây dựng các an toàn khu (ATK). Lãnh đạo kháng chiến ở Nam Bộ từ tháng 9/1945. Phát động Toàn quốc kháng chiến ngày 19/12/1946.",
    events: [
      {
        date: "23/9/1945",
        title: "Nam Bộ kháng chiến",
        description: "Pháp nổ súng đánh chiếm Sài Gòn, nhân dân Nam Bộ anh dũng đứng lên kháng chiến.",
        href: "/boi-canh-sau-1945/quan-su/nam-bo-khang-chien",
        imageQuery: "south vietnam resistance french attack september 1945",
      },
      {
        date: "22/12/1945",
        title: "Ngày thành lập Quân đội nhân dân Việt Nam",
        description:
          "Đội Việt Nam Tuyên truyền Giải phóng quân được thành lập, tiền thân của Quân đội nhân dân Việt Nam.",
        href: "/boi-canh-sau-1945/quan-su/thanh-lap-quan-doi",
        imageQuery: "vietnam people army founding december 1944",
      },
      {
        date: "19/12/1946",
        title: "Toàn quốc kháng chiến",
        description:
          "Chủ tịch Hồ Chí Minh ra Lời kêu gọi Toàn quốc kháng chiến, bắt đầu cuộc kháng chiến chống thực dân Pháp.",
        href: "/boi-canh-sau-1945/quan-su/toan-quoc-khang-chien",
        imageQuery: "ho chi minh national resistance appeal december 1946",
      },
    ],
  },
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const data = categoryData[category as keyof typeof categoryData]

  if (!data) {
    notFound()
  }

  const Icon = data.icon

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className={`${data.bgColor} py-16 md:py-24`}>
          <div className="container mx-auto px-4">
            <Link
              href="/boi-canh-sau-1945"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-16 h-16 rounded-xl ${data.bgColor} border-2 border-current ${data.color} flex items-center justify-center`}
              >
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Bối cảnh sau 1945</span>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{data.title}</h1>
              </div>
            </div>

            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{data.description}</p>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">Các sự kiện tiêu biểu</h2>

              <div className="mt-8">
                {data.events.map((event, index) => (
                  <TimelineEvent key={event.date} {...event} isLast={index === data.events.length - 1} />
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
