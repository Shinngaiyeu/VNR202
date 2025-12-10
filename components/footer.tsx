import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-red-800 bg-red-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                <span className="text-red-700 font-bold text-lg">VN</span>
              </div>
              <span className="font-serif font-semibold text-lg text-white">Lịch Sử Việt Nam</span>
            </div>
            <p className="text-red-100 text-sm leading-relaxed">
              Tìm hiểu về lịch sử hào hùng của dân tộc Việt Nam qua các thời kỳ đấu tranh giành độc lập.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-400 mb-4">Nội dung</h3>
            <ul className="space-y-2 text-sm text-red-100">
              <li>
                <Link href="/boi-canh-truoc-1945" className="hover:text-yellow-400 transition-colors">
                  Bối cảnh trước 1945
                </Link>
              </li>
              <li>
                <Link href="/boi-canh-sau-1945" className="hover:text-yellow-400 transition-colors">
                  Bối cảnh sau 1945
                </Link>
              </li>
              <li>
                <Link href="/chu-truong-duong-loi" className="hover:text-yellow-400 transition-colors">
                  Chủ trương đường lối của Đảng
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-400 mb-4">Liên hệ</h3>
            <p className="text-sm text-red-100">
              Website được xây dựng với mục đích giáo dục và tuyên truyền lịch sử dân tộc.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-red-600 text-center text-sm text-red-200">
          <p>© 2025 Lịch Sử Cách Mạng Việt Nam. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
