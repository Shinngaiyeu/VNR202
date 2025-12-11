import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"

const categories = [
  {
    category: "chinh-tri" as const,
    title: "Chính trị",
    description:
      "Thực dân Pháp thiết lập bộ máy cai trị thực dân, thi hành chính sách 'chia để trị', chia Việt Nam thành ba kỳ với các chế độ chính trị khác nhau nhằm phá vỡ khối đoàn kết dân tộc. Người dân không có quyền tự do dân chủ, bị áp bức nặng nề.",
    href: "/boi-canh-truoc-1945/chinh-tri",
    imageQuery: "french colonial vietnam political oppression 1940s",
  },
  {
    category: "kinh-te" as const,
    title: "Kinh tế",
    description:
      "Thực hiện các cuộc khai thác thuộc địa nhằm vơ vét tài nguyên và bóc lột sức lao động rẻ mạt. Biến Việt Nam thành thị trường tiêu thụ hàng hóa của chính quốc. Đặt ra nhiều thứ thuế khóa nặng nề, dẫn đến nạn đói khủng khiếp năm 1945.",
    href: "/boi-canh-truoc-1945/kinh-te",
    imageQuery: "vietnam famine 1945 colonial exploitation",
  },
  {
    category: "giao-duc" as const,
    title: "Văn hóa - Giáo dục",
    description:
      "Thực hiện chính sách 'ngu dân' để dễ cai trị, số lượng nhà tù nhiều hơn trường học. Duy trì các hủ tục lạc hậu và du nhập các tệ nạn xã hội để đầu độc dân chúng. Hậu quả là hơn 90% dân số mù chữ.",
    href: "/boi-canh-truoc-1945/giao-duc",
    imageQuery: "french colonial vietnam education oppression illiteracy",
  },
  {
    category: "quan-su" as const,
    title: "Quân sự - Quốc phòng",
    description:
      "Pháp dùng quân đội để đàn áp các phong trào yêu nước và duy trì sự thống trị. Chiến tranh thế giới thứ hai đi vào giai đoạn kết thúc, phát xít Đức đầu hàng (5/1945), Nhật hoàng tuyên bố đầu hàng Đồng minh (15/8/1945).",
    href: "/boi-canh-truoc-1945/quan-su",
    imageQuery: "world war 2 vietnam french japanese military 1945",
  },
]

export default function BoiCanhTruoc1945Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection
          title="Bối cảnh trước 1945"
          subtitle="Thời kỳ Pháp thuộc"
          description="Thời kỳ đen tối dưới ách đô hộ của thực dân Pháp, nhưng cũng là thời kỳ Đảng chuẩn bị kỹ lưỡng về lực lượng chính trị và vũ trang suốt 15 năm qua các cao trào cách mạng."
          imageQuery="french colonial vietnam hanoi 1940s historical"
          pageName="boi-canh-truoc-1945"
        />

        {categories.map((cat, index) => (
          <CategorySection key={cat.category} {...cat} index={index} />
        ))}
      </main>

      <Footer />
    </div>
  )
}
