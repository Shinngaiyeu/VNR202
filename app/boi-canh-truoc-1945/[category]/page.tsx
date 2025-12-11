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
      "Thực dân Pháp thiết lập bộ máy cai trị thực dân bên cạnh việc duy trì bộ máy phong kiến tay sai. Thi hành chính sách 'chia để trị', chia Việt Nam thành ba kỳ (Bắc Kỳ, Trung Kỳ, Nam Kỳ) với các chế độ chính trị khác nhau nhằm phá vỡ khối đoàn kết dân tộc.",
    events: [
      {
        date: "1858",
        title: "Pháp nổ súng xâm lược Việt Nam",
        description: "Liên quân Pháp - Tây Ban Nha tấn công Đà Nẵng, mở đầu cuộc xâm lược Việt Nam của thực dân Pháp.",
        href: "/boi-canh-truoc-1945/chinh-tri/phap-xam-luoc",
        imageQuery: "french attack danang vietnam 1858",
      },
      {
        date: "1884",
        title: "Hiệp ước Patenôtre",
        description:
          "Triều đình Huế ký Hiệp ước Patenôtre, chính thức công nhận sự bảo hộ của Pháp trên toàn cõi Việt Nam.",
        href: "/boi-canh-truoc-1945/chinh-tri/hiep-uoc-patenotre",
        imageQuery: "patenotre treaty vietnam france 1884",
      },
      {
        date: "1930",
        title: "Đảng Cộng sản Việt Nam ra đời",
        description:
          "Ngày 3/2/1930, Đảng Cộng sản Việt Nam được thành lập tại Hương Cảng, đánh dấu bước ngoặt quan trọng của cách mạng Việt Nam.",
        href: "/boi-canh-truoc-1945/chinh-tri/thanh-lap-dang",
        imageQuery: "communist party vietnam founding 1930 hong kong",
      },
      {
        date: "8/1945",
        title: "Cách mạng Tháng Tám thành công",
        description:
          "Tổng khởi nghĩa thành công trên cả nước, chính quyền về tay nhân dân, chấm dứt gần 100 năm đô hộ của thực dân Pháp.",
        href: "/boi-canh-truoc-1945/chinh-tri/cach-mang-thang-tam",
        imageQuery: "august revolution vietnam 1945 success",
      },
    ],
  },
  "kinh-te": {
    title: "Kinh tế",
    icon: Coins,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    description:
      "Thực hiện các cuộc khai thác thuộc địa nhằm vơ vét tài nguyên và bóc lột sức lao động rẻ mạt. Biến Việt Nam thành thị trường tiêu thụ hàng hóa của chính quốc và nơi cung cấp nguyên liệu. Đặt ra nhiều thứ thuế khóa nặng nề.",
    events: [
      {
        date: "1897-1914",
        title: "Cuộc khai thác thuộc địa lần thứ nhất",
        description:
          "Pháp tiến hành khai thác thuộc địa lần thứ nhất, xây dựng cơ sở hạ tầng phục vụ mục đích vơ vét tài nguyên.",
        href: "/boi-canh-truoc-1945/kinh-te/khai-thac-lan-1",
        imageQuery: "french colonial exploitation vietnam first phase mining",
      },
      {
        date: "1919-1929",
        title: "Cuộc khai thác thuộc địa lần thứ hai",
        description:
          "Cuộc khai thác thuộc địa lần thứ hai với quy mô lớn hơn, tập trung vào cao su, than đá và các mỏ khoáng sản.",
        href: "/boi-canh-truoc-1945/kinh-te/khai-thac-lan-2",
        imageQuery: "french rubber plantation vietnam 1920s colonial",
      },
      {
        date: "1944-1945",
        title: "Nạn đói khủng khiếp",
        description:
          "Nạn đói kinh hoàng làm 2 triệu người Việt Nam chết đói do chính sách vơ vét lương thực của Nhật - Pháp.",
        href: "/boi-canh-truoc-1945/kinh-te/nan-doi-1945",
        imageQuery: "vietnam great famine 1945 starvation",
      },
    ],
  },
  "giao-duc": {
    title: "Văn hóa - Giáo dục",
    icon: GraduationCap,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description:
      "Thực hiện chính sách 'ngu dân' để dễ cai trị, số lượng nhà tù nhiều hơn trường học. Duy trì các hủ tục lạc hậu và du nhập các tệ nạn xã hội (rượu cồn, thuốc phiện) để đầu độc dân chúng. Hậu quả là hơn 90% dân số mù chữ.",
    events: [
      {
        date: "1906",
        title: "Phong trào Đông Kinh Nghĩa Thục",
        description: "Phong trào giáo dục yêu nước, truyền bá tư tưởng canh tân và văn hóa mới cho nhân dân.",
        href: "/boi-canh-truoc-1945/giao-duc/dong-kinh-nghia-thuc",
        imageQuery: "dong kinh nghia thuc school vietnam 1906",
      },
      {
        date: "1920s-1930s",
        title: "Chính sách ngu dân của Pháp",
        description:
          "Pháp hạn chế nghiêm ngặt giáo dục, xây dựng nhiều nhà tù hơn trường học để đàn áp phong trào yêu nước.",
        href: "/boi-canh-truoc-1945/giao-duc/chinh-sach-ngu-dan",
        imageQuery: "french colonial education policy vietnam oppression",
      },
      {
        date: "1930s",
        title: "Phong trào truyền bá chữ Quốc ngữ",
        description: "Các nhà yêu nước tổ chức truyền bá chữ Quốc ngữ, nâng cao dân trí, chuẩn bị cho cách mạng.",
        href: "/boi-canh-truoc-1945/giao-duc/truyen-ba-quoc-ngu",
        imageQuery: "vietnamese literacy campaign 1930s national script",
      },
    ],
  },
  "quan-su": {
    title: "Quân sự - Quốc phòng",
    icon: Shield,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description:
      "Pháp dùng quân đội để đàn áp các phong trào yêu nước và duy trì sự thống trị. Chiến tranh thế giới thứ hai đi vào giai đoạn kết thúc, tạo điều kiện thuận lợi cho cách mạng Việt Nam.",
    events: [
      {
        date: "5/1945",
        title: "Phát xít Đức đầu hàng",
        description: "Chiến tranh thế giới thứ hai ở châu Âu kết thúc với sự đầu hàng của phát xít Đức.",
        href: "/boi-canh-truoc-1945/quan-su/duc-dau-hang",
        imageQuery: "germany surrender world war 2 may 1945",
      },
      {
        date: "8/1945",
        title: "Liên Xô đánh tan quân Quan Đông",
        description: "Liên Xô tuyên chiến với Nhật và đánh tan đạo quân Quan Đông của Nhật ở Mãn Châu.",
        href: "/boi-canh-truoc-1945/quan-su/lien-xo-danh-quan-dong",
        imageQuery: "soviet union kwantung army manchuria august 1945",
      },
      {
        date: "15/8/1945",
        title: "Nhật hoàng tuyên bố đầu hàng",
        description:
          "Nhật Bản đầu hàng Đồng minh không điều kiện, tạo 'thời cơ ngàn năm có một' cho cách mạng Việt Nam.",
        href: "/boi-canh-truoc-1945/quan-su/nhat-dau-hang",
        imageQuery: "japan surrender august 1945 world war 2",
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
              href="/boi-canh-truoc-1945"
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
                <span className="text-sm text-muted-foreground">Bối cảnh trước 1945</span>
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
                  <TimelineEvent key={event.date} {...event} isLast={index === data.events.length - 1} showDetailButton={false} />
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
