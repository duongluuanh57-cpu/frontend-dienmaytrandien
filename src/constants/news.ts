export interface NewsArticle {
  id: number;
  slug: string;
  src: string;
  titleVi: string;
  titleEn: string;
  category: "promotion" | "tech" | "event";
  categoryNameVi: string;
  categoryNameEn: string;
  descVi: string;
  descEn: string;
  contentVi: string;
  contentEn: string;
  date: string;
  readTimeVi: string;
  readTimeEn: string;
  authorVi: string;
  authorEn: string;
}

export const NEWS_DATABASE: NewsArticle[] = [
  {
    id: 1,
    slug: "chuong-trinh-khuyen-mai-he-2026-dien-may-tran-dien",
    src: "https://i.ibb.co/S2FLJYN/gallery-1.png",
    titleVi: "Bùng nổ ưu đãi hè 2026: Miễn phí 100% nhân công lắp đặt máy lạnh",
    titleEn: "Summer 2026 Mega Sale: 100% Free Installation labor for AC units",
    category: "promotion",
    categoryNameVi: "Khuyến mãi",
    categoryNameEn: "Promotions",
    descVi: "Chào đón mùa hè rực rỡ, Điện Máy Trần Điền triển khai chương trình khuyến mãi cực khủng cho tất cả khách hàng mua máy lạnh dân dụng và thương mại từ tháng 5 này.",
    descEn: "Welcome the vibrant summer, Tran Dien Appliances launches a massive promotion campaign for all residential and commercial air conditioner purchases starting this May.",
    contentVi: "Đồng hành cùng quý khách hàng vượt qua nắng nóng mùa hè, Điện Máy Trần Điền mang đến chương trình ưu đãi lớn nhất trong năm: tặng ngay 100% chi phí nhân công lắp đặt cho toàn bộ các dòng máy lạnh treo tường, máy lạnh âm trần cassette và áp trần từ các thương hiệu Panasonic, Daikin, Nagakawa. Chương trình áp dụng toàn quốc từ ngày 01/05/2026 đến hết ngày 31/07/2026.",
    contentEn: "To support our customers through the hot summer days, Tran Dien Appliances brings the biggest promotion of the year: 100% free installation labor for all wall-mounted, ceiling cassette, and floor ceiling air conditioning units from Panasonic, Daikin, and Nagakawa. The program applies nationwide from May 1st, 2026, to July 31st, 2026.",
    date: "2026-05-01",
    readTimeVi: "3 phút đọc",
    readTimeEn: "3 min read",
    authorVi: "Ban Khuyến Mãi",
    authorEn: "Promo Committee"
  },
  {
    id: 2,
    slug: "huong-dan-ve-sinh-may-lanh-dung-cach-tai-nha",
    src: "https://i.ibb.co/qQhMybh/gallery-2.png",
    titleVi: "Hướng dẫn tự vệ sinh lưới lọc máy lạnh tại nhà cực kỳ đơn giản",
    titleEn: "Step-by-step guide to cleaning your AC filter easily at home",
    category: "tech",
    categoryNameVi: "Hướng dẫn kỹ thuật",
    categoryNameEn: "Tech Guides",
    descVi: "Vệ sinh lưới lọc máy lạnh định kỳ giúp máy lạnh hoạt động êm ái, làm lạnh nhanh sâu hơn và tiết kiệm đến 15% điện năng tiêu thụ hàng tháng của gia đình bạn.",
    descEn: "Cleaning your air conditioner filter regularly helps it run smoothly, cool down faster, and save up to 15% on monthly electricity consumption.",
    contentVi: "Lưới lọc máy lạnh bám đầy bụi bẩn là nguyên nhân chính khiến máy lạnh làm lạnh yếu, có mùi hôi và tiêu tốn nhiều điện năng. Chuyên gia kỹ thuật của Điện Máy Trần Điền khuyên bạn nên tự vệ sinh lưới lọc 2-3 tuần một lần bằng các bước đơn giản: tắt nguồn điện, nhẹ nhàng tháo vỏ ốp nhựa, rút lưới lọc ra ngoài xịt sạch bụi bẩn bằng vòi sen, để khô ráo và lắp đặt lại vị trí ban đầu.",
    contentEn: "A dusty filter is the main reason why air conditioners cool poorly, emit bad odors, and consume excess power. Tran Dien's technical specialists recommend cleaning the filter every 2-3 weeks with simple steps: power off, gently open the plastic cover, pull out the filter, rinse it under running water, let it dry completely, and reinstall it.",
    date: "2026-04-28",
    readTimeVi: "5 phút đọc",
    readTimeEn: "5 min read",
    authorVi: "Kỹ sư Trần Điền",
    authorEn: "Engineer Tran Dien"
  },
  {
    id: 3,
    slug: "tran-dien-dat-moc-1000-du-an-thi-cong-lanh-trung-tam",
    src: "https://i.ibb.co/v4g099R/brand-marquee-3.png",
    titleVi: "Điện Máy Trần Điền chính thức vượt mốc 1000 công trình điện lạnh trung tâm",
    titleEn: "Tran Dien Appliances officially surpasses 1000 commercial HVAC projects",
    category: "event",
    categoryNameVi: "Sự kiện",
    categoryNameEn: "Events",
    descVi: "Một cột mốc tự hào khẳng định uy tín và năng lực thi công hàng đầu của Điện Máy Trần Điền trong lĩnh vực điện lạnh công nghiệp toàn miền Nam.",
    descEn: "A proud milestone confirming the prestige and leading execution capability of Tran Dien Appliances in Southern commercial HVAC projects.",
    contentVi: "Tháng 4 năm 2026, Điện Máy Trần Điền tự hào công bố đã hoàn thành xuất sắc công trình thứ 1000 - lắp đặt hệ thống Chiller giải nhiệt nước cho tòa nhà văn phòng Pearl Plaza. Cột mốc 1000 dự án là minh chứng cho sự tin tưởng tuyệt đối từ các đối tác chủ đầu tư, tổng thầu xây dựng và nỗ lực cống hiến không ngừng nghỉ của đội ngũ kỹ sư Trần Điền.",
    contentEn: "In April 2026, Tran Dien Appliances proudly announced the successful completion of our 1000th project - installing a water-cooled Chiller system for the Pearl Plaza office tower. This milestone is testament to the absolute trust of developers, general contractors, and the continuous dedication of the Tran Dien engineering team.",
    date: "2026-04-15",
    readTimeVi: "4 phút đọc",
    readTimeEn: "4 min read",
    authorVi: "Ban Truyền Thông",
    authorEn: "PR Department"
  },
  {
    id: 4,
    slug: "meo-su-dung-may-lanh-inverter-tiet-kiem-dien",
    src: "https://i.ibb.co/S2FLJYN/gallery-1.png",
    titleVi: "Sử dụng máy lạnh Inverter thế nào để tiết kiệm điện tối đa?",
    titleEn: "How to use your Inverter air conditioner to save maximum energy?",
    category: "tech",
    categoryNameVi: "Hướng dẫn kỹ thuật",
    categoryNameEn: "Tech Guides",
    descVi: "Nhiều người nghĩ mua máy lạnh Inverter là tự động tiết kiệm điện, nhưng nếu cài đặt nhiệt độ quá thấp hoặc tắt bật liên tục sẽ phản tác dụng hoàn toàn.",
    descEn: "Many think buying an Inverter AC automatically saves power, but setting the temperature too low or constantly turning it on and off will backfire.",
    contentVi: "Máy lạnh Inverter chỉ tiết kiệm điện thực sự khi hoạt động liên tục trong thời gian dài từ 3-4 tiếng trở lên. Tránh thói quen bật nhiệt độ xuống 16 độ C để làm lạnh nhanh vì máy nén sẽ phải chạy hết công suất và tiêu tốn cực nhiều điện. Nhiệt độ tối ưu khuyên dùng là từ 25 - 28 độ C kết hợp thêm một chiếc quạt gió nhỏ để lưu thông không khí mát mẻ đều khắp phòng.",
    contentEn: "Inverter air conditioners only save power when running continuously for long periods (3-4 hours or more). Avoid setting the temperature to 16°C for rapid cooling, as the compressor will run at maximum power. The recommended optimal temperature is 25 - 28°C combined with a small fan to circulate cool air evenly around the room.",
    date: "2026-04-10",
    readTimeVi: "4 phút đọc",
    readTimeEn: "4 min read",
    authorVi: "Kỹ sư Trần Điền",
    authorEn: "Engineer Tran Dien"
  }
];
