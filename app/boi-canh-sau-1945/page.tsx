import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"

const categories = [
  {
    category: "chinh-tri" as const,
    title: "Chính trị",
    description:
      "Xây dựng hệ thống chính quyền cách mạng thống nhất từ Trung ương đến cơ sở. Tổ chức Tổng tuyển cử bầu Quốc hội khóa I (6/1/1946), lập Chính phủ chính thức và thông qua Hiến pháp đầu tiên (11/1946). Mở rộng khối đại đoàn kết dân tộc qua Mặt trận Việt Minh.",
    href: "/boi-canh-sau-1945/chinh-tri",
    imageQuery: "vietnam first national assembly 1946 ho chi minh",
  },
  {
    category: "kinh-te" as const,
    title: "Kinh tế",
    description:
      "Xác định nhiệm vụ cấp bách là 'diệt giặc đói'. Phát động phong trào 'Tăng gia sản xuất', lập 'Hũ gạo cứu đói', tổ chức 'Tuần lễ vàng', 'Quỹ độc lập'. Bãi bỏ thuế thân, phát hành đồng giấy bạc Việt Nam để xây dựng nền tài chính độc lập.",
    href: "/boi-canh-sau-1945/kinh-te",
    imageQuery: "vietnam rice production campaign 1945 famine relief",
  },
  {
    category: "giao-duc" as const,
    title: "Văn hóa - Giáo dục",
    description:
      "Xác định nhiệm vụ 'diệt giặc dốt'. Chủ tịch Hồ Chí Minh phát động phong trào 'Bình dân học vụ' để xóa nạn mù chữ. Vận động toàn dân xây dựng 'Đời sống mới'. Đến cuối năm 1946, đã có hơn 2,5 triệu người biết đọc, biết viết chữ quốc ngữ.",
    href: "/boi-canh-sau-1945/giao-duc",
    imageQuery: "vietnam literacy campaign binh dan hoc vu 1946",
  },
  {
    category: "quan-su" as const,
    title: "Quân sự - Quốc phòng",
    description:
      "Khẩn trương xây dựng Quân đội quốc gia và lực lượng công an nhân dân. Củng cố lực lượng vũ trang, xây dựng các an toàn khu (ATK) và căn cứ địa. Lãnh đạo nhân dân Nam Bộ kháng chiến từ tháng 9/1945. Phát động 'Toàn quốc kháng chiến' (19/12/1946).",
    href: "/boi-canh-sau-1945/quan-su",
    imageQuery: "vietnam people army founding 1945 military resistance",
  },
]

export default function BoiCanhSau1945Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection
          title="Bối cảnh sau 2/9/1945"
          subtitle="Tình thế ngàn cân treo sợi tóc"
          description="Sau khi nước Việt Nam Dân chủ Cộng hòa ra đời, đất nước đối mặt với giặc đói, giặc dốt, giặc ngoại xâm - những thách thức chồng chất đe dọa nền độc lập non trẻ."
          imageQuery="vietnam independence day september 2 1945 ba dinh square"
        />

        {categories.map((cat, index) => (
          <CategorySection key={cat.category} {...cat} index={index} />
        ))}
      </main>

      <Footer />
    </div>
  )
}
