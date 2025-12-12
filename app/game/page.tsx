"use client"

import { useState, useEffect, useRef } from "react"
import { Shield, Wheat, Users, AlertTriangle, Trophy, Skull, RotateCcw, Award, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { database } from "@/lib/firebase"
import { ref, push, serverTimestamp } from "firebase/database"

// Game data - 30 vòng chơi đầy đủ
const gameRounds = [
  {
    id: 1,
    context:
      "Báo cáo khẩn: Thưa Chủ tịch, chúng ta vừa tiếp quản Ngân khố Trung ương nhưng tình hình quá bi đát. Trong kho chỉ còn vẻn vẹn 1,2 triệu đồng Đông Dương, mà quá nửa là tiền rách nát sắp hủy. Nợ công thì chồng chất, lương cán bộ, chi phí quốc phòng đều không có. Chúng ta cần tiền ngay lập tức để bộ máy không bị tê liệt! Ngài quyết định thế nào?",
    choices: [
      {
        id: "A",
        text: 'Phát động "Tuần lễ Vàng": Dựa vào lòng yêu nước, kêu gọi dân quyên góp vàng bạc cứu nước.',
        effects: { defense: 10, food: -5, morale: 5 },
        consequence: "Nhân dân hưởng ứng nhiệt liệt, quyên góp được 370kg vàng và 20 triệu đồng!",
      },
      {
        id: "B",
        text: "In tiền mới ngay: Bất chấp chưa có máy móc tốt và chưa có vàng bảo chứng, cứ in tiền để chi tiêu.",
        effects: { defense: 10, food: -15, morale: -5 },
        consequence: "Lạm phát tăng vọt, tiền mất giá nhanh chóng, đời sống nhân dân khó khăn hơn.",
      },
      {
        id: "C",
        text: "Tăng thuế thân: Tiếp tục thu các loại thuế nặng như thời Pháp để bù ngân sách.",
        effects: { defense: 5, food: 10, morale: -20 },
        consequence: "Dân oán thán, so sánh chính quyền mới không khác gì thực dân.",
      },
    ],
  },
  {
    id: 2,
    context:
      "Tin dữ từ các tỉnh: Thưa Chủ tịch, hậu quả nạn đói năm 1945 vẫn chưa dứt. Đê vỡ, mùa màng thất bát, hàng triệu đồng bào đang ngoi ngóp. Kho gạo dự trữ quốc gia đã cạn kiệt. Nếu không có biện pháp cấp bách, nạn đói sẽ quay lại và tàn khốc hơn xưa. Lòng dân đang dao động dữ dội.",
    choices: [
      {
        id: "A",
        text: 'Hũ gạo cứu đói: Kêu gọi toàn dân "Sẻ cơm nhường áo", mỗi bữa bớt một nắm gạo, 10 ngày nhịn ăn 1 bữa.',
        effects: { defense: -5, food: 15, morale: 10 },
        consequence: "Phong trào lan rộng bền vững, tình đoàn kết dân tộc được củng cố.",
      },
      {
        id: "B",
        text: "Trưng thu gạo: Dùng biện pháp mạnh tịch thu lúa gạo của địa chủ chia cho dân nghèo.",
        effects: { defense: 5, food: 20, morale: -15 },
        consequence: "Có gạo cứu đói nhưng mất đoàn kết, một số địa chủ yêu nước bất mãn.",
      },
      {
        id: "C",
        text: "Mua gạo giá cao: Dùng số tiền ít ỏi còn lại nhập khẩu gạo từ xa về.",
        effects: { defense: -15, food: 5, morale: 5 },
        consequence: "Gạo về ít ỏi, hết tiền mua súng, ngân sách quốc phòng cạn kiệt.",
      },
    ],
  },
  {
    id: 3,
    context:
      "Điện khẩn từ Nam Bộ (23/9): Thực dân Pháp đã nổ súng đánh chiếm Sài Gòn, núp bóng quân Anh. Nhân dân Nam Bộ đang dùng tầm vông vạt nhọn chống lại súng đạn hiện đại. Đồng bào miền Nam đang tha thiết mong chờ chi viện từ Trung ương. Miền Bắc cũng đang rất khó khăn, ta phải tính sao?",
    choices: [
      {
        id: "A",
        text: "Nam tiến: Chọn những đơn vị tinh nhuệ nhất, vũ khí tốt nhất gửi ngay vào Nam.",
        effects: { defense: -15, food: -5, morale: 20 },
        consequence: "Lòng dân phấn chấn, Nam Bộ vững tin nhưng miền Bắc phòng thủ yếu đi.",
      },
      {
        id: "B",
        text: "Phòng thủ: Giữ quân chủ lực lại bảo vệ Trung ương vì quân Tưởng sắp vào miền Bắc.",
        effects: { defense: 10, food: 5, morale: -20 },
        consequence: "Nam Bộ thất vọng, tinh thần kháng chiến miền Nam suy giảm nghiêm trọng.",
      },
      {
        id: "C",
        text: "Chỉ gửi nhu yếu phẩm: Gửi gạo, thuốc men, quần áo, giữ người lại.",
        effects: { defense: 5, food: -15, morale: 5 },
        consequence: "Hỗ trợ được phần nào, giữ được lực lượng nhưng Nam Bộ vẫn thiếu quân.",
      },
    ],
  },
  {
    id: 4,
    context:
      "Báo cáo Giáo dục: Thưa Chủ tịch, thống kê cho thấy 95% dân số Việt Nam mù chữ. Một dân tộc dốt là một dân tộc yếu. Không biết chữ thì không hiểu chính sách, không biết cách canh tác mới, và dễ bị địch tuyên truyền lừa bịp. Nhưng mở trường lúc này thì lấy đâu ra tiền và giáo viên?",
    choices: [
      {
        id: "A",
        text: "Bình dân học vụ: Phát động toàn dân học chữ. Người biết dạy người chưa biết. Học mọi lúc mọi nơi.",
        effects: { defense: -5, food: -10, morale: 20 },
        consequence: "Phong trào lan rộng khắp nơi, hàng triệu người biết đọc biết viết.",
      },
      {
        id: "B",
        text: "Ưu tiên quân đội: Chỉ tập trung xóa mù chữ cho tân binh để biết bắn súng.",
        effects: { defense: 10, food: 5, morale: -10 },
        consequence: "Quân đội mạnh lên nhưng dân vẫn mù chữ, khó tuyên truyền đường lối.",
      },
      {
        id: "C",
        text: "Tạm hoãn: Dồn sức cho việc tăng gia sản xuất kiếm ăn trước đã.",
        effects: { defense: 0, food: 15, morale: -20 },
        consequence: "Lương thực khá hơn nhưng dân trí thấp, khó phát triển lâu dài.",
      },
    ],
  },
  {
    id: 5,
    context:
      'Tin tình báo biên giới: 20 vạn quân Tưởng Giới Thạch (Trung Hoa Dân Quốc) đã tràn qua biên giới phía Bắc với danh nghĩa giải giáp quân Nhật. Thực chất chúng muốn "Diệt Cộng, Cầm Hồ". Chúng mang theo bọn Việt Quốc, Việt Cách về quấy rối. Lực lượng ta còn quá non yếu để đánh lại 20 vạn quân này.',
    choices: [
      {
        id: "A",
        text: "Hòa hoãn, nhân nhượng: Cung cấp gạo cho chúng ăn, cho chúng tiêu tiền Quan Kim để tránh xung đột.",
        effects: { defense: 10, food: -20, morale: -5 },
        consequence: "Tốn kém nhưng tránh được đổ máu, giữ được chính quyền.",
      },
      {
        id: "B",
        text: "Đánh phủ đầu: Dùng quân đội non trẻ tấn công ngay khi chúng vừa đến.",
        effects: { defense: -30, food: -10, morale: 10 },
        consequence: "Thua to, lực lượng tổn thất nặng nề, nguy cơ mất chính quyền.",
      },
      {
        id: "C",
        text: '"Vườn không nhà trống": Bất hợp tác, không cung cấp gì cả.',
        effects: { defense: -5, food: -10, morale: -10 },
        consequence: "Bị cướp bóc, dân sợ hãi, tình hình thêm rối loạn.",
      },
    ],
  },
  {
    id: 6,
    context:
      "Thiên tai ập đến: Đê sông Hồng bị vỡ nhiều đoạn do lũ lớn chưa từng thấy. Lúa chiêm đang chín có nguy cơ mất trắng. Nếu không hộ đê kịp thời, nạn đói sẽ quay lại ngay lập tức. Nhưng quân đội đang phải căng mình canh gác quân Tưởng.",
    choices: [
      {
        id: "A",
        text: "Điều quân hộ đê: Điều động vệ quốc đoàn đi đắp đê ngăn lũ.",
        effects: { defense: -15, food: 15, morale: 5 },
        consequence: "Cứu được mùa màng nhưng phải bỏ vị trí chiến đấu canh gác.",
      },
      {
        id: "B",
        text: "Cưỡng bức lao động: Bắt dân công đi đắp đê không công.",
        effects: { defense: 5, food: 10, morale: -15 },
        consequence: "Đê được đắp nhưng dân khổ sở, oán thán chính quyền.",
      },
      {
        id: "C",
        text: "Chấp nhận mất mùa: Tập trung quân chiến đấu, để mặc thiên tai.",
        effects: { defense: 10, food: -20, morale: -10 },
        consequence: "Quân sự ổn định nhưng nạn đói cận kề, lương thực cạn kiệt.",
      },
    ],
  },
  {
    id: 7,
    context:
      'Sức ép chính trị: Bọn Việt Quốc, Việt Cách (tay sai Tưởng) đòi chia ghế trong Chính phủ. Chúng dọa nếu không được 70 ghế trong Quốc hội (không qua bầu cử) và các vị trí Bộ trưởng quan trọng, quân Tưởng sẽ "dọn dẹp". Đây là sự tống tiền chính trị trắng trợn.',
    choices: [
      {
        id: "A",
        text: "Nhượng bộ tạm thời: Cho chúng 70 ghế và một số ghế Bộ trưởng để giữ hòa bình.",
        effects: { defense: 10, food: 5, morale: -15 },
        consequence: "Giữ được hòa bình nhưng chính quyền bị chia sẻ, khó điều hành.",
      },
      {
        id: "B",
        text: "Cương quyết từ chối: Không nhượng bộ, sẵn sàng đối đầu.",
        effects: { defense: -20, food: -10, morale: 15 },
        consequence: "Giữ được nguyên tắc nhưng nguy cơ xung đột với quân Tưởng.",
      },
      {
        id: "C",
        text: "Mặc cả: Cho một số ghế nhỏ, không cho vị trí quan trọng.",
        effects: { defense: 5, food: 0, morale: -5 },
        consequence: "Thỏa hiệp tạm chấp nhận được nhưng chúng vẫn bất mãn.",
      },
    ],
  },
  {
    id: 8,
    context:
      "Tăng gia sản xuất: Để tự túc lương thực, ta cần biến mọi mảnh đất hoang thành ruộng lúa, vườn rau. Nhưng dân đang thiếu giống, thiếu nông cụ, và cả thiếu sức lao động vì thanh niên đã nhập ngũ. Ta cần quyết định hướng đi cho nông nghiệp.",
    choices: [
      {
        id: "A",
        text: '"Tấc đất tấc vàng": Vận động toàn dân tăng gia, cấp phát giống, cho vay không lãi.',
        effects: { defense: -5, food: 20, morale: 10 },
        consequence: "Sản xuất nông nghiệp phục hồi mạnh mẽ, nguy cơ đói được đẩy lùi.",
      },
      {
        id: "B",
        text: "Trưng dụng ruộng bỏ hoang: Tịch thu ruộng của địa chủ vắng mặt chia cho dân nghèo.",
        effects: { defense: 5, food: 15, morale: -10 },
        consequence: "Có thêm đất nhưng gây xáo trộn xã hội, một số người bất mãn.",
      },
      {
        id: "C",
        text: "Ưu tiên quốc phòng: Giữ nguyên lao động cho quân đội, nông nghiệp tự phát triển.",
        effects: { defense: 10, food: -10, morale: -5 },
        consequence: "Quân đội mạnh nhưng lương thực thiếu hụt trầm trọng.",
      },
    ],
  },
  {
    id: 9,
    context:
      "Tổng tuyển cử (1/1946): Đã đến lúc khẳng định tính hợp pháp của chính quyền qua lá phiếu của dân. Tuy nhiên, bọn Việt Quốc, Việt Cách đòi hoãn bầu cử vì chúng biết sẽ thua. Quân Tưởng gây sức ép. Một số người lo ngại tổ chức bầu cử trong điều kiện hỗn loạn sẽ thất bại.",
    choices: [
      {
        id: "A",
        text: "Tổ chức ngay: Tiến hành Tổng tuyển cử đúng ngày 6/1/1946 như đã công bố.",
        effects: { defense: -10, food: -5, morale: 20 },
        consequence: "Bầu cử thành công với 89% cử tri tham gia. Chính quyền có tính hợp pháp cao.",
      },
      {
        id: "B",
        text: "Hoãn bầu cử: Chờ tình hình ổn định hơn mới tổ chức.",
        effects: { defense: 5, food: 5, morale: -15 },
        consequence: "Mất thời cơ, địch có cớ nói ta không dân chủ.",
      },
      {
        id: "C",
        text: "Bầu cử hạn chế: Chỉ tổ chức ở vùng an toàn, kiểm soát được.",
        effects: { defense: 5, food: 0, morale: -10 },
        consequence: "Kết quả không đại diện, tính hợp pháp bị nghi ngờ.",
      },
    ],
  },
  {
    id: 10,
    context:
      "Xây dựng Hiến pháp: Quốc hội đầu tiên đã họp. Bây giờ cần xây dựng Hiến pháp để khẳng định nền tảng pháp lý của quốc gia. Tuy nhiên, có nhiều tranh cãi về mô hình nhà nước, quyền công dân, và vai trò của các đảng phái.",
    choices: [
      {
        id: "A",
        text: "Hiến pháp dân chủ rộng rãi: Công nhận quyền tự do của mọi công dân, đa đảng, đại đoàn kết dân tộc.",
        effects: { defense: 5, food: 0, morale: 15 },
        consequence: "Hiến pháp 1946 ra đời, được đánh giá là dân chủ tiến bộ nhất Đông Nam Á.",
      },
      {
        id: "B",
        text: "Hiến pháp tập trung: Quyền lực tập trung để dễ điều hành trong chiến tranh.",
        effects: { defense: 15, food: 5, morale: -10 },
        consequence: "Điều hành hiệu quả hơn nhưng bị chỉ trích là độc tài.",
      },
      {
        id: "C",
        text: "Hoãn Hiến pháp: Chiến tranh đang đến, Hiến pháp có thể tính sau.",
        effects: { defense: 10, food: 5, morale: -20 },
        consequence: "Mất cơ hội khẳng định tính hợp pháp, địch có cớ công kích.",
      },
    ],
  },
  {
    id: 11,
    context:
      "Tin mật (2/1946): Pháp và Tưởng vừa ký Hiệp ước Hoa-Pháp. Theo đó, Pháp trả lại các tô giới cho Tưởng, đổi lại Tưởng cho Pháp ra Bắc thay thế quân đội. Chúng ta đang đứng trước nguy cơ bị kẹp giữa 2 gọng kìm. Nếu đánh Pháp lúc này, Tưởng sẽ trợ giúp Pháp tiêu diệt ta.",
    choices: [
      {
        id: "A",
        text: '"Hòa Pháp đuổi Tưởng": Đàm phán để Pháp ra Bắc, mượn tay Pháp đuổi 20 vạn quân Tưởng về nước.',
        effects: { defense: 10, food: 5, morale: -10 },
        consequence: "Loại được 1 kẻ thù, nhưng dân chưa hiểu sách lược nên hoang mang.",
      },
      {
        id: "B",
        text: "Đánh cả hai: Quyết chiến với cả thực dân Pháp và quân Tưởng.",
        effects: { defense: -40, food: -15, morale: 10 },
        consequence: "Tự sát! Lực lượng non yếu không thể chống lại 2 kẻ thù cùng lúc.",
      },
      {
        id: "C",
        text: "Liên minh với Tưởng: Chấp nhận làm chư hầu cho Tưởng để chống Pháp.",
        effects: { defense: -15, food: -25, morale: -10 },
        consequence: "Mất độc lập! Trở thành tay sai của Tưởng Giới Thạch.",
      },
    ],
  },
  {
    id: 12,
    context:
      "Quyết định Lịch sử (6/3): Pháp đồng ý công nhận Việt Nam là quốc gia tự do nhưng phải nằm trong khối Liên hiệp Pháp. Chúng đòi đưa 15.000 quân ra Bắc. Sáng nay, hạm đội Pháp đã vào vịnh Bắc Bộ. Nếu không ký Hiệp định Sơ bộ, súng sẽ nổ ngay chiều nay. Lực lượng ta chưa sẵn sàng.",
    choices: [
      {
        id: "A",
        text: "Ký Hiệp định Sơ bộ: Chấp nhận cho Pháp ra 5 năm rồi rút dần. Cần thời gian để xây dựng lực lượng.",
        effects: { defense: 20, food: 0, morale: -15 },
        consequence: "Thêm thời gian quý báu để chuẩn bị, nhưng dân biểu tình phản đối.",
      },
      {
        id: "B",
        text: "Không ký: Phát lệnh tổng tấn công, tử thủ Hà Nội.",
        effects: { defense: -30, food: -10, morale: 15 },
        consequence: "Thua sớm! Lực lượng chưa sẵn sàng, khí thế có nhưng không đủ.",
      },
      {
        id: "C",
        text: "Câu giờ: Kéo dài đàm phán, không trả lời.",
        effects: { defense: -10, food: -5, morale: -5 },
        consequence: "Pháp lấn tới, tình hình càng bất lợi.",
      },
    ],
  },
  {
    id: 13,
    context:
      'Giải thích cho dân: Dân chúng đang phẫn nộ vì cho rằng Chính phủ "bán nước" khi ký hòa hoãn với Pháp. Các cuộc biểu tình nổ ra. Nếu không giải thích rõ sách lược "Hòa để tiến", lòng dân sẽ ly tán.',
    choices: [
      {
        id: "A",
        text: 'Mít tinh giải thích: Chủ tịch Hồ Chí Minh trực tiếp ra Nhà hát lớn nói chuyện với đồng bào: "Tôi thà làm phân cho đất nước này còn hơn làm vua một nước nô lệ".',
        effects: { defense: -5, food: -5, morale: 20 },
        consequence: "Lòng dân được củng cố, hiểu rõ sách lược của Đảng và Chính phủ.",
      },
      {
        id: "B",
        text: "Trấn áp biểu tình: Cấm tụ tập, bắt giam kẻ kích động.",
        effects: { defense: 10, food: 5, morale: -25 },
        consequence: "Mất lòng dân nghiêm trọng! Dân so sánh ta với thực dân.",
      },
      {
        id: "C",
        text: 'Im lặng: "Hữu xạ tự nhiên hương", việc mình mình làm.',
        effects: { defense: 0, food: 0, morale: -15 },
        consequence: "Dân hoang mang, tin đồn lan tràn, lòng tin suy giảm.",
      },
    ],
  },
  {
    id: 14,
    context:
      "Vụ án Ôn Như Hầu (7/1946): Quân Tưởng vừa rút, Công an phát hiện bọn Đại Việt Quốc dân đảng (tay sai Tưởng) đang tàng trữ vũ khí và in truyền đơn giả, âm mưu đảo chính lật đổ Chính phủ vào ngày Quốc khánh Pháp (14/7). Chúng bắt cóc tống tiền và giết người chôn xác tại trụ sở.",
    choices: [
      {
        id: "A",
        text: "Đột kích tiêu diệt: Công an tấn công bất ngờ vào sào huyệt, đưa vụ việc ra ánh sáng.",
        effects: { defense: 15, food: -5, morale: 10 },
        consequence: "Diệt nội gián! Âm mưu đảo chính bị vạch trần, dân tin tưởng chính quyền.",
      },
      {
        id: "B",
        text: "Thỏa hiệp: Mời chúng đàm phán để tránh gây ồn ào.",
        effects: { defense: -20, food: 0, morale: -15 },
        consequence: "Nuôi ong tay áo! Chúng lợi dụng để củng cố lực lượng.",
      },
      {
        id: "C",
        text: "Bao vây: Chỉ canh gác bên ngoài, không dám tấn công.",
        effects: { defense: -5, food: 0, morale: -5 },
        consequence: "Chúng có thời gian phi tang, âm mưu vẫn tiếp tục.",
      },
    ],
  },
  {
    id: 15,
    context:
      "Đào tạo Sĩ quan: Quân đội ta dũng cảm nhưng thiếu kỹ thuật chỉ huy bài bản. Cần gấp một đội ngũ sĩ quan chuyên nghiệp. Tuy nhiên, mở trường võ bị lúc này rất tốn kém và gây sự chú ý của Pháp.",
    choices: [
      {
        id: "A",
        text: "Mở trường Võ bị Trần Quốc Tuấn: Đào tạo sĩ quan chính quy, bài bản.",
        effects: { defense: 20, food: -15, morale: 5 },
        consequence: "Quân đội có cán bộ chỉ huy giỏi, sức chiến đấu tăng mạnh.",
      },
      {
        id: "B",
        text: "Thuê chuyên gia Nhật: Thuê sĩ quan Nhật cũ ở lại dạy.",
        effects: { defense: 10, food: -10, morale: -10 },
        consequence: "Học được kỹ thuật nhưng dân dị nghị vì Nhật là phát xít.",
      },
      {
        id: "C",
        text: '"Chiến trường là thao trường": Tự học khi đánh nhau.',
        effects: { defense: 5, food: 0, morale: 0 },
        consequence: "Tiết kiệm nhưng sĩ quan thiếu kỹ năng, tổn thất nhiều.",
      },
    ],
  },
  {
    id: 16,
    context:
      "Mặt trận Tài chính: Pháp đang tìm cách phá hoại kinh tế ta bằng cách ép dùng tiền Đông Dương. Chúng không công nhận tiền Việt Nam. Ta cần khẳng định chủ quyền tài chính nhưng tiền ta in chưa đẹp, dễ bị làm giả.",
    choices: [
      {
        id: "A",
        text: "Lưu hành Giấy bạc Cụ Hồ: Bắt buộc dùng tiền Việt, cấm tiền Pháp.",
        effects: { defense: -10, food: 15, morale: 10 },
        consequence: "Tự chủ tài chính! Nhưng Pháp khiêu khích vì bị mất quyền lợi.",
      },
      {
        id: "B",
        text: "Dùng song song: Chấp nhận cả 2 loại tiền.",
        effects: { defense: 5, food: -10, morale: -10 },
        consequence: "Phụ thuộc Pháp về tài chính, kinh tế bị chi phối.",
      },
      {
        id: "C",
        text: "Quay về hiện vật: Khuyến khích đổi gạo lấy hàng.",
        effects: { defense: 0, food: -15, morale: -5 },
        consequence: "Kinh tế thụt lùi, giao thương khó khăn.",
      },
    ],
  },
  {
    id: 17,
    context:
      "Chuyến đi lịch sử: Hội nghị Fontainebleau tại Pháp sắp diễn ra. Tình hình rất căng thẳng. Có ý kiến cho rằng Chủ tịch Hồ Chí Minh nên trực tiếp sang Pháp để vận động ngoại giao nhân dân và Chính phủ Pháp, dù chuyến đi rất nguy hiểm và tốn kém.",
    choices: [
      {
        id: "A",
        text: "Bác Hồ đi Pháp: Thể hiện thiện chí hòa bình, tranh thủ sự ủng hộ của nhân dân Pháp.",
        effects: { defense: 5, food: -10, morale: 15 },
        consequence: "Uy tín Việt Nam cao trên trường quốc tế, kéo dài được hòa bình.",
      },
      {
        id: "B",
        text: "Hủy chuyến đi: Ở nhà chuẩn bị công sự, đào hầm.",
        effects: { defense: -15, food: -5, morale: 5 },
        consequence: "Chiến tranh nổ ra sớm hơn, ta chưa kịp chuẩn bị.",
      },
      {
        id: "C",
        text: "Cử cấp dưới đi: Bác ở nhà để đảm bảo an toàn.",
        effects: { defense: -5, food: 0, morale: -5 },
        consequence: "Thiếu trọng lượng ngoại giao, Pháp xem thường.",
      },
    ],
  },
  {
    id: 18,
    context:
      'Tình thế "Ngàn cân" (14/9/1946): Đàm phán tại Pháp tan vỡ. Phái đoàn ta đã về nước. Bác Hồ nán lại Paris. Nếu về tay không, chiến tranh sẽ nổ ra ngay khi ta chưa đủ súng đạn. Pháp ép ta ký Tạm ước, nhân nhượng thêm quyền lợi kinh tế cho chúng.',
    choices: [
      {
        id: "A",
        text: "Ký Tạm ước 14/9: Chấp nhận thiệt thòi kinh tế để mua thêm thời gian chuẩn bị.",
        effects: { defense: 15, food: -10, morale: -10 },
        consequence: "Quý giá! Thêm thời gian xây dựng lực lượng, nhưng mất quyền thuế quan.",
      },
      {
        id: "B",
        text: "Về nước tay không: Chấp nhận chiến tranh ngay lập tức.",
        effects: { defense: -20, food: 5, morale: 10 },
        consequence: "Chưa sẵn sàng! Chiến tranh nổ ra khi ta còn yếu.",
      },
      {
        id: "C",
        text: "Đầu hàng: Chấp nhận Việt Nam tự trị trong khuôn khổ Pháp.",
        effects: { defense: -10, food: -30, morale: -30 },
        consequence: "Mất tất cả! Độc lập tan thành mây khói.",
      },
    ],
  },
  {
    id: 19,
    context:
      "Sự kiện Hải Phòng (11/1946): Pháp ngang nhiên lập thuế quan tại Hải Phòng, nổ súng vào công an và dân thường ta. Chúng dùng xe tăng, máy bay tàn sát khu phố người Việt. Lệnh từ Hà Nội là gì?",
    choices: [
      {
        id: "A",
        text: "Đánh trả kìm chế: Kiên quyết đánh trả để tự vệ nhưng chưa mở rộng chiến tranh.",
        effects: { defense: -5, food: -5, morale: 10 },
        consequence: "Giữ được danh dự, chưa để chiến tranh lan rộng.",
      },
      {
        id: "B",
        text: "Tổng tấn công: Dốc toàn lực đánh Pháp ở Hải Phòng.",
        effects: { defense: -25, food: -10, morale: 15 },
        consequence: "Lộ bài quá sớm! Pháp có cớ mở rộng chiến tranh.",
      },
      {
        id: "C",
        text: "Rút lui: Bỏ Hải Phòng để bảo toàn lực lượng.",
        effects: { defense: -15, food: 0, morale: -20 },
        consequence: "Mất cảng biển chiến lược! Dân phẫn nộ vì bị bỏ rơi.",
      },
    ],
  },
  {
    id: 20,
    context:
      "Sơ tán khẩn cấp: Chiến tranh không thể tránh khỏi. Hà Nội tập trung rất nhiều người già, trẻ em và máy móc công nghiệp. Nếu chiến sự nổ ra, đây sẽ là gánh nặng. Nhưng sơ tán lúc này sẽ làm xáo trộn cuộc sống và giảm sản xuất.",
    choices: [
      {
        id: "A",
        text: "Tản cư triệt để: Đưa người già, trẻ em và máy móc lên chiến khu ngay lập tức.",
        effects: { defense: 15, food: -15, morale: 5 },
        consequence: "Sẵn sàng kháng chiến lâu dài! Nhưng sản xuất bị ngưng trệ.",
      },
      {
        id: "B",
        text: "Ở lại sản xuất: Giữ máy móc và công nhân lại Hà Nội đến phút chót.",
        effects: { defense: -30, food: 10, morale: -10 },
        consequence: "Địch chiếm được máy móc! Mất tư liệu sản xuất quan trọng.",
      },
      // Updated choice C text
      {
        id: "C",
        text: "Nửa vời: Chỉ sơ tán một phần, còn lại chờ xem tình hình.",
        effects: { defense: -10, food: 0, morale: -5 },
        consequence: "Thiệt hại nặng! Nhiều người mắc kẹt khi chiến sự nổ ra.",
      },
    ],
  },
  // Vòng 21-30
  {
    id: 21,
    context:
      "Thảm sát Yên Ninh (12/1946): Quân Pháp vô cớ ném lựu đạn, bắn giết dân thường ở phố Hàng Bún, Yên Ninh (Hà Nội). Sự căm phẫn của nhân dân lên tột độ. Các chiến sĩ tự vệ đòi đánh ngay. Nhưng Trung ương Đảng vẫn chưa phát lệnh.",
    choices: [
      {
        id: "A",
        text: "Gửi tối hậu thư cảnh cáo: Tố cáo tội ác của Pháp trước dư luận, kìm chế bộ đội.",
        effects: { defense: -5, food: 0, morale: -5 },
        consequence: "Dân nóng lòng nhưng giữ được kỷ luật, tranh thủ dư luận quốc tế.",
      },
      {
        id: "B",
        text: "Trả đũa ngay: Pháo kích vào trại lính Pháp để trả thù.",
        effects: { defense: -10, food: -5, morale: 10 },
        consequence: "Lộ hỏa điểm bí mật! Địch biết vị trí pháo binh ta.",
      },
      {
        id: "C",
        text: "Im lặng: Nhẫn nhịn chờ thời cơ.",
        effects: { defense: 5, food: 0, morale: -15 },
        consequence: "Dân phẫn uất! Nhiều người cho rằng Chính phủ hèn nhát.",
      },
    ],
  },
  {
    id: 22,
    context:
      "Tối hậu thư (18/12): Tướng Morlière gửi tối hậu thư đòi ta giải tán lực lượng tự vệ, giao quyền kiểm soát an ninh Hà Nội cho Pháp. Nếu không, sáng 20/12 chúng sẽ nổ súng. Giờ phút quyết định đã đến.",
    choices: [
      {
        id: "A",
        text: "Bác bỏ & Chuẩn bị: Ra lệnh toàn quốc chuẩn bị chiến đấu vào đêm 19/12.",
        effects: { defense: 10, food: -5, morale: 15 },
        consequence: "Chủ động! Ta giành thế chủ động tấn công trước khi địch kịp hành động.",
      },
      {
        id: "B",
        text: "Chấp nhận: Giao nộp vũ khí để giữ hòa bình.",
        effects: { defense: -100, food: 10, morale: -50 },
        consequence: "Đầu hàng! Mất hết vũ khí, không còn khả năng kháng chiến. GAME OVER!",
      },
      {
        id: "C",
        text: "Xin hoãn: Đề nghị đàm phán thêm.",
        effects: { defense: -20, food: 5, morale: -5 },
        consequence: "Mất yếu tố bất ngờ! Pháp biết ta đang cố kéo dài thời gian.",
      },
    ],
  },
  {
    id: 23,
    context:
      "Giờ G (20h00 ngày 19/12): Đèn điện thành phố vụt tắt. Đây là hiệu lệnh tấn công. Pháo đài Láng chuẩn bị khai hỏa. Bạn sẽ chọn chiến thuật nào cho trận mở màn này?",
    choices: [
      {
        id: "A",
        text: "Pháo kích & Du kích: Bắn pháo vào thành, sau đó bộ binh đánh du kích tiêu hao địch.",
        effects: { defense: -10, food: -5, morale: 20 },
        consequence: "Chiến thuật đúng đắn! Gây thiệt hại cho địch mà bảo toàn lực lượng.",
      },
      {
        id: "B",
        text: "Xung phong tổng lực: Dùng toàn bộ lực lượng xông lên chiếm trại Pháp.",
        effects: { defense: -40, food: -10, morale: 10 },
        consequence: "Thương vong cực lớn! Địch có hỏa lực mạnh, ta mất nhiều chiến sĩ.",
      },
      {
        id: "C",
        text: "Rút lui ngay: Bỏ thành phố lên núi ngay đêm nay.",
        effects: { defense: 5, food: 0, morale: -30 },
        consequence: "Mất niềm tin! Dân chúng hoang mang vì ta không đánh mà đã chạy.",
      },
    ],
  },
  {
    id: 24,
    context:
      'Lời hịch non sông: Sáng 20/12, Đài Tiếng nói Việt Nam phát đi "Lời kêu gọi Toàn quốc kháng chiến" của Chủ tịch Hồ Chí Minh: "Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ".',
    choices: [
      {
        id: "A",
        text: "Phát sóng rộng rãi: Dùng mọi phương tiện (đài, loa, truyền đơn) để loan tin.",
        effects: { defense: 5, food: -10, morale: 30 },
        consequence: "Khí thế ngút trời! Toàn dân đoàn kết một lòng kháng chiến.",
      },
      {
        id: "B",
        text: "Chỉ gửi công văn: Gửi lệnh cho các đơn vị quân đội.",
        effects: { defense: 5, food: 0, morale: -10 },
        consequence: "Dân không biết gì! Thiếu sự phối hợp của nhân dân.",
      },
      {
        id: "C",
        text: "Giữ bí mật: Không công bố rộng rãi để bảo mật.",
        effects: { defense: -10, food: 0, morale: -30 },
        consequence: "Dân không biết gì để giúp! Kháng chiến thiếu sức mạnh toàn dân.",
      },
    ],
  },
  {
    id: 25,
    context:
      'Tiêu thổ kháng chiến: Để ngăn chặn xe tăng Pháp nới rộng vùng chiếm đóng, ta cần thực hiện "Vườn không nhà trống". Phá hủy nhà cửa, đường sá của chính mình là quyết định đau đớn nhất. Bạn có dám làm không?',
    choices: [
      {
        id: "A",
        text: "Phá hủy triệt để: Phá tan nhà cửa, đường tàu, công sở. Hy sinh tài sản để kháng chiến.",
        effects: { defense: 30, food: -40, morale: -5 },
        consequence: "Kinh tế sụp đổ nhưng địch không thể sử dụng cơ sở hạ tầng!",
      },
      {
        id: "B",
        text: "Chỉ phá công sở: Giữ lại nhà dân.",
        effects: { defense: -25, food: -15, morale: 5 },
        consequence: "Địch hành quân dễ dàng! Chúng dùng nhà dân làm đồn bốt.",
      },
      {
        id: "C",
        text: "Không phá gì cả: Để nguyên vẹn hy vọng ngày trở về.",
        effects: { defense: -50, food: 0, morale: 5 },
        consequence: "Địch dùng làm căn cứ! Rủi ro thua cuộc rất cao.",
      },
    ],
  },
  {
    id: 26,
    context:
      "Quyết tử: Trung đoàn Thủ đô bị vây chặt ở Liên khu 1 (Phố cổ). Lệnh trên là phải giam chân địch càng lâu càng tốt để Trung ương rút lui an toàn. Nhưng ở lại đồng nghĩa với cái chết cận kề.",
    choices: [
      {
        id: "A",
        text: "Cố thủ: Giam chân địch, giành giật từng căn nhà.",
        effects: { defense: -25, food: -10, morale: 20 },
        consequence: "Hy sinh nhiều nhưng hoàn thành nhiệm vụ! Trung ương rút lui an toàn.",
      },
      {
        id: "B",
        text: "Rút ngay: Bảo toàn lực lượng, rút ra ngoại thành.",
        effects: { defense: -5, food: 0, morale: -15 },
        consequence: "Pháp rảnh tay đánh chỗ khác! Trung ương bị đe dọa.",
      },
      {
        id: "C",
        text: "Phản kích: Đánh ra ngoài vòng vây để tiêu diệt địch.",
        effects: { defense: -40, food: -15, morale: 10 },
        consequence: "Thương vong lớn! Địch có hỏa lực áp đảo.",
      },
    ],
  },
  {
    id: 27,
    context:
      "Vòng vây siết chặt: Lương thực trong Liên khu 1 đã cạn kiệt. Bộ đội phải ăn gạo sấy, uống nước máy hỏng. Nhân dân ngoại thành muốn tiếp tế nhưng đường vào rất nguy hiểm.",
    choices: [
      {
        id: "A",
        text: "Tiếp tế cảm tử: Dân ngoại thành liều chết vượt lửa đạn đưa gạo vào.",
        effects: { defense: 10, food: -20, morale: 10 },
        consequence: "Lính được no bụng nhưng tốn kém và nhiều dân quân hy sinh!",
      },
      {
        id: "B",
        text: "Tự túc: Ăn dè sẻn, bắt chuột, chim để sống.",
        effects: { defense: -20, food: 5, morale: 5 },
        consequence: "Sức khỏe giảm sút! Bộ đội suy kiệt dần.",
      },
      {
        id: "C",
        text: "Cướp kho: Đột kích kho gạo Đồng Xuân của địch.",
        effects: { defense: -25, food: 15, morale: 5 },
        consequence: "Rủi ro cực cao! Nhiều chiến sĩ hy sinh nhưng có thêm lương thực.",
      },
    ],
  },
  {
    id: 28,
    context:
      "Chống xe tăng: Xe tăng Pháp lù lù tiến vào Hàng Thiếc, Hàng Bồ. Vũ khí chống tăng của ta gần như không có, chỉ còn vài quả bom ba càng cuối cùng.",
    choices: [
      {
        id: "A",
        text: "Cảm tử quân: Các chiến sĩ ôm bom ba càng lao vào xe tăng địch.",
        effects: { defense: -30, food: 0, morale: 25 },
        consequence: "Mất chiến sĩ tinh nhuệ nhưng trở thành biểu tượng anh hùng bất diệt!",
      },
      {
        id: "B",
        text: "Chướng ngại vật: Dùng tủ chè, sập gụ chặn đường.",
        effects: { defense: -15, food: -5, morale: 5 },
        consequence: "Hiệu quả thấp! Xe tăng vượt qua dễ dàng.",
      },
      {
        id: "C",
        text: "Bỏ chạy: Tránh đối đầu, lùi sâu vào trong.",
        effects: { defense: -20, food: 0, morale: -20 },
        consequence: "Mất chốt quan trọng! Tinh thần bộ đội suy sụp.",
      },
    ],
  },
  {
    id: 29,
    context:
      "Tết Đinh Hợi (1947): Tết đến ngay trong vòng vây. Lương thực cạn, đạn dược hết. Một cái Tết có thể là cuối cùng của nhiều người. Bạn sẽ tổ chức thế nào?",
    choices: [
      {
        id: "A",
        text: "Ăn Tết kháng chiến: Dùng chút gạo nếp cuối cùng gói bánh chưng, hái hoa dân chủ.",
        effects: { defense: 5, food: -30, morale: 40 },
        consequence: "Hết sạch gạo nhưng tinh thần bất diệt! Bộ đội quyết tâm chiến đấu.",
      },
      {
        id: "B",
        text: "Cấm ăn Tết: Tiết kiệm tối đa để chiến đấu.",
        effects: { defense: -10, food: 10, morale: -35 },
        consequence: "Sĩ khí chạm đáy! Bộ đội buồn bã, nhớ nhà da diết.",
      },
      {
        id: "C",
        text: "Xin ngừng bắn: Đề nghị Pháp hưu chiến 3 ngày Tết.",
        effects: { defense: -20, food: 5, morale: 5 },
        consequence: "Địch lợi dụng đánh úp! Ta bị thiệt hại nặng vì mất cảnh giác.",
      },
    ],
  },
  {
    id: 30,
    context:
      "Cuộc rút quân thần kỳ: Đêm 17/2/1947. Nhiệm vụ giam chân địch 60 ngày đêm đã hoàn thành. Cần rút Trung đoàn Thủ đô lên chiến khu để kháng chiến lâu dài. Đêm tối, nước sông Hồng lạnh buốt, gầm cầu Long Biên đầy lính Pháp gác.",
    choices: [
      {
        id: "A",
        text: "Rút bí mật: Lội qua bãi giữa sông Hồng, luồn dưới gầm cầu Long Biên.",
        effects: { defense: 40, food: 0, morale: 20 },
        consequence: "Bảo toàn lực lượng! Trung đoàn Thủ đô rút lui an toàn, tiếp tục kháng chiến. CHIẾN THẮNG!",
      },
      {
        id: "B",
        text: "Tử thủ: Ở lại chiến đấu đến người cuối cùng tại Hà Nội.",
        effects: { defense: -100, food: 0, morale: 50 },
        consequence: "Toàn bộ hy sinh! Bi tráng nhưng mất hết lực lượng tinh nhuệ. GAME OVER!",
      },
      {
        id: "C",
        text: "Rút công khai: Hành quân ra bến đò.",
        effects: { defense: -60, food: -10, morale: -20 },
        consequence: "Bị pháo kích tiêu diệt! Địch phát hiện và tập trung hỏa lực.",
      },
    ],
  },
]

// Thông báo cảnh báo khi thanh xuống dưới 20
const warningMessages = {
  defense: "Lực lượng quốc phòng đang suy yếu nghiêm trọng! Kẻ thù có thể tấn công bất cứ lúc nào!",
  food: "Lương thực đang gần kiệt quệ! Nạn đói có thể quay lại bất cứ lúc nào!",
  morale: "Lòng dân đang dao động! Chính quyền có nguy cơ mất uy tín!",
}

// Thông báo thua cuộc
const loseMessages = {
  defense:
    "Quốc phòng sụp đổ! Kẻ thù đã tràn vào, chính quyền cách mạng non trẻ không thể tự vệ. Đất nước rơi vào tay ngoại xâm...",
  food: "Nạn đói khủng khiếp quay lại! Hàng triệu đồng bào chết đói, chính quyền mất uy tín hoàn toàn, cách mạng thất bại...",
  morale: "Lòng dân ly tán! Không còn ai tin tưởng chính quyền mới, các thế lực phản động nổi lên khắp nơi...",
}

type StatKey = "defense" | "food" | "morale"

interface Choice {
  id: string
  text: string
  effects: { defense: number; food: number; morale: number }
  consequence: string
}

export default function GamePage() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "consequence" | "warning" | "win" | "lose">("intro")
  const [currentRound, setCurrentRound] = useState(0)
  const [stats, setStats] = useState({ defense: 50, food: 50, morale: 50 })
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null)
  const [loseReason, setLoseReason] = useState<StatKey | null>(null)
  const [warnings, setWarnings] = useState<StatKey[]>([])
  const [playerName, setPlayerName] = useState("")
  const [showNameInput, setShowNameInput] = useState(false)
  const [scoreSaved, setScoreSaved] = useState(false)
  const [gameStartTime, setGameStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isNameEntered, setIsNameEntered] = useState(false)
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentQuestion = gameRounds[currentRound]

  // Load player name from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("vnr-player-name")
    if (savedName) {
      setPlayerName(savedName)
      setIsNameEntered(true)
    }
  }, [])

  // Timer effect
  useEffect(() => {
    if (gameState === "playing" || gameState === "consequence" || gameState === "warning") {
      if (!gameStartTime) {
        setGameStartTime(Date.now())
      }
      
      timerIntervalRef.current = setInterval(() => {
        if (gameStartTime) {
          setElapsedTime(Math.floor((Date.now() - gameStartTime) / 1000))
        }
      }, 1000)
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
        timerIntervalRef.current = null
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [gameState, gameStartTime])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const calculateScore = () => {
    const roundBonus = currentRound + 1
    const statsTotal = stats.defense + stats.food + stats.morale
    const baseScore = Math.round((statsTotal / 3) * (roundBonus / 30) * 100)
    return Math.min(100, Math.max(0, baseScore))
  }

  const saveToFirebase = async (name: string) => {
    try {
      const gameResult = {
        playerName: name,
        round: currentRound + 1,
        playTime: elapsedTime,
        timestamp: serverTimestamp(),
        score: calculateScore(),
        defense: stats.defense,
        food: stats.food,
        morale: stats.morale,
      }

      // Lưu vào Firebase Realtime Database
      const gameResultsRef = ref(database, "gameResults")
      await push(gameResultsRef, gameResult)
      console.log("✅ Đã lưu kết quả vào Firebase Realtime Database:", gameResult)
    } catch (error) {
      console.error("❌ Lỗi khi lưu vào Firebase:", error)
      // Nếu lỗi Firebase, vẫn hiển thị thông báo cho user
    }
  }

  const saveToLeaderboard = (name: string) => {
    try {
      const score = calculateScore()
      const entry = {
        id: `${Date.now()}-${Math.random()}`,
        playerName: name,
        score,
        round: currentRound + 1,
        timestamp: Date.now(),
        defense: stats.defense,
        food: stats.food,
        morale: stats.morale,
        playTime: elapsedTime,
      }

      // Lưu vào localStorage
      const saved = localStorage.getItem("vnr-game-leaderboard")
      const leaderboard = saved ? JSON.parse(saved) : []
      leaderboard.push(entry)
      localStorage.setItem("vnr-game-leaderboard", JSON.stringify(leaderboard))
      
      // Lưu vào Firebase
      saveToFirebase(name)
      
      setScoreSaved(true)
    } catch (error) {
      console.error("Error saving to leaderboard:", error)
    }
  }

  const handleSaveScore = () => {
    if (playerName.trim()) {
      saveToLeaderboard(playerName.trim())
      setShowNameInput(false)
    }
  }

  const handleNameSubmit = () => {
    if (playerName.trim()) {
      localStorage.setItem("vnr-player-name", playerName.trim())
      setIsNameEntered(true)
    }
  }

  const startGame = () => {
    setGameState("playing")
    setGameStartTime(Date.now())
    setElapsedTime(0)
  }

  const handleChoice = (choice: Choice) => {
    const newStats = {
      defense: Math.min(100, Math.max(0, stats.defense + choice.effects.defense)),
      food: Math.min(100, Math.max(0, stats.food + choice.effects.food)),
      morale: Math.min(100, Math.max(0, stats.morale + choice.effects.morale)),
    }

    setStats(newStats)
    setSelectedChoice(choice)

    // Check for lose condition
    const loseCheck: StatKey[] = ["defense", "food", "morale"]
    for (const stat of loseCheck) {
      if (newStats[stat] <= 0) {
        setLoseReason(stat)
        setGameState("lose")
        // Auto save to leaderboard when lose
        saveToLeaderboard(playerName)
        return
      }
    }

    // Check for warnings
    const newWarnings: StatKey[] = []
    for (const stat of loseCheck) {
      if (newStats[stat] <= 20 && newStats[stat] > 0) {
        newWarnings.push(stat)
      }
    }
    setWarnings(newWarnings)

    if (newWarnings.length > 0) {
      setGameState("warning")
    } else {
      setGameState("consequence")
    }
  }

  const handleContinue = () => {
    if (currentRound >= gameRounds.length - 1) {
      setGameState("win")
      // Auto save to leaderboard when win
      saveToLeaderboard(playerName)
    } else {
      setCurrentRound((prev) => prev + 1)
      setGameState("playing")
      setSelectedChoice(null)
      setWarnings([])
    }
  }

  const handleWarningContinue = () => {
    setGameState("consequence")
  }

  const resetGame = () => {
    setGameState("intro")
    setCurrentRound(0)
    setStats({ defense: 50, food: 50, morale: 50 })
    setSelectedChoice(null)
    setLoseReason(null)
    setWarnings([])
    setShowNameInput(false)
    setScoreSaved(false)
    setGameStartTime(null)
    setElapsedTime(0)
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }
  }

  // Intro Screen
  if (gameState === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-900 via-red-800 to-red-900 flex items-center justify-center p-4">
        {/* Nút quay lại trang chủ */}
        <Link href="/" className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-yellow-300 transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Trang chủ</span>
        </Link>
        
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-yellow-500/30">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-yellow-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-5xl">⭐</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">Vận Mệnh Dân Tộc</h1>
            <p className="text-yellow-200/80 text-lg">Game nhập vai lịch sử Cách mạng Việt Nam - 30 vòng</p>
          </div>

          <div className="bg-black/20 rounded-xl p-6 mb-6 text-left">
            <h2 className="text-yellow-400 font-semibold mb-3">Bối cảnh:</h2>
            <p className="text-white/90 mb-4">
              Tháng 9 năm 1945, Cách mạng Tháng Tám thành công, nước Việt Nam Dân chủ Cộng hòa ra đời. Nhưng đất nước
              đang đối mặt với muôn vàn khó khăn: giặc đói, giặc dốt, giặc ngoại xâm...
            </p>
            <p className="text-white/90 mb-4">
              Bạn sẽ vào vai lãnh đạo Đảng và Nhà nước, đưa ra những quyết định quan trọng để bảo vệ nền độc lập non trẻ
              của dân tộc qua 30 vòng thử thách lịch sử!
            </p>

            <h2 className="text-yellow-400 font-semibold mb-3 mt-6">Cách chơi:</h2>
            <div className="space-y-2 text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>
                  <strong className="text-blue-400">Quốc phòng:</strong> Sức mạnh quân sự bảo vệ Tổ quốc
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Wheat className="w-4 h-4 text-green-400" />
                <span>
                  <strong className="text-green-400">Lương thực:</strong> Nguồn lực nuôi sống nhân dân
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>
                  <strong className="text-purple-400">Lòng dân:</strong> Sự ủng hộ của nhân dân
                </span>
              </div>
            </div>
            <p className="text-yellow-300 mt-4 text-sm">
              Mỗi thanh bắt đầu với 50 điểm. Nếu bất kỳ thanh nào về 0, bạn sẽ thất bại!
            </p>
            <p className="text-orange-300 mt-2 text-sm">
              Cảnh báo: Khi thanh xuống dưới 20 điểm, bạn sẽ nhận được cảnh báo nguy hiểm!
            </p>
          </div>

          {/* Player Name Input */}
          {!isNameEntered ? (
            <div className="mb-6 bg-black/30 rounded-xl p-6">
              <h3 className="text-yellow-400 font-semibold mb-3 text-lg">Nhập Tên Của Bạn</h3>
              <p className="text-white/80 text-sm mb-4">Tên của bạn sẽ được hiển thị trên bảng xếp hạng</p>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder="Nhập tên của bạn..."
                className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-yellow-500/30 focus:border-yellow-500 text-white placeholder-white/50 text-lg mb-4 outline-none transition-all"
                maxLength={30}
                autoFocus
              />
              <button
                onClick={handleNameSubmit}
                disabled={!playerName.trim()}
                className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-red-900 font-bold text-lg rounded-xl transition-all hover:scale-105"
              >
                Xác Nhận
              </button>
            </div>
          ) : (
            <div className="mb-6 bg-black/30 rounded-xl p-4">
              <p className="text-white/80 text-sm">Chào mừng, <span className="text-yellow-400 font-bold">{playerName}</span>!</p>
              <button
                onClick={() => {
                  setIsNameEntered(false)
                  setPlayerName("")
                  localStorage.removeItem("vnr-player-name")
                }}
                className="text-yellow-400 text-sm underline mt-2 hover:text-yellow-300"
              >
                Đổi tên
              </button>
            </div>
          )}

          <div className="flex flex-col gap-3 justify-center">
            <button
              onClick={startGame}
              disabled={!isNameEntered}
              className="w-full px-8 py-4 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-red-900 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg"
            >
              Bắt Đầu Sứ Mệnh
            </button>
            <Link
              href="/game/leaderboard"
              className="w-full px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Bảng Xếp Hạng
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Lose Screen
  if (gameState === "lose" && loseReason) {
    const finalScore = calculateScore()
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-red-900/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-red-500/50">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-red-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <Skull className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-red-400 mb-2">Thất Bại</h1>
          </div>

          <div className="bg-black/30 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-red-300" />
              <p className="text-red-300 text-lg font-mono">Thời gian: {formatTime(elapsedTime)}</p>
            </div>
            <p className="text-white/90 text-lg mb-4">{loseMessages[loseReason]}</p>
            <p className="text-red-300 text-sm">
              Bạn đã hoàn thành {currentRound}/{gameRounds.length} vòng
            </p>
          </div>

          {/* Auto-saved notification */}
          <div className="mb-4 bg-green-900/30 border border-green-500/50 rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-green-300" />
              <p className="text-green-300 font-semibold">Đã tự động lưu kỷ lục!</p>
            </div>
            <p className="text-green-200 text-sm">
              Người chơi: <span className="font-bold">{playerName}</span>
            </p>
            <p className="text-green-200 text-sm">
              Vòng: {currentRound} | Thời gian: {formatTime(elapsedTime)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Chơi Lại
            </button>
            <Link
              href="/game/leaderboard"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Bảng Xếp Hạng
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all"
            >
              Về Trang Chủ
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Win Screen
  if (gameState === "win") {
    const finalScore = calculateScore()
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-600 via-red-700 to-red-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-yellow-500/50">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-yellow-500 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-12 h-12 text-red-900" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">Chiến Thắng Vĩ Đại!</h1>
            <p className="text-yellow-200/80 text-lg">Bạn đã hoàn thành xuất sắc 30 vòng thử thách lịch sử!</p>
          </div>

          <div className="bg-black/20 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-yellow-300" />
              <p className="text-yellow-300 text-lg font-mono">Thời gian: {formatTime(elapsedTime)}</p>
            </div>
            <p className="text-white/90 text-lg mb-4">
              Dưới sự lãnh đạo sáng suốt của bạn, dân tộc Việt Nam đã vượt qua mọi gian khổ, từ những ngày đầu độc lập
              đầy khó khăn đến chiến thắng Điện Biên Phủ lịch sử và cuộc Tổng tiến công Tết Mậu Thân chấn động thế giới!
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-500/20 rounded-lg p-3">
                <Shield className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                <p className="text-blue-400 font-bold">{stats.defense}</p>
                <p className="text-xs text-white/60">Quốc phòng</p>
              </div>
              <div className="bg-green-500/20 rounded-lg p-3">
                <Wheat className="w-6 h-6 text-green-400 mx-auto mb-1" />
                <p className="text-green-400 font-bold">{stats.food}</p>
                <p className="text-xs text-white/60">Lương thực</p>
              </div>
              <div className="bg-purple-500/20 rounded-lg p-3">
                <Users className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                <p className="text-purple-400 font-bold">{stats.morale}</p>
                <p className="text-xs text-white/60">Lòng dân</p>
              </div>
            </div>
          </div>

          {/* Auto-saved notification */}
          <div className="mb-4 bg-green-900/30 border border-green-500/50 rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-green-300" />
              <p className="text-green-300 font-semibold">🎉 Đã tự động lưu kỷ lục chiến thắng!</p>
            </div>
            <p className="text-green-200 text-sm">
              Người chơi: <span className="font-bold">{playerName}</span>
            </p>
            <p className="text-green-200 text-sm">
              Hoàn thành: 30/30 vòng | Thời gian: {formatTime(elapsedTime)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Chơi Lại
            </button>
            <Link
              href="/game/leaderboard"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Bảng Xếp Hạng
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all"
            >
              Về Trang Chủ
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Warning Screen
  if (gameState === "warning") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-900 via-red-800 to-red-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-orange-900/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-orange-500/50">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-orange-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">Cảnh Báo Khẩn Cấp!</h1>
          </div>

          <div className="space-y-4 mb-6">
            {warnings.map((warning) => (
              <div key={warning} className="bg-black/30 rounded-xl p-4 border border-orange-500/30">
                <div className="flex items-center gap-3 mb-2">
                  {warning === "defense" && <Shield className="w-6 h-6 text-blue-400" />}
                  {warning === "food" && <Wheat className="w-6 h-6 text-green-400" />}
                  {warning === "morale" && <Users className="w-6 h-6 text-purple-400" />}
                  <span className="font-bold text-orange-300">
                    {warning === "defense" && "Quốc Phòng"}
                    {warning === "food" && "Lương Thực"}
                    {warning === "morale" && "Lòng Dân"}: <span className="text-red-400">{stats[warning]}/100</span>
                  </span>
                </div>
                <p className="text-white/90">{warningMessages[warning]}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleWarningContinue}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg rounded-xl transition-all hover:scale-105"
          >
            Đã Hiểu, Tiếp Tục
          </button>
        </div>
      </div>
    )
  }

  // Consequence Screen
  if (gameState === "consequence" && selectedChoice) {
    return (
      <>
        <div className="sticky top-0 z-50 bg-red-950/95 backdrop-blur-sm border-b border-yellow-500/30 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-3">
            {/* Round indicator and Timer */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-yellow-400 font-bold text-sm">
                Vòng {currentRound + 1} / {gameRounds.length}
              </span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-bold text-sm font-mono">
                  {formatTime(elapsedTime)}
                </span>
              </div>
              <span className="text-yellow-400/80 text-sm">
                {playerName}
              </span>
            </div>

            {/* Energy bars in horizontal row */}
            <div className="grid grid-cols-3 gap-4">
              {/* Defense bar */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span className="text-white text-xs font-medium">Quốc phòng</span>
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      stats.defense <= 20 ? "text-red-400 animate-pulse" : "text-blue-400"
                    }`}
                  >
                    {stats.defense}
                  </span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      stats.defense <= 20
                        ? "bg-gradient-to-r from-red-600 to-red-400 animate-pulse"
                        : "bg-gradient-to-r from-blue-600 to-blue-400"
                    }`}
                    style={{ width: `${stats.defense}%` }}
                  />
                </div>
              </div>

              {/* Food bar */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Wheat className="w-4 h-4 text-green-400" />
                    <span className="text-white text-xs font-medium">Lương thực</span>
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      stats.food <= 20 ? "text-red-400 animate-pulse" : "text-green-400"
                    }`}
                  >
                    {stats.food}
                  </span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      stats.food <= 20
                        ? "bg-gradient-to-r from-red-600 to-red-400 animate-pulse"
                        : "bg-gradient-to-r from-green-600 to-green-400"
                    }`}
                    style={{ width: `${stats.food}%` }}
                  />
                </div>
              </div>

              {/* Morale bar */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-white text-xs font-medium">Lòng dân</span>
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      stats.morale <= 20 ? "text-red-400 animate-pulse" : "text-purple-400"
                    }`}
                  >
                    {stats.morale}
                  </span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      stats.morale <= 20
                        ? "bg-gradient-to-r from-red-600 to-red-400 animate-pulse"
                        : "bg-gradient-to-r from-purple-600 to-purple-400"
                    }`}
                    style={{ width: `${stats.morale}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {warnings.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 pt-4 space-y-2">
            {warnings.map((warning, index) => (
              <div
                key={index}
                className="bg-red-900/80 border border-red-500 rounded-lg p-3 flex items-center gap-3 animate-pulse"
              >
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <p className="text-red-200 text-sm">{warning}</p>
              </div>
            ))}
          </div>
        )}

        <div className="min-h-screen bg-gradient-to-b from-red-950 to-red-900 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-yellow-500/30">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Kết Quả Quyết Định</h2>
              <div className="bg-black/20 rounded-xl p-4 mb-4">
                <p className="text-white/90 text-lg">{selectedChoice.consequence}</p>
              </div>

              {/* Effect display */}
              <div className="flex justify-center gap-4 flex-wrap">
                {selectedChoice.effects.defense !== 0 && (
                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-full ${selectedChoice.effects.defense > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                  >
                    <Shield className="w-4 h-4" />
                    <span className="font-bold">
                      {selectedChoice.effects.defense > 0 ? "+" : ""}
                      {selectedChoice.effects.defense}
                    </span>
                  </div>
                )}
                {selectedChoice.effects.food !== 0 && (
                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-full ${selectedChoice.effects.food > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                  >
                    <Wheat className="w-4 h-4" />
                    <span className="font-bold">
                      {selectedChoice.effects.food > 0 ? "+" : ""}
                      {selectedChoice.effects.food}
                    </span>
                  </div>
                )}
                {selectedChoice.effects.morale !== 0 && (
                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-full ${selectedChoice.effects.morale > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                  >
                    <Users className="w-4 h-4" />
                    <span className="font-bold">
                      {selectedChoice.effects.morale > 0 ? "+" : ""}
                      {selectedChoice.effects.morale}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold text-lg rounded-xl transition-all hover:scale-105"
            >
              {currentRound >= gameRounds.length - 1 ? "Xem Kết Quả" : "Vòng Tiếp Theo"}
            </button>
          </div>
        </div>
      </>
    )
  }

  // Playing Screen
  return (
    <main className="min-h-screen bg-gradient-to-b from-red-950 to-red-900">
      <div className="sticky top-0 z-50 bg-red-950/95 backdrop-blur-sm border-b border-yellow-500/30 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3">
          {/* Back button and Round indicator */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-1 text-white hover:text-yellow-300 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">Trang chủ</span>
              </Link>
              <span className="text-yellow-400 font-bold text-sm">
                Vòng {currentRound + 1} / {gameRounds.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-sm font-mono">
                {formatTime(elapsedTime)}
              </span>
            </div>
            <span className="text-yellow-400/80 text-sm">
              {playerName}
            </span>
          </div>

          {/* Energy bars in horizontal row */}
          <div className="grid grid-cols-3 gap-4">
            {/* Defense bar */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-white text-xs font-medium">Quốc phòng</span>
                </div>
                <span
                  className={`text-xs font-bold ${
                    stats.defense <= 20 ? "text-red-400 animate-pulse" : "text-blue-400"
                  }`}
                >
                  {stats.defense}
                </span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    stats.defense <= 20
                      ? "bg-gradient-to-r from-red-600 to-red-400 animate-pulse"
                      : "bg-gradient-to-r from-blue-600 to-blue-400"
                  }`}
                  style={{ width: `${stats.defense}%` }}
                />
              </div>
            </div>

            {/* Food bar */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <Wheat className="w-4 h-4 text-green-400" />
                  <span className="text-white text-xs font-medium">Lương thực</span>
                </div>
                <span
                  className={`text-xs font-bold ${stats.food <= 20 ? "text-red-400 animate-pulse" : "text-green-400"}`}
                >
                  {stats.food}
                </span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    stats.food <= 20
                      ? "bg-gradient-to-r from-red-600 to-red-400 animate-pulse"
                      : "bg-gradient-to-r from-green-600 to-green-400"
                  }`}
                  style={{ width: `${stats.food}%` }}
                />
              </div>
            </div>

            {/* Morale bar */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span className="text-white text-xs font-medium">Lòng dân</span>
                </div>
                <span
                  className={`text-xs font-bold ${
                    stats.morale <= 20 ? "text-red-400 animate-pulse" : "text-purple-400"
                  }`}
                >
                  {stats.morale}
                </span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    stats.morale <= 20
                      ? "bg-gradient-to-r from-red-600 to-red-400 animate-pulse"
                      : "bg-gradient-to-r from-purple-600 to-purple-400"
                  }`}
                  style={{ width: `${stats.morale}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {warnings.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 pt-4 space-y-2">
          {warnings.map((warning, index) => (
            <div
              key={index}
              className="bg-red-900/80 border border-red-500 rounded-lg p-3 flex items-center gap-3 animate-pulse"
            >
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-red-200 text-sm">{warning}</p>
            </div>
          ))}
        </div>
      )}

      {/* Game content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Question */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-yellow-500/30">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-yellow-500 text-red-900 px-3 py-1 rounded-full text-sm font-bold">
              Vòng {currentRound + 1}
            </span>
            <span className="text-yellow-400/60 text-sm">/ {gameRounds.length}</span>
          </div>
          <p className="text-white/90 text-lg leading-relaxed">{currentQuestion.context}</p>
        </div>

        {/* Choices */}
        <div className="space-y-4">
          {currentQuestion.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice)}
              className="w-full text-left bg-white/5 hover:bg-white/15 border border-yellow-500/20 hover:border-yellow-500/50 rounded-xl p-5 transition-all group"
            >
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-10 h-10 bg-yellow-500/20 group-hover:bg-yellow-500 text-yellow-400 group-hover:text-red-900 rounded-full flex items-center justify-center font-bold text-lg transition-colors">
                  {choice.id}
                </span>
                <div className="flex-1">
                  <p className="text-white/90 group-hover:text-white text-base leading-relaxed">{choice.text}</p>
                  {/* Preview effects */}
                  <div className="flex gap-3 mt-3 flex-wrap">
                    {choice.effects.defense !== 0 && (
                      <span
                        className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${choice.effects.defense > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                      >
                        <Shield className="w-3 h-3" />
                        {choice.effects.defense > 0 ? "+" : ""}
                        {choice.effects.defense}
                      </span>
                    )}
                    {choice.effects.food !== 0 && (
                      <span
                        className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${choice.effects.food > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                      >
                        <Wheat className="w-3 h-3" />
                        {choice.effects.food > 0 ? "+" : ""}
                        {choice.effects.food}
                      </span>
                    )}
                    {choice.effects.morale !== 0 && (
                      <span
                        className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${choice.effects.morale > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                      >
                        <Users className="w-3 h-3" />
                        {choice.effects.morale > 0 ? "+" : ""}
                        {choice.effects.morale}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
