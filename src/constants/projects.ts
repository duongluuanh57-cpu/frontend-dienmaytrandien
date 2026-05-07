export interface Project {
  id: number;
  slug: string;
  src: string;
  title: string;
  titleEn: string;
  category: "commercial" | "residential" | "maintenance";
  categoryName: string;
  categoryNameEn: string;
  description: string;
  descriptionEn: string;
  client: string;
  clientEn: string;
  location: string;
  locationEn: string;
  date: string;
  specs: string[];
  specsEn: string[];
}

export const PROJECTS_DATABASE: Project[] = [
  {
    id: 1,
    slug: "thi-cong-he-thong-lanh-cong-nghiep-nha-xuong",
    src: "https://i.ibb.co/qQhMybh/gallery-2.png",
    title: "Thi công hệ thống lạnh công nghiệp nhà xưởng",
    titleEn: "Industrial cooling system installation for factories",
    category: "commercial",
    categoryName: "Lạnh công nghiệp",
    categoryNameEn: "Commercial HVAC",
    description: "Thiết kế, cung cấp thiết bị và thi công lắp đặt trọn gói hệ thống điều hòa không khí trung tâm VRV và thông gió công nghiệp cho nhà xưởng sản xuất quy mô lớn tại TP.HCM.",
    descriptionEn: "Design, supply of equipment and turnkey installation of central VRV air conditioning and industrial ventilation systems for large-scale manufacturing factories in HCMC.",
    client: "Công ty Cổ phần Chế biến Thực phẩm Sài Gòn",
    clientEn: "Saigon Food Processing Joint Stock Company",
    location: "Khu công nghiệp Tân Bình, TP.HCM",
    locationEn: "Tan Binh Industrial Park, HCMC",
    date: "12/2025",
    specs: [
      "Hệ thống điều hòa trung tâm VRV Daikin công suất 120 HP",
      "Hệ thống thông gió cấp khí tươi hồi nhiệt thông minh",
      "Tiêu chuẩn thi công phòng sạch ISO Class 8",
      "Độ ồn hoạt động dưới 55 dBA"
    ],
    specsEn: [
      "Daikin VRV central air conditioning system with 120 HP capacity",
      "Smart fresh air supply and heat recovery ventilation system",
      "Cleanroom construction standard ISO Class 8",
      "Operating noise level below 55 dBA"
    ]
  },
  {
    id: 2,
    slug: "lap-dat-dieu-hoa-toa-nha-thuong-mai",
    src: "https://i.ibb.co/S2FLJYN/gallery-1.png",
    title: "Lắp đặt điều hòa tòa nhà thương mại văn phòng",
    titleEn: "Office commercial building air conditioning installation",
    category: "commercial",
    categoryName: "Lạnh công nghiệp",
    categoryNameEn: "Commercial HVAC",
    description: "Thi công lắp đặt hệ thống làm lạnh trung tâm Chiller giải nhiệt nước và AHU cho tòa nhà văn phòng hiện đại với mặt tiền bọc kính cao cấp.",
    descriptionEn: "Installation of Water-Cooled Chiller central cooling system and AHU for a modern office building with high-end glass facade.",
    client: "Tập đoàn Đầu tư Địa ốc Phát Đạt",
    clientEn: "Phat Dat Real Estate Investment Group",
    location: "Quận 3, TP.HCM",
    locationEn: "District 3, HCMC",
    date: "02/2026",
    specs: [
      "Hệ thống Water Chiller giải nhiệt nước Carrier 250 RT",
      "Hệ thống phân phối khí lạnh bằng đường ống tôn mạ kẽm",
      "Tích hợp hệ thống điều khiển thông minh BMS tòa nhà",
      "Tối ưu hóa năng lượng đạt chứng chỉ xanh Lotus"
    ],
    specsEn: [
      "Carrier 250 RT Water-Cooled Chiller system",
      "Cold air distribution system via galvanized steel ducts",
      "Integrated BMS smart building control system",
      "Optimized energy consumption achieving Lotus green certificate"
    ]
  },
  {
    id: 3,
    slug: "thi-cong-he-thong-ong-gio-va-may-lanh-giau-tran",
    src: "https://i.ibb.co/B26QqPCq/gallery-3.png",
    title: "Thi công hệ thống ống gió và máy lạnh giấu trần",
    titleEn: "Installation of air ducts and concealed ducted AC",
    category: "commercial",
    categoryName: "Lạnh công nghiệp",
    categoryNameEn: "Commercial HVAC",
    description: "Hệ thống đường ống tôn xoắn dẫn gió lạnh và miệng gió Linear thẩm mỹ kết hợp dòng máy lạnh giấu trần nối ống gió cao cấp cho văn phòng làm việc sáng tạo.",
    descriptionEn: "Spiral galvanized steel duct system and aesthetic Linear diffusers combined with premium concealed ducted air conditioning for creative office space.",
    client: "Văn phòng Đại diện Techcombank",
    clientEn: "Techcombank Representative Office",
    location: "Quận 1, TP.HCM",
    locationEn: "District 1, HCMC",
    date: "10/2025",
    specs: [
      "Máy lạnh giấu trần nối ống gió Panasonic Inverter",
      "Ống gió xoắn cách nhiệt bông thủy tinh tỷ trọng 32kg/m³",
      "Miệng gió Linear nhôm định hình sơn tĩnh điện",
      "Hệ thống điều khiển trung tâm cục bộ thông minh"
    ],
    specsEn: [
      "Panasonic Inverter concealed ducted air conditioning",
      "Spiral duct insulated with glasswool density 32kg/m³",
      "Linear slot diffusers made of powder-coated extruded aluminum",
      "Smart local central control system"
    ]
  },
  {
    id: 4,
    slug: "du-an-dien-luc-tan-phu-dong",
    src: "https://i.ibb.co/0Rv9ZvtS/gallery-4.png",
    title: "Dự án điều hòa Điện lực Tân Phú Đông",
    titleEn: "Tan Phu Dong Power Company AC project",
    category: "commercial",
    categoryName: "Lạnh công nghiệp",
    categoryNameEn: "Commercial HVAC",
    description: "Thi công lắp đặt trọn gói hệ thống điều hòa Multi-split và cục bộ chuyên dụng cho toàn bộ các phòng kỹ thuật máy chủ và phòng làm việc hành chính của Điện lực Tân Phú Đông.",
    descriptionEn: "Turnkey installation of Multi-split and heavy-duty single-split air conditioning systems for server rooms and administrative offices at Tan Phu Dong Power Company.",
    client: "Tổng Công ty Điện lực Miền Nam (EVN SPC)",
    clientEn: "Southern Power Corporation (EVN SPC)",
    location: "Huyện Tân Phú Đông, Tiền Giang",
    locationEn: "Tan Phu Dong District, Tien Giang",
    date: "11/2025",
    specs: [
      "Hệ thống điều hòa Multi Daikin Super Multi NX",
      "Dòng tủ đứng chuyên dụng phòng Server chạy liên tục 24/7",
      "Hệ thống cảnh báo sự cố nhiệt độ qua SMS",
      "Tiết kiệm điện năng vượt trội đạt tiêu chuẩn 5 sao"
    ],
    specsEn: [
      "Daikin Super Multi NX multi-split AC system",
      "Floor-standing cabinet units for Server rooms operating 24/7",
      "Smart temperature anomaly SMS warning system",
      "Outstanding energy savings achieving 5-star standard"
    ]
  },
  {
    id: 5,
    slug: "lap-dat-dieu-hoa-biet-thu-phu-my-hung",
    src: "https://i.ibb.co/PZgBWPTb/gallery-5.png",
    title: "Lắp đặt điều hòa cho công trình biệt thự Phú Mỹ Hưng",
    titleEn: "Luxury villa air conditioning installation in Phu My Hung",
    category: "residential",
    categoryName: "Lạnh dân dụng",
    categoryNameEn: "Residential HVAC",
    description: "Giải pháp điều hòa không khí sang trọng đẳng cấp châu Âu sử dụng dàn lạnh giấu trần mỏng kết hợp miệng gió thiết kế riêng không làm ảnh hưởng đến thẩm mỹ nội thất tân cổ điển của biệt thự.",
    descriptionEn: "Luxurious European-standard climate control solution using ultra-thin concealed ducted indoor units and bespoke architectural grilles that preserve the villa's neo-classical interior design.",
    client: "Biệt thự Gia đình Anh Trần Điền",
    clientEn: "Bespoke Villa of Mr. Tran Dien",
    location: "Khu biệt thự lâu đài Chateau, Phú Mỹ Hưng, Quận 7",
    locationEn: "Chateau Castle Villa Area, Phu My Hung, District 7",
    date: "01/2026",
    specs: [
      "Hệ thống điều hòa trung tâm mini VRV Daikin Home",
      "Dàn lạnh âm trần nối ống gió mỏng 200mm siêu êm",
      "Màng lọc không khí lọc bụi mịn PM2.5 tích hợp",
      "Hệ thống điều khiển thông minh qua smartphone Apple HomeKit"
    ],
    specsEn: [
      "Daikin Home Mini VRV central AC system",
      "Concealed ducted indoor units, ultra-thin 200mm, whisper-quiet",
      "Integrated PM2.5 fine dust air purification filters",
      "Smart control system integrated with Apple HomeKit"
    ]
  },
  {
    id: 6,
    slug: "thi-cong-ong-dong-va-he-thong-cho-toa-nha",
    src: "https://i.ibb.co/tp9QfF0g/gallery-6.png",
    title: "Thi công đi ống đồng âm tường tòa nhà phố cao cấp",
    titleEn: "In-wall copper piping for premium townhouses",
    category: "residential",
    categoryName: "Lạnh dân dụng",
    categoryNameEn: "Residential HVAC",
    description: "Thi công lắp đặt hạ tầng cơ điện lạnh, đi ống đồng đồng bộ âm tường, luồn ống bảo ôn cao cấp chống đọng sương phục vụ lắp đặt điều hòa giai đoạn hoàn thiện.",
    descriptionEn: "Installation of mechanical and electrical refrigeration infrastructure, pre-laying high-quality in-wall copper tubes and premium rubber insulation to prevent sweating.",
    client: "Công trình nhà phố liền kề Khang Điền",
    clientEn: "Khang Dien Townhouse Complex",
    location: "Thành phố Thủ Đức, TP.HCM",
    locationEn: "Thu Duc City, HCMC",
    date: "03/2026",
    specs: [
      "Ống đồng Toàn Phát chính hãng dày 0.81mm tiêu chuẩn",
      "Bảo ôn cao su lưu hóa Superlon nhập khẩu Malaysia",
      "Hệ thống luồn ống cứng PVC bảo vệ chịu lực va đập",
      "Thử áp nitơ toàn hệ thống đạt 450 PSI chống rò rỉ"
    ],
    specsEn: [
      "Genuine Toan Phat copper pipe 0.81mm standard thickness",
      "Superlon nitrile rubber insulation imported from Malaysia",
      "PVC rigid conduit sleeve protection against physical impact",
      "Entire system nitrogen pressure-tested at 450 PSI to prevent leaks"
    ]
  },
  {
    id: 7,
    slug: "nhap-khau-dong-goi-kiem-tra-may-lanh-chinh-hang",
    src: "https://i.ibb.co/cXrby2qc/gallery-7.png",
    title: "Đóng gói và kiểm tra hàng hóa máy lạnh Daikin nhập khẩu",
    titleEn: "Packaging and QC check of imported Daikin AC units",
    category: "maintenance",
    categoryName: "Bảo trì & Dịch vụ",
    categoryNameEn: "Maintenance & Service",
    description: "Quy trình kiểm tra chất lượng (QC) nghiêm ngặt tại kho tổng Điện Máy Trần Điền trước khi xuất kho đi phân phối và lắp đặt tại công trình của khách hàng.",
    descriptionEn: "Strict Quality Control (QC) procedure at Tran Dien warehouse prior to dispatching for distribution and installation at client sites.",
    client: "Nhập khẩu phân phối Điện Máy Trần Điền",
    clientEn: "Tran Dien Distribution Warehouse",
    location: "Quận 12, TP.HCM",
    locationEn: "District 12, HCMC",
    date: "04/2026",
    specs: [
      "Kiểm tra tem nhãn, CO/CQ chứng nhận nguồn gốc xuất xứ chính hãng",
      "Đóng gói bảo vệ bằng khung gỗ gia cố cho thiết bị tải nặng",
      "Thử nghiệm chức năng khởi động bảng điều khiển điện tử",
      "Lưu kho theo tiêu chuẩn độ ẩm dưới 65%"
    ],
    specsEn: [
      "Check labels and CO/CQ certifications of genuine origin",
      "Reinforced wooden crate packaging for heavy-duty units",
      "Functional testing of electronic control board start-ups",
      "Storage under standard humidity below 65%"
    ]
  },
  {
    id: 8,
    slug: "bao-tri-va-nap-gas-dan-nong-he-thong-lanh-trung-tam",
    src: "https://i.ibb.co/MyK61dgj/gallery-8.png",
    title: "Bảo trì định kỳ và nạp gas dàn nóng VRV công nghiệp",
    titleEn: "Routine maintenance and gas charge for industrial VRV outers",
    category: "maintenance",
    categoryName: "Bảo trì & Dịch vụ",
    categoryNameEn: "Maintenance & Service",
    description: "Đội ngũ kỹ thuật viên tay nghề cao tiến hành bảo trì định kỳ, vệ sinh áp lực cao dàn tản nhiệt và nạp bổ sung gas lạnh R410A cho hệ thống dàn nóng trung tâm VRV Daikin.",
    descriptionEn: "Highly skilled technicians conducting routine maintenance, high-pressure washing of condenser coils and recharging R410A refrigerant gas for Daikin VRV central outdoor units.",
    client: "Khách sạn 4 sao Liberty Central",
    clientEn: "Liberty Central 4-Star Hotel",
    location: "Quận 1, TP.HCM",
    locationEn: "District 1, HCMC",
    date: "03/2026",
    specs: [
      "Đo áp suất hút, áp suất đẩy và dòng định mức máy nén",
      "Vệ sinh dàn coil tản nhiệt bằng hóa chất chuyên dụng bảo vệ lá nhôm",
      "Nạp gas R410A Dupont nhập khẩu Mỹ cân lượng chính xác",
      "Cam kết phục hồi hiệu suất lạnh đạt 98% như mới"
    ],
    specsEn: [
      "Measurement of suction pressure, discharge pressure and compressor current",
      "Cleaning condenser coils with specialized biodegradable chemicals",
      "Recharging USA-imported DuPont R410A refrigerant gas",
      "Guaranteed cooling efficiency restoration to 98%"
    ]
  },
  {
    id: 9,
    slug: "tap-ket-va-kiem-dem-may-lanh-daikin-tai-cong-trinh",
    src: "https://i.ibb.co/vCRq4BzV/gallery-9.png",
    title: "Tập kết bàn giao thiết bị máy lạnh Daikin tại công trình",
    titleEn: "Delivery and handover of Daikin AC units on site",
    category: "maintenance",
    categoryName: "Bảo trì & Dịch vụ",
    categoryNameEn: "Maintenance & Service",
    description: "Công tác logistics tập kết máy lạnh Daikin Inverter chính hãng và bàn giao vật tư lắp đặt cho ban quản lý công trình văn phòng và căn hộ dịch vụ cao cấp.",
    descriptionEn: "Logistics work gathering genuine Daikin Inverter air conditioners and handing over installation materials to the building management of premium offices and serviced apartments.",
    client: "Tòa nhà căn hộ dịch vụ Somerset",
    clientEn: "Somerset Serviced Apartment Building",
    location: "Quận Bình Thạnh, TP.HCM",
    locationEn: "Binh Thanh District, HCMC",
    date: "02/2026",
    specs: [
      "Bàn giao 45 bộ máy lạnh Daikin Inverter chính hãng nguyên đai nguyên kiện",
      "Kiểm đếm phụ kiện đi kèm: remote, phiếu bảo hành chính hãng toàn quốc",
      "Ký biên bản bàn giao bàn kiểm soát chất lượng vật tư",
      "Bảo quản che phủ bạt bọc chuyên dụng chống thời tiết"
    ],
    specsEn: [
      "Handover of 45 genuine Daikin Inverter AC sets, factory-sealed",
      "Checking included accessories: remote controllers, genuine warranties",
      "Signing materials quality control handover protocols",
      "Protected with specialized weather-resistant covers"
    ]
  },
  {
    id: 10,
    slug: "thi-cong-ong-gio-xoan-ton-va-he-thong-thong-gio",
    src: "https://i.ibb.co/d0vsbtxc/gallery-10.png",
    title: "Thi công ống gió xoắn tròn và hệ thống cấp khí tươi",
    titleEn: "Spiral ductwork and fresh air supply system installation",
    category: "commercial",
    categoryName: "Lạnh công nghiệp",
    categoryNameEn: "Commercial HVAC",
    description: "Lắp đặt hệ thống đường ống dẫn gió xoắn tôn mạ kẽm và quạt cấp khí tươi trung tâm phục vụ thông gió cho tầng hầm tòa nhà chung cư.",
    descriptionEn: "Installation of galvanized spiral ducts and central fresh air intake fans for basement ventilation of a residential apartment building.",
    client: "Chung cư Masteri An Phú",
    clientEn: "Masteri An Phu Apartment",
    location: "Thành phố Thủ Đức, TP.HCM",
    locationEn: "Thu Duc City, HCMC",
    date: "08/2025",
    specs: [
      "Ống gió xoắn tôn mạ kẽm Hoa Sen độ dày 0.58mm",
      "Quạt hướng trục thông gió công nghiệp công suất lớn",
      "Hệ thống tiêu âm ống gió giảm ồn hiệu quả",
      "Hệ thống giá đỡ ty ren chắc chắn đạt chuẩn xây dựng"
    ],
    specsEn: [
      "Hoa Sen galvanized spiral duct thickness 0.58mm",
      "High-capacity industrial axial ventilation fans",
      "Duct silencer system for effective noise reduction",
      "Sturdy threaded rod hanger system meeting construction standards"
    ]
  },
  {
    id: 11,
    slug: "lap-dat-dieu-hoa-panasonic-biet-thu-san-vuon",
    src: "https://i.ibb.co/Kp1gV3KG/gallery-11.png",
    title: "Thi công lắp đặt điều hòa Panasonic biệt thự vườn",
    titleEn: "Panasonic air conditioning installation for garden villa",
    category: "residential",
    categoryName: "Lạnh dân dụng",
    categoryNameEn: "Residential HVAC",
    description: "Thi công hệ thống điều hòa Panasonic Multi-Split kết hợp cục bộ Inverter tiết kiệm điện năng cho không gian biệt thự vườn xanh mát.",
    descriptionEn: "Installation of energy-saving Panasonic Multi-Split and Single-Split Inverter air conditioning systems for a lush green garden villa.",
    client: "Biệt thự Sân vườn Thảo Điền",
    clientEn: "Thao Dien Garden Villa",
    location: "Quận 2, TP.HCM",
    locationEn: "District 2, HCMC",
    date: "11/2025",
    specs: [
      "Hệ thống máy lạnh Multi Panasonic Inverter thế hệ mới",
      "Dàn lạnh âm trần cassette 4 hướng thổi luồng gió 360 độ",
      "Công nghệ lọc khí Nanoe-X ức chế virus vi khuẩn hiệu quả",
      "Đường ống gas đi âm thẩm mỹ, bảo ôn cách nhiệt hai lớp"
    ],
    specsEn: [
      "Next-gen Panasonic Inverter Multi air conditioning system",
      "4-way cassette indoor units with 360-degree airflow",
      "Nanoe-X air purification technology inhibiting viruses",
      "Aesthetic concealed copper pipes with dual-layer insulation"
    ]
  },
  {
    id: 12,
    slug: "hoan-thien-he-thong-tran-va-dieu-hoa-am-tran-giat-cap",
    src: "https://i.ibb.co/vvvyHWHK/gallery-12.png",
    title: "Hoàn thiện hệ thống trần thạch cao và điều hòa giấu trần",
    titleEn: "Finishing gypsum ceiling and concealed ducted AC",
    category: "commercial",
    categoryName: "Lạnh công nghiệp",
    categoryNameEn: "Commercial HVAC",
    description: "Sự phối hợp hoàn hảo giữa đội ngũ kỹ thuật cơ điện lạnh và đội thạch cao hoàn thiện trần thạch cao giật cấp thẩm mỹ cùng hệ thống miệng gió điều hòa giấu trần nối ống gió cao cấp.",
    descriptionEn: "Perfect coordination between the HVAC engineering team and plasterers finishing aesthetic multi-level gypsum ceilings and high-end concealed ducted air conditioning slot diffusers.",
    client: "Showroom nội thất cao cấp Phố Xinh",
    clientEn: "Pho Xinh Premium Furniture Showroom",
    location: "Quận 7, TP.HCM",
    locationEn: "District 7, HCMC",
    date: "09/2025",
    specs: [
      "Hệ thống miệng gió thổi Slot thon gọn tinh tế",
      "Hệ thống trần thạch cao chống ẩm Vĩnh Tường cao cấp",
      "Máy lạnh giấu trần nối ống gió Daikin áp suất tĩnh trung bình",
      "Hệ thống đèn LED âm trần kết hợp hài hòa ánh sáng"
    ],
    specsEn: [
      "Slim and elegant Slot supply diffusers",
      "Vinh Tuong premium moisture-resistant gypsum ceiling",
      "Daikin medium static pressure concealed ducted air conditioner",
      "Concealed LED downlights harmoniously integrated with layouts"
    ]
  },
  {
    id: 13,
    slug: "thi-cong-co-dien-va-may-lanh-am-tran-van-phong",
    src: "https://i.ibb.co/VYxBBMjJ/gallery-13.png",
    title: "Thi công lắp đặt máy lạnh âm trần và cơ điện văn phòng",
    titleEn: "Cassette AC and MEP installation for corporate offices",
    category: "commercial",
    categoryName: "Lạnh công nghiệp",
    categoryNameEn: "Commercial HVAC",
    description: "Thi công hệ thống điện, máng cáp và hệ thống điều hòa âm trần Cassette Daikin cho không gian làm việc của văn phòng tập đoàn đa quốc gia.",
    descriptionEn: "Installation of electrical wiring, cable trays, and Daikin Cassette central air conditioning units for the collaborative workspace of a multinational corporation office.",
    client: "Văn phòng Tập đoàn Lazada Việt Nam",
    clientEn: "Lazada Vietnam Corporate Office",
    location: "Quận Bình Thạnh, TP.HCM",
    locationEn: "Binh Thanh District, HCMC",
    date: "01/2026",
    specs: [
      "Máy lạnh âm trần Cassette Daikin Inverter 4.0 HP",
      "Hệ thống máng cáp điện sơn tĩnh điện chắc chắn",
      "Hệ thống bơm nước ngưng tích hợp sẵn đẩy nước cao 850mm",
      "Tích hợp hệ thống cảm biến hồng ngoại nhận diện người dùng"
    ],
    specsEn: [
      "Daikin Inverter 4.0 HP Cassette air conditioning units",
      "Sturdy powder-coated electrical cable tray systems",
      "Built-in condensate water pump lifting up to 850mm",
      "Integrated infrared human sensing for optimized energy savings"
    ]
  }
];
