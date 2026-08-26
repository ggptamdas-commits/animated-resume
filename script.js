/**
 * KHAMIR (خَامِر) - Restaurant POS, Real-Time Order Tracking & Kitchen Display System (KDS)
 * Comprehensive Interactive Single Page Application Logic
 */

// =============================================================================
// 1. LOCALIZATION DICTIONARY (ARABIC DEFAULT & ENGLISH)
// =============================================================================

const I18N = {
  ar: {
    restaurant_name: "مطعم خَامِر",
    system_subtitle: "نظام إدارة وتتبع الطلبات والمطبخ الذكي",
    pos_live: "POS مباشر",
    nav_dashboard: "لوحة التحكم",
    nav_orders: "الطلبات",
    nav_kitchen: "شاشة المطبخ KDS",
    nav_tracking: "تتبع مباشر",
    nav_analytics: "المبيعات",
    btn_new_order: "طلب جديد +",
    role_cashier: "الكاشير: إمدادول",
    kpi_new_orders: "طلبات جديدة",
    kpi_sub_pending: "بانتظار التأكيد",
    kpi_preparing: "قيد التحضير",
    kpi_sub_kitchen: "في المطبخ الآن",
    kpi_ready: "جاهزة للتقديم",
    kpi_sub_ready: "جاهزة للتسليم",
    kpi_delivery: "قيد التوصيل",
    kpi_sub_transit: "مع السائق",
    kpi_revenue: "مبيعات اليوم",
    kpi_sub_completed: "طلب مكتمل",
    flow_title: "مخطط تدفق الطلبات المباشر (Cashier ➔ Kitchen ➔ Delivery)",
    flow_desc: "متابعة فورية لجميع الطلبات من نقطة البيع وصولاً إلى طاولة العميل أو بوابة التوصيل في صبيا.",
    btn_sim_order: "محاكاة طلب جديد",
    btn_create_pos: "إنشاء فاتورة POS",
    live_pipeline_heading: "الطلبات النشطة حسب المرحلة",
    search_placeholder: "ابحث برقم الطلب #ORD-1025، رقم الطاولة، أو اسم العميل...",
    filter_all: "الكل",
    status_new: "جديد",
    status_preparing: "قيد التحضير",
    status_ready: "جاهز",
    status_delivery: "قيد التوصيل",
    status_completed: "مكتمل",
    status_cancelled: "ملغي",
    type_all: "جميع الأنواع (محلي/سفري/توصيل)",
    type_dinein: "طاولة محلي (Dine-in)",
    type_pickup: "استلام سفري (Pickup)",
    type_delivery: "توصيل منزلي (Delivery)",
    kds_screen_title: "شاشة المطبخ وإعداد الطلبات (KDS Screen)",
    kds_screen_desc: "عرض مباشر وتنبيهات زمنية فورية للطهاة ومحضري الطعام.",
    kds_urgent_label: "طلبات عاجلة:",
    kds_prep_label: "تحت الطهي:",
    btn_start_sim: "تشغيل المحاكي التلقائي",
    btn_stop_sim: "إيقاف المحاكي التلقائي",
    kds_col_new: "NEW • جديد",
    kds_col_prep: "PREPARING • قيد التحضير",
    kds_col_ready: "READY • جاهز للتقديم",
    track_title: "تتبع حالة طلبك خطوة بخطوة",
    track_subtitle: "أدخل رقم الطلب أو اختر من الطلبات النشطة لعرض الجدول الزمني المباشر",
    btn_track_now: "تتبع الطلب",
    track_quick_label: "طلبات نشطة سريعة:",
    trk_est_time: "الوقت المقدر للاستلام",
    step1_title: "1. استلام الطلب (Order Received)",
    step1_desc: "تم تسجيل الطلب في النظام وتأكيد رقم الفاتورة.",
    step2_title: "2. قبول الطلب في الكاشير (Accepted)",
    step2_desc: "تمت مراجعة الأصناف وإرسال التذكرة إلى المطبخ.",
    step3_title: "3. قيد التحضير في المطبخ (Preparing)",
    step3_desc: "يقوم الشيف بطهي الأصناف والمشويات الطازجة على الفحم.",
    step4_title: "4. جاهز للتسليم والتقديم (Ready)",
    step4_desc: "الأطباق مجهزة وساخنة بانتظار التقديم على الطاولة أو التسليم للعميل.",
    step5_title: "5. تم التوصيل / التسليم (Delivered / Completed)",
    step5_desc: "بالهناء والعافية! تم استلام الطلب وإغلاق الفاتورة.",
    btn_fast_forward: "تقديم المرحلة التالية (محاكاة)",
    trk_summary_title: "تفاصيل الفاتورة والأصناف",
    btn_print_receipt: "طباعة الإيصال",
    lbl_subtotal: "المجموع الفرعي:",
    lbl_vat: "ضريبة القيمة المضافة (15% VAT):",
    lbl_service: "رسوم الخدمة / التوصيل:",
    lbl_grand_total: "الإجمالي الكلي:",
    lbl_cust_name: "اسم العميل:",
    lbl_cust_phone: "رقم الهاتف:",
    lbl_pay_status: "حالة وطريقة الدفع:",
    lbl_special_notes: "ملاحظات:",
    analytics_title: "تقارير ومبيعات اليوم",
    analytics_subtitle: "إحصائيات فورية للأداء المالي وتوزيع طرق الدفع وسرعة إنجاز الطلبات في مطعم خَامِر.",
    btn_export_data: "تصدير سجل الطلبات JSON",
    stat_total_sales: "إجمالي المبيعات (SAR)",
    stat_vat_included: "شامل ضريبة 15%",
    stat_total_orders: "إجمالي الطلبات",
    stat_completed_pct: "معدل الإنجاز 98%",
    stat_avg_time: "متوسط وقت التحضير",
    lbl_minutes: "دقيقة",
    stat_speed_fast: "سرعة ممتازة للمطبخ",
    stat_dinein_pct: "طلبات الصالة المحلية",
    stat_dinein_sub: "طاولات الصالة الرئيسية",
    payment_methods_title: "طرق الدفع المستخدمة",
    recent_history_title: "سجل آخر الطلبات المكتملة",
    th_order_id: "رقم الطلب",
    th_customer: "العميل",
    th_type: "النوع",
    th_amount: "المبلغ",
    th_payment: "الدفع",
    th_status: "الحالة",
    modal_new_order_title: "إنشاء طلب جديد (POS Cashier)",
    modal_new_order_sub: "اختر الأصناف، حدد الطاولة أو نوع الاستلام، وأرسل للمطبخ فوراً.",
    cat_all: "الكل",
    cat_mains: "أطباق رئيسية",
    cat_grills: "مشاوي وفحم",
    cat_breads: "مخبوزات ومقبلات",
    cat_drinks: "مشروبات وحلويات",
    form_cust_info: "بيانات العميل والطاولة",
    form_lbl_name: "اسم العميل",
    form_lbl_phone: "رقم الجوال",
    form_lbl_type: "نوع الطلب",
    opt_dinein: "طاولة محلي (Dine-in)",
    opt_pickup: "استلام سفري (Pickup)",
    opt_delivery: "توصيل منزلي (Delivery)",
    form_lbl_table: "رقم الطاولة",
    form_lbl_address: "عنوان التوصيل",
    form_lbl_payment: "طريقة الدفع",
    pay_card: "💳 شبكة / مدى (Card)",
    pay_cash: "💵 نقدي (Cash)",
    pay_apple: "📱 أبل باي / أونلاين (Apple Pay)",
    form_lbl_priority: "أولوية المطبخ",
    prio_normal: "عادي (Normal)",
    prio_urgent: "🔥 عاجل جداً (Urgent)",
    form_lbl_notes: "ملاحظات خاصة للشيف",
    form_cart_items: "الأصناف المختارة",
    lbl_vat_short: "ضريبة (15%):",
    lbl_total_due: "المبلغ المطلوب:",
    btn_confirm_send_kitchen: "تأكيد وإرسال للمطبخ ➔",
    rcp_cuisine_sub: "مأكولات شعبية ومشاوي طازجة",
    rcp_date: "التاريخ:",
    rcp_cashier: "الكاشير:",
    rcp_col_item: "الصنف",
    rcp_col_qty: "العدد",
    rcp_col_price: "السعر",
    rcp_thankyou: "شكراً لزيارتكم • نسعد بخدمتكم دائماً",
    btn_close: "إغلاق",
    btn_view_order: "عرض الطلب",
    btn_update_status: "تحديث الحالة",
    btn_start_prep: "بدء التحضير",
    btn_mark_ready: "جاهز للتقديم",
    btn_mark_deliver: "خروج للتوصيل",
    btn_mark_complete: "إتمام الطلب",
    currency_sar: "ر.س",
    items_count: "أصناف"
  },
  en: {
    restaurant_name: "KHAMIR Restaurant",
    system_subtitle: "Smart POS, Order Tracking & Kitchen Display System",
    pos_live: "LIVE POS",
    nav_dashboard: "Dashboard",
    nav_orders: "Orders",
    nav_kitchen: "Kitchen KDS",
    nav_tracking: "Live Tracking",
    nav_analytics: "Sales Reports",
    btn_new_order: "New Order +",
    role_cashier: "Cashier: Emdadul",
    kpi_new_orders: "New Orders",
    kpi_sub_pending: "Awaiting confirmation",
    kpi_preparing: "Preparing",
    kpi_sub_kitchen: "In kitchen now",
    kpi_ready: "Ready for Pickup",
    kpi_sub_ready: "Ready to serve",
    kpi_delivery: "Out for Delivery",
    kpi_sub_transit: "With driver",
    kpi_revenue: "Today's Revenue",
    kpi_sub_completed: "Completed orders",
    flow_title: "Live Order Pipeline (Cashier ➔ Kitchen ➔ Delivery)",
    flow_desc: "Real-time tracking of all orders from POS point to customer table or delivery gate in Sabya.",
    btn_sim_order: "Simulate New Order",
    btn_create_pos: "Create POS Ticket",
    live_pipeline_heading: "Active Orders by Stage",
    search_placeholder: "Search by Order #ORD-1025, Table #, or Customer Name...",
    filter_all: "All",
    status_new: "New",
    status_preparing: "Preparing",
    status_ready: "Ready",
    status_delivery: "Delivery",
    status_completed: "Completed",
    status_cancelled: "Cancelled",
    type_all: "All Types (Dine-in/Pickup/Delivery)",
    type_dinein: "Dine-in (Table)",
    type_pickup: "Pickup (Takeaway)",
    type_delivery: "Home Delivery",
    kds_screen_title: "Kitchen Display System (KDS Screen)",
    kds_screen_desc: "Live order cards and timer alerts for chefs and kitchen staff.",
    kds_urgent_label: "Urgent Orders:",
    kds_prep_label: "Currently Cooking:",
    btn_start_sim: "Start Auto-Simulator",
    btn_stop_sim: "Stop Auto-Simulator",
    kds_col_new: "NEW • New Order",
    kds_col_prep: "PREPARING • In Kitchen",
    kds_col_ready: "READY • Ready to Serve",
    track_title: "Track Your Order Step by Step",
    track_subtitle: "Enter Order # or select active order to view live timeline",
    btn_track_now: "Track Order",
    track_quick_label: "Quick Active Orders:",
    trk_est_time: "Estimated Delivery/Ready Time",
    step1_title: "1. Order Received",
    step1_desc: "Order has been registered in POS and receipt generated.",
    step2_title: "2. Order Accepted",
    step2_desc: "Cashier approved items and sent ticket to kitchen.",
    step3_title: "3. Preparing in Kitchen",
    step3_desc: "Chef is grilling fresh charcoal skewers and preparing dishes.",
    step4_title: "4. Ready for Service",
    step4_desc: "Plated and hot, waiting for table serving or pickup handover.",
    step5_title: "5. Delivered / Completed",
    step5_desc: "Enjoy your meal! Order has been served and bill finalized.",
    btn_fast_forward: "Fast-Forward Stage (Demo)",
    trk_summary_title: "Bill Summary & Items",
    btn_print_receipt: "Print Receipt",
    lbl_subtotal: "Subtotal:",
    lbl_vat: "VAT (15%):",
    lbl_service: "Delivery / Service Fee:",
    lbl_grand_total: "Grand Total:",
    lbl_cust_name: "Customer Name:",
    lbl_cust_phone: "Phone Number:",
    lbl_pay_status: "Payment Method & Status:",
    lbl_special_notes: "Special Notes:",
    analytics_title: "Today's Sales & Analytics",
    analytics_subtitle: "Real-time revenue, payment method breakdowns, and kitchen speed analytics for KHAMIR Restaurant.",
    btn_export_data: "Export Orders JSON",
    stat_total_sales: "Total Revenue (SAR)",
    stat_vat_included: "15% VAT Included",
    stat_total_orders: "Total Orders",
    stat_completed_pct: "98% Fulfillment Rate",
    stat_avg_time: "Avg. Prep Time",
    lbl_minutes: "min",
    stat_speed_fast: "Optimal Kitchen Speed",
    stat_dinein_pct: "Dine-in Orders",
    stat_dinein_sub: "Main Hall Tables",
    payment_methods_title: "Payment Methods Breakdown",
    recent_history_title: "Recent Completed Orders Log",
    th_order_id: "Order ID",
    th_customer: "Customer",
    th_type: "Type",
    th_amount: "Amount",
    th_payment: "Payment",
    th_status: "Status",
    modal_new_order_title: "Create New Order (POS Cashier)",
    modal_new_order_sub: "Select menu items, assign table or delivery, and send to kitchen instantly.",
    cat_all: "All",
    cat_mains: "Main Dishes",
    cat_grills: "Grills & Charcoal",
    cat_breads: "Breads & Appetizers",
    cat_drinks: "Drinks & Desserts",
    form_cust_info: "Customer & Table Information",
    form_lbl_name: "Customer Name",
    form_lbl_phone: "Phone Number",
    form_lbl_type: "Order Type",
    opt_dinein: "Dine-in (Table)",
    opt_pickup: "Pickup (Takeaway)",
    opt_delivery: "Home Delivery",
    form_lbl_table: "Table Number",
    form_lbl_address: "Delivery Address",
    form_lbl_payment: "Payment Method",
    pay_card: "💳 Card / Mada (شبكة)",
    pay_cash: "💵 Cash (نقدي)",
    pay_apple: "📱 Apple Pay / Online",
    form_lbl_priority: "Kitchen Priority",
    prio_normal: "Normal",
    prio_urgent: "🔥 Urgent Priority",
    form_lbl_notes: "Special Chef Notes",
    form_cart_items: "Selected Items",
    lbl_vat_short: "VAT (15%):",
    lbl_total_due: "Total Payable:",
    btn_confirm_send_kitchen: "Confirm & Send to Kitchen ➔",
    rcp_cuisine_sub: "Authentic Arabic Cuisine & Grills",
    rcp_date: "Date:",
    rcp_cashier: "Cashier:",
    rcp_col_item: "Item",
    rcp_col_qty: "Qty",
    rcp_col_price: "Price",
    rcp_thankyou: "Thank you for dining with us! See you soon.",
    btn_close: "Close",
    btn_view_order: "View Order",
    btn_update_status: "Update Status",
    btn_start_prep: "Start Prep",
    btn_mark_ready: "Mark Ready",
    btn_mark_deliver: "Out for Delivery",
    btn_mark_complete: "Complete Order",
    currency_sar: "SAR",
    items_count: "Items"
  }
};

// =============================================================================
// 2. DATA MODELS & INITIAL REALISTIC RESTAURANT DATA
// =============================================================================

const MENU_ITEMS = [
  { id: 'm_burger', nameAr: 'برجر دجاج مشوي', nameEn: 'Chicken Burger', icon: '🍔', cat: 'mains', price: 24.00, descAr: 'صدر دجاج مشوي مع صوص سبيشال وخس وطماطم', descEn: 'Grilled chicken breast with special sauce, lettuce & tomato' },
  { id: 'm_fries', nameAr: 'بطاطس مقلية مقرمشة', nameEn: 'French Fries', icon: '🍟', cat: 'breads', price: 10.00, descAr: 'بطاطس متبلة ببهارات البابريكا والأعشاب', descEn: 'Crispy seasoned fries with paprika & herbs' },
  { id: 'm_pepsi', nameAr: 'بيبسي بارد مع ثلج', nameEn: 'Pepsi', icon: '🥤', cat: 'drinks', price: 5.00, descAr: 'مشروب غازي بارد منعش', descEn: 'Cold refreshing soft drink with ice' },
  { id: 'm_mandi', nameAr: 'مندي دجاج فاخر مع الأرز', nameEn: 'Special Chicken Mandi', icon: '🍗', cat: 'mains', price: 32.00, descAr: 'نصف حبة دجاج محمر على الفحم مع أرز بسمتي مدخن', descEn: 'Smoked fragrant basmati rice with half roasted chicken' },
  { id: 'm_kabsa', nameAr: 'كبسة لحم غنم ملكي', nameEn: 'Royal Mutton Kabsa', icon: '🥩', cat: 'mains', price: 48.00, descAr: 'موزة لحم غنم طازجة مطهية مع البهارات السبعة', descEn: 'Slow-cooked spiced lamb shank served with saffron rice' },
  { id: 'm_khamir', nameAr: 'خبز خَامِر حجري طازج', nameEn: 'Fresh Wood-Fired Khamir', icon: '🫓', cat: 'breads', price: 4.00, descAr: 'خبز خَامِر حجري ساخن بالحبة السوداء والسمسم', descEn: 'Stone-baked warm puffy bread with black seeds' },
  { id: 'm_grill', nameAr: 'مشاوي مشكل على الفحم', nameEn: 'Charcoal Mixed Grill', icon: '🍢', cat: 'grills', price: 55.00, descAr: 'أسياخ كباب غنم، شيش طاووق، وأوصال مع الخبز والمقبلات', descEn: 'Kofta, Shish Tawook & Lamb skewers with dips' },
  { id: 'm_salad', nameAr: 'ثومية وسلطة خضراء طازجة', nameEn: 'Garlic Dip & Salad', icon: '🧄', cat: 'breads', price: 6.00, descAr: 'صلصة ثوم كريمية مع سلطة بلدي بالليمون وزيت الزيتون', descEn: 'Creamy garlic sauce and fresh chopped Arabian salad' },
  { id: 'm_kunafa', nameAr: 'كنافة جبن نابلسية', nameEn: 'Authentic Cheese Kunafa', icon: '🍮', cat: 'drinks', price: 18.00, descAr: 'كنافة مقرمشة بالجبن السايح والفستق الحلبي والشيرة', descEn: 'Crispy warm shredded pastry layered with sweet cheese' },
  { id: 'm_lemon', nameAr: 'عصير ليمون بالنعناع', nameEn: 'Fresh Mint Lemonade', icon: '🍋', cat: 'drinks', price: 8.00, descAr: 'عصير ليمون طازج مع أوراق النعناع المنعشة', descEn: 'Fresh squeezed lemon juice with garden crushed mint' },
  { id: 'm_qahwa', nameAr: 'قهوة عربية بالهيل والزعفران', nameEn: 'Arabic Spiced Qahwa', icon: '☕', cat: 'drinks', price: 6.00, descAr: 'دلة قهوة سعودية أصيلة مع حبات التمر', descEn: 'Traditional Saudi cardamom infused coffee' }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-1025',
    customerName: 'محمد إمدادول (Md. Emdadul)',
    customerPhone: '+966 50 123 4567',
    orderType: 'Dine-in',
    tableOrAddress: 'Table 08',
    tableOrAddressAr: 'طاولة 08',
    placedTime: '08:42 PM',
    placedTimestamp: Date.now() - 6 * 60 * 1000,
    status: 'preparing', // 'new', 'preparing', 'ready', 'delivery', 'completed', 'cancelled'
    priority: 'urgent',
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    notes: 'بدون مايونيز، خبز خَامِر مقرمش إضافي',
    items: [
      { id: 'm_burger', nameAr: 'برجر دجاج مشوي', nameEn: 'Chicken Burger', icon: '🍔', qty: 2, price: 24.00 },
      { id: 'm_fries', nameAr: 'بطاطس مقلية مقرمشة', nameEn: 'French Fries', icon: '🍟', qty: 1, price: 10.00 },
      { id: 'm_pepsi', nameAr: 'بيبسي بارد مع ثلج', nameEn: 'Pepsi', icon: '🥤', qty: 2, price: 5.00 }
    ],
    timeline: {
      received: '08:35 PM',
      accepted: '08:37 PM',
      preparing: '08:42 PM',
      ready: null,
      completed: null
    }
  },
  {
    id: 'ORD-1026',
    customerName: 'عبدالله القحطاني',
    customerPhone: '+966 55 443 2211',
    orderType: 'Dine-in',
    tableOrAddress: 'Table 03',
    tableOrAddressAr: 'طاولة 03',
    placedTime: '08:47 PM',
    placedTimestamp: Date.now() - 2 * 60 * 1000,
    status: 'new',
    priority: 'normal',
    paymentMethod: 'Cash',
    paymentStatus: 'Pending',
    notes: 'أرز حار مع الصوص الحار الخارجي',
    items: [
      { id: 'm_mandi', nameAr: 'مندي دجاج فاخر مع الأرز', nameEn: 'Special Chicken Mandi', icon: '🍗', qty: 2, price: 32.00 },
      { id: 'm_khamir', nameAr: 'خبز خَامِر حجري طازج', nameEn: 'Fresh Wood-Fired Khamir', icon: '🫓', qty: 3, price: 4.00 }
    ],
    timeline: {
      received: '08:47 PM',
      accepted: null,
      preparing: null,
      ready: null,
      completed: null
    }
  },
  {
    id: 'ORD-1023',
    customerName: 'سارة الزهراني',
    customerPhone: '+966 54 887 6655',
    orderType: 'Delivery',
    tableOrAddress: 'Sabya District, Villa 24',
    tableOrAddressAr: 'حي الروضة صبيا، فيلا 24',
    placedTime: '08:28 PM',
    placedTimestamp: Date.now() - 18 * 60 * 1000,
    status: 'preparing',
    priority: 'urgent',
    paymentMethod: 'ApplePay',
    paymentStatus: 'Paid',
    notes: 'الاتصال عند الوصول إلى البوابة',
    items: [
      { id: 'm_grill', nameAr: 'مشاوي مشكل على الفحم', nameEn: 'Charcoal Mixed Grill', icon: '🍢', qty: 1, price: 55.00 },
      { id: 'm_kunafa', nameAr: 'كنافة جبن نابلسية', nameEn: 'Authentic Cheese Kunafa', icon: '🍮', qty: 1, price: 18.00 }
    ],
    timeline: {
      received: '08:28 PM',
      accepted: '08:30 PM',
      preparing: '08:33 PM',
      ready: null,
      completed: null
    }
  },
  {
    id: 'ORD-1024',
    customerName: 'خالد بن ناصر',
    customerPhone: '+966 56 112 3344',
    orderType: 'Dine-in',
    tableOrAddress: 'Table 05',
    tableOrAddressAr: 'طاولة 05',
    placedTime: '08:32 PM',
    placedTimestamp: Date.now() - 14 * 60 * 1000,
    status: 'preparing',
    priority: 'normal',
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    notes: 'زيادة طحينة وثومية',
    items: [
      { id: 'm_kabsa', nameAr: 'كبسة لحم غنم ملكي', nameEn: 'Royal Mutton Kabsa', icon: '🥩', qty: 1, price: 48.00 },
      { id: 'm_lemon', nameAr: 'عصير ليمون بالنعناع', nameEn: 'Fresh Mint Lemonade', icon: '🍋', qty: 2, price: 8.00 }
    ],
    timeline: {
      received: '08:32 PM',
      accepted: '08:34 PM',
      preparing: '08:36 PM',
      ready: null,
      completed: null
    }
  },
  {
    id: 'ORD-1021',
    customerName: 'فهد الشمري',
    customerPhone: '+966 50 998 7766',
    orderType: 'Pickup',
    tableOrAddress: 'Takeaway Counter #1',
    tableOrAddressAr: 'كاونتر الاستلام سفري',
    placedTime: '08:15 PM',
    placedTimestamp: Date.now() - 28 * 60 * 1000,
    status: 'ready',
    priority: 'normal',
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    notes: 'تغليف حراري محكم للسفر',
    items: [
      { id: 'm_grill', nameAr: 'مشاوي مشكل على الفحم', nameEn: 'Charcoal Mixed Grill', icon: '🍢', qty: 1, price: 55.00 },
      { id: 'm_khamir', nameAr: 'خبز خَامِر حجري طازج', nameEn: 'Fresh Wood-Fired Khamir', icon: '🫓', qty: 2, price: 4.00 },
      { id: 'm_pepsi', nameAr: 'بيبسي بارد مع ثلج', nameEn: 'Pepsi', icon: '🥤', qty: 1, price: 5.00 }
    ],
    timeline: {
      received: '08:15 PM',
      accepted: '08:17 PM',
      preparing: '08:20 PM',
      ready: '08:38 PM',
      completed: null
    }
  },
  {
    id: 'ORD-1020',
    customerName: 'طارق السعيد',
    customerPhone: '+966 53 221 4455',
    orderType: 'Dine-in',
    tableOrAddress: 'Table 02',
    tableOrAddressAr: 'طاولة 02',
    placedTime: '07:50 PM',
    placedTimestamp: Date.now() - 55 * 60 * 1000,
    status: 'completed',
    priority: 'normal',
    paymentMethod: 'ApplePay',
    paymentStatus: 'Paid',
    notes: 'تم الدفع وتناول الوجبة',
    items: [
      { id: 'm_mandi', nameAr: 'مندي دجاج فاخر مع الأرز', nameEn: 'Special Chicken Mandi', icon: '🍗', qty: 1, price: 32.00 },
      { id: 'm_qahwa', nameAr: 'قهوة عربية بالهيل والزعفران', nameEn: 'Arabic Spiced Qahwa', icon: '☕', qty: 1, price: 6.00 }
    ],
    timeline: {
      received: '07:50 PM',
      accepted: '07:52 PM',
      preparing: '07:55 PM',
      ready: '08:12 PM',
      completed: '08:40 PM'
    }
  },
  {
    id: 'ORD-1019',
    customerName: 'عمر العمري',
    customerPhone: '+966 54 332 1100',
    orderType: 'Dine-in',
    tableOrAddress: 'Table 09',
    tableOrAddressAr: 'طاولة 09',
    placedTime: '07:30 PM',
    placedTimestamp: Date.now() - 80 * 60 * 1000,
    status: 'cancelled',
    priority: 'normal',
    paymentMethod: 'Cash',
    paymentStatus: 'Refunded',
    notes: 'اعتذر العميل لظرف طارئ',
    items: [
      { id: 'm_burger', nameAr: 'برجر دجاج مشوي', nameEn: 'Chicken Burger', icon: '🍔', qty: 1, price: 24.00 }
    ],
    timeline: {
      received: '07:30 PM',
      accepted: null,
      preparing: null,
      ready: null,
      completed: null
    }
  }
];

// App Global State
const appState = {
  lang: 'ar', // 'ar' | 'en'
  theme: 'dark', // 'dark' | 'light'
  soundEnabled: true,
  currentTab: 'dashboard',
  orders: [],
  selectedOrderId: 'ORD-1025',
  ordersFilter: 'all',
  ordersSearchQuery: '',
  ordersTypeFilter: 'all',
  activeCart: {}, // itemId -> qty
  autoSimulating: false,
  simIntervalId: null
};

// =============================================================================
// 3. AUDIO SYNTHESIZER ENGINE (Web Audio API)
// =============================================================================

function playChime(type = 'success') {
  if (!appState.soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'newOrder') {
      // Pleasant dual bell chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc1.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15); // G5

      osc2.frequency.setValueAtTime(783.99, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.25); // C6

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.4);
      osc2.stop(ctx.currentTime + 0.4);
    } else if (type === 'advance') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (e) {
    console.log('Audio notification error:', e);
  }
}

// =============================================================================
// 4. STORAGE & LOCALIZATION LOGIC
// =============================================================================

function loadStorage() {
  const saved = localStorage.getItem('khamir_pos_orders_v3');
  if (saved) {
    try {
      appState.orders = JSON.parse(saved);
    } catch (e) {
      appState.orders = [...INITIAL_ORDERS];
    }
  } else {
    appState.orders = [...INITIAL_ORDERS];
    saveStorage();
  }
}

function saveStorage() {
  localStorage.setItem('khamir_pos_orders_v3', JSON.stringify(appState.orders));
}

function setLanguage(lang) {
  appState.lang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  const label = document.getElementById('langLabel');
  if (label) label.textContent = lang === 'ar' ? 'EN' : 'عربي';

  // Apply translations to all data-i18n attributes
  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.placeholder = dict[key];
  });

  renderAllViews();
}

function setTheme(theme) {
  appState.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  const sun = document.getElementById('iconSun');
  const moon = document.getElementById('iconMoon');
  if (theme === 'light') {
    sun.classList.remove('hidden');
    moon.classList.add('hidden');
  } else {
    sun.classList.add('hidden');
    moon.classList.remove('hidden');
  }
}

// =============================================================================
// 5. APP INITIALIZATION & EVENT LISTENERS
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  loadStorage();
  setupNavigation();
  setupThemeAndLang();
  setupSoundToggle();
  setupSearchAndFilters();
  setupNewOrderModal();
  setupReceiptModal();
  setupTrackingView();

  // Initial render
  setLanguage('ar');
  renderAllViews();

  // Live timer tick every second
  setInterval(() => {
    updateLiveTimers();
  }, 1000);
});

function setupNavigation() {
  const navBtns = document.querySelectorAll('.desktop-nav .nav-item, .mobile-bottom-nav .m-nav-item');
  
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchTab(tab);
    });
  });
}

function switchTab(tabId) {
  appState.currentTab = tabId;

  document.querySelectorAll('.desktop-nav .nav-item, .mobile-bottom-nav .m-nav-item').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
  });

  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.toggle('active', view.id === `tab-${tabId}`);
  });

  renderAllViews();
}

function setupThemeAndLang() {
  const langBtn = document.getElementById('btnLangToggle');
  const themeBtn = document.getElementById('btnThemeToggle');

  langBtn.addEventListener('click', () => {
    const nextLang = appState.lang === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
    showToast(nextLang === 'ar' ? 'تم تحويل اللغة إلى العربية' : 'Language switched to English', 'info');
  });

  themeBtn.addEventListener('click', () => {
    const nextTheme = appState.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    showToast(nextTheme === 'dark' ? 'المظهر الليلي الداكن' : 'المظهر الفاتح', 'info');
  });
}

function setupSoundToggle() {
  const btn = document.getElementById('btnSoundToggle');
  const onIcon = document.getElementById('iconSoundOn');
  const offIcon = document.getElementById('iconSoundOff');

  btn.addEventListener('click', () => {
    appState.soundEnabled = !appState.soundEnabled;
    onIcon.classList.toggle('hidden', !appState.soundEnabled);
    offIcon.classList.toggle('hidden', appState.soundEnabled);
    showToast(appState.soundEnabled ? 'تم تفعيل الصوت' : 'تم كتم الصوت', 'info');
  });
}

function setupSearchAndFilters() {
  const searchInp = document.getElementById('orderSearchQuery');
  const filterChips = document.querySelectorAll('#ordersFilterGroup .filter-chip');
  const typeSelect = document.getElementById('filterOrderType');

  searchInp.addEventListener('input', (e) => {
    appState.ordersSearchQuery = e.target.value.toLowerCase().trim();
    renderOrdersTab();
  });

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      appState.ordersFilter = chip.getAttribute('data-status');
      renderOrdersTab();
    });
  });

  typeSelect.addEventListener('change', (e) => {
    appState.ordersTypeFilter = e.target.value;
    renderOrdersTab();
  });
}

// =============================================================================
// 6. MASTER RENDER ENGINE
// =============================================================================

function renderAllViews() {
  updateBadgesAndKpis();
  renderDashboardPipeline();
  renderOrdersTab();
  renderKdsScreen();
  renderTrackingDetail();
  renderAnalyticsTab();
}

function updateBadgesAndKpis() {
  const orders = appState.orders;
  const newCount = orders.filter(o => o.status === 'new').length;
  const prepCount = orders.filter(o => o.status === 'preparing').length;
  const readyCount = orders.filter(o => o.status === 'ready').length;
  const delivCount = orders.filter(o => o.status === 'delivery').length;
  const compCount = orders.filter(o => o.status === 'completed').length;
  const cancCount = orders.filter(o => o.status === 'cancelled').length;
  const activeCount = orders.filter(o => !['completed', 'cancelled'].includes(o.status)).length;

  // Header badges
  const bActive = document.getElementById('badgeActiveOrders');
  const bKitchen = document.getElementById('badgeKitchenOrders');
  if (bActive) bActive.textContent = activeCount;
  if (bKitchen) bKitchen.textContent = prepCount + newCount;

  // Dashboard KPIs
  document.getElementById('kpiNewCount').textContent = newCount;
  document.getElementById('kpiPreparingCount').textContent = prepCount;
  document.getElementById('kpiReadyCount').textContent = readyCount;
  document.getElementById('kpiDeliveryCount').textContent = delivCount;
  document.getElementById('kpiCompletedCount').textContent = compCount;
  document.getElementById('activeOrdersTotalBadge').textContent = `${activeCount} ${appState.lang === 'ar' ? 'نشط' : 'Active'}`;

  // Revenue calculation (excluding cancelled)
  let revenue = 0;
  orders.filter(o => o.status !== 'cancelled').forEach(o => {
    const sub = o.items.reduce((s, i) => s + (i.price * i.qty), 0);
    revenue += sub * 1.15; // with 15% VAT
  });
  const curr = appState.lang === 'ar' ? 'ر.س' : 'SAR';
  document.getElementById('kpiRevenueToday').textContent = `${revenue.toFixed(2)} ${curr}`;

  // Orders tab filter chips counters
  document.getElementById('chipCountAll').textContent = orders.length;
  document.getElementById('chipCountNew').textContent = newCount;
  document.getElementById('chipCountPrep').textContent = prepCount;
  document.getElementById('chipCountReady').textContent = readyCount;
  document.getElementById('chipCountDeliv').textContent = delivCount;
  document.getElementById('chipCountComp').textContent = compCount;
  document.getElementById('chipCountCanc').textContent = cancCount;
}

// =============================================================================
// 7. ORDER CARD GENERATOR (Matches exact user specification)
// =============================================================================

function createOrderCardHtml(order) {
  const isAr = appState.lang === 'ar';
  const dict = I18N[appState.lang];
  const curr = dict.currency_sar;

  // Total items count & Total price calculation
  const totalItemsCount = order.items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const grandTotal = subtotal * 1.15;

  const tableLabel = isAr ? (order.tableOrAddressAr || order.tableOrAddress) : order.tableOrAddress;

  // Items lines: 🍔 Chicken Burger × 2, 🍟 French Fries × 1, 🥤 Pepsi × 2
  const itemsHtml = order.items.map(item => {
    const itemName = isAr ? item.nameAr : item.nameEn;
    const itemTotal = (item.price * item.qty).toFixed(2);
    return `
      <div class="item-line">
        <div class="item-name-qty">
          <span>${item.icon || '🍽️'}</span>
          <span>${itemName}</span>
          <span class="item-qty-mult">× ${item.qty}</span>
        </div>
        <span class="item-total-price">${itemTotal} ${curr}</span>
      </div>
    `;
  }).join('');

  // Status mapping
  const statusLabels = {
    new: { ar: 'جديد 🍽️', en: 'New 🍽️', class: 'new' },
    preparing: { ar: 'قيد التحضير 🔥', en: 'Preparing 🔥', class: 'preparing' },
    ready: { ar: 'جاهز 👨‍🍳', en: 'Ready 👨‍🍳', class: 'ready' },
    delivery: { ar: 'توصيل 🚚', en: 'Out for Delivery 🚚', class: 'delivery' },
    completed: { ar: 'مكتمل ✅', en: 'Completed ✅', class: 'completed' },
    cancelled: { ar: 'ملغي ❌', en: 'Cancelled ❌', class: 'cancelled' }
  };
  const stInfo = statusLabels[order.status] || statusLabels.new;

  // Elapsed timer formatting
  const elapsedSec = Math.floor((Date.now() - order.placedTimestamp) / 1000);
  const elapsedMin = Math.floor(elapsedSec / 60);
  const elapsedRemainder = elapsedSec % 60;
  const timerText = `${String(elapsedMin).padStart(2, '0')}:${String(elapsedRemainder).padStart(2, '0')}`;

  let elapsedClass = 'elapsed-normal';
  if (elapsedMin >= 10 && elapsedMin < 20) elapsedClass = 'elapsed-warning';
  if (elapsedMin >= 20) elapsedClass = 'elapsed-danger';

  // Next status action button label
  let nextActionBtn = '';
  if (order.status === 'new') {
    nextActionBtn = `<button class="btn btn-primary" onclick="advanceOrderStatus('${order.id}', 'preparing')">${dict.btn_start_prep} ➔</button>`;
  } else if (order.status === 'preparing') {
    nextActionBtn = `<button class="btn btn-primary" onclick="advanceOrderStatus('${order.id}', 'ready')">${dict.btn_mark_ready} ➔</button>`;
  } else if (order.status === 'ready') {
    if (order.orderType === 'Delivery') {
      nextActionBtn = `<button class="btn btn-primary" onclick="advanceOrderStatus('${order.id}', 'delivery')">${dict.btn_mark_deliver} ➔</button>`;
    } else {
      nextActionBtn = `<button class="btn btn-primary" onclick="advanceOrderStatus('${order.id}', 'completed')">${dict.btn_mark_complete} ➔</button>`;
    }
  } else if (order.status === 'delivery') {
    nextActionBtn = `<button class="btn btn-primary" onclick="advanceOrderStatus('${order.id}', 'completed')">${dict.btn_mark_complete} ➔</button>`;
  }

  const isUrgent = order.priority === 'urgent';

  return `
    <div class="order-card ${isUrgent ? 'urgent-card' : ''}" data-order-id="${order.id}">
      <!-- Header: #ORD-1025, Table 08, 3 Items · SAR 86.00 -->
      <div class="order-card-header">
        <div class="order-card-id-row">
          <span class="order-code">#${order.id}</span>
          <span class="order-table-tag">${tableLabel}</span>
          ${isUrgent ? '<span class="status-badge" style="background:var(--accent-rose-light); color:var(--accent-rose);">🔥 ' + (isAr ? 'عاجل' : 'Urgent') + '</span>' : ''}
        </div>
        <div class="order-summary-meta">
          <span>${totalItemsCount} ${dict.items_count}</span> · <span class="price-sar">${grandTotal.toFixed(2)} ${curr}</span>
        </div>
      </div>

      <!-- Items list: 🍔 Chicken Burger × 2, 🍟 French Fries × 1, 🥤 Pepsi × 2 -->
      <div class="order-card-items-list">
        ${itemsHtml}
      </div>

      <!-- Status & Timestamp: Preparing · 08:42 PM -->
      <div class="order-card-status-bar">
        <span class="status-badge ${stInfo.class}">
          ${isAr ? stInfo.ar : stInfo.en}
        </span>
        <div class="order-card-timer">
          <span>⏱ ${order.placedTime}</span>
          <span class="elapsed-time ${elapsedClass}">(${timerText})</span>
        </div>
      </div>

      <!-- Actions: [View Order] [Update Status] -->
      <div class="order-card-actions">
        <button class="btn btn-secondary" onclick="viewOrderInTracker('${order.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span>${dict.btn_view_order}</span>
        </button>
        ${nextActionBtn ? nextActionBtn : `
          <button class="btn btn-ghost" onclick="openReceiptModalForOrder('${order.id}')">
            <span>${dict.btn_print_receipt}</span>
          </button>
        `}
      </div>
    </div>
  `;
}

// =============================================================================
// 8. SECTION-SPECIFIC RENDERING LOGIC
// =============================================================================

function renderDashboardPipeline() {
  const container = document.getElementById('dashboardPipelineCols');
  if (!container) return;

  const isAr = appState.lang === 'ar';
  const columns = [
    { key: 'new', titleAr: '1. جديد', titleEn: '1. New Orders', dot: 'dot-new' },
    { key: 'preparing', titleAr: '2. قيد التحضير', titleEn: '2. Preparing', dot: 'dot-prep' },
    { key: 'ready', titleAr: '3. جاهز للتقديم', titleEn: '3. Ready to Serve', dot: 'dot-ready' },
    { key: 'delivery', titleAr: '4. قيد التوصيل', titleEn: '4. Out for Delivery', dot: 'dot-deliv' }
  ];

  container.innerHTML = columns.map(col => {
    const colOrders = appState.orders.filter(o => o.status === col.key);
    const cardsHtml = colOrders.map(o => createOrderCardHtml(o)).join('') || 
      `<div style="text-align:center; padding:24px; color:var(--text-muted); font-size:0.8125rem;">${isAr ? 'لا توجد طلبات حالياً' : 'No active orders'}</div>`;

    return `
      <div class="pipeline-col">
        <div class="pipeline-col-header">
          <div class="pipeline-col-title">
            <span class="pipeline-dot ${col.dot}"></span>
            <span>${isAr ? col.titleAr : col.titleEn}</span>
          </div>
          <span class="pipeline-count">${colOrders.length}</span>
        </div>
        <div class="pipeline-cards-list">
          ${cardsHtml}
        </div>
      </div>
    `;
  }).join('');
}

function renderOrdersTab() {
  const container = document.getElementById('ordersContainerGrid');
  if (!container) return;

  const filter = appState.ordersFilter;
  const q = appState.ordersSearchQuery;
  const typeF = appState.ordersTypeFilter;

  const filtered = appState.orders.filter(o => {
    const matchStatus = filter === 'all' || o.status === filter;
    const matchType = typeF === 'all' || o.orderType === typeF;
    const matchSearch = !q || 
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.tableOrAddress.toLowerCase().includes(q) ||
      (o.tableOrAddressAr && o.tableOrAddressAr.toLowerCase().includes(q));
    return matchStatus && matchType && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:48px 20px; background:var(--bg-surface); border-radius:var(--radius-lg); border:1px dashed var(--border-default);">
        <p style="color:var(--text-muted); font-size:1rem;">${appState.lang === 'ar' ? 'لم يتم العثور على أي طلبات مطابقة' : 'No matching orders found'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(o => createOrderCardHtml(o)).join('');
}

function renderKdsScreen() {
  const isAr = appState.lang === 'ar';
  const dict = I18N[appState.lang];

  const colNew = document.getElementById('kdsColNewList');
  const colPrep = document.getElementById('kdsColPrepList');
  const colReady = document.getElementById('kdsColReadyList');

  const ordersNew = appState.orders.filter(o => o.status === 'new');
  const ordersPrep = appState.orders.filter(o => o.status === 'preparing');
  const ordersReady = appState.orders.filter(o => o.status === 'ready');

  document.getElementById('kdsCountNew').textContent = ordersNew.length;
  document.getElementById('kdsCountPrep').textContent = ordersPrep.length;
  document.getElementById('kdsCountReady').textContent = ordersReady.length;

  const urgentTotal = appState.orders.filter(o => o.priority === 'urgent' && ['new', 'preparing'].includes(o.status)).length;
  document.getElementById('kdsUrgentCount').textContent = urgentTotal;
  document.getElementById('kdsActivePrepCount').textContent = ordersPrep.length;

  colNew.innerHTML = ordersNew.map(o => createKdsKitchenCardHtml(o, dict.btn_start_prep, 'preparing')).join('') || 
    `<div style="text-align:center; padding:24px; color:var(--text-muted);">${isAr ? 'لا توجد طلبات جديدة' : 'No new orders'}</div>`;

  colPrep.innerHTML = ordersPrep.map(o => createKdsKitchenCardHtml(o, dict.btn_mark_ready, 'ready')).join('') || 
    `<div style="text-align:center; padding:24px; color:var(--text-muted);">${isAr ? 'المطبخ متوقف حالياً' : 'Kitchen idle'}</div>`;

  colReady.innerHTML = ordersReady.map(o => createKdsKitchenCardHtml(o, dict.btn_mark_complete, 'completed')).join('') || 
    `<div style="text-align:center; padding:24px; color:var(--text-muted);">${isAr ? 'لا توجد طلبات جاهزة' : 'No ready orders'}</div>`;
}

function createKdsKitchenCardHtml(order, nextLabel, nextStatus) {
  const isAr = appState.lang === 'ar';
  const tableLabel = isAr ? (order.tableOrAddressAr || order.tableOrAddress) : order.tableOrAddress;

  const elapsedSec = Math.floor((Date.now() - order.placedTimestamp) / 1000);
  const elapsedMin = Math.floor(elapsedSec / 60);
  const elapsedRemainder = elapsedSec % 60;
  const timerText = `${String(elapsedMin).padStart(2, '0')}:${String(elapsedRemainder).padStart(2, '0')}`;

  let elapsedClass = 'elapsed-normal';
  if (elapsedMin >= 10 && elapsedMin < 20) elapsedClass = 'elapsed-warning';
  if (elapsedMin >= 20) elapsedClass = 'elapsed-danger';

  const itemsHtml = order.items.map((item, idx) => {
    const itemName = isAr ? item.nameAr : item.nameEn;
    return `
      <label class="kds-check-item">
        <input type="checkbox" onchange="this.parentElement.classList.toggle('done', this.checked)">
        <span class="kds-item-qty">${item.qty}×</span>
        <span>${item.icon || '🍽️'} ${itemName}</span>
      </label>
    `;
  }).join('');

  return `
    <div class="kds-kitchen-card ${order.priority === 'urgent' ? 'urgent' : ''}">
      <div class="kds-card-top">
        <div>
          <span class="kds-order-num">#${order.id}</span>
          <span class="kds-table-badge">${tableLabel}</span>
        </div>
        <div class="kds-timer-big ${elapsedClass}">
          <span>⏱ ${timerText}</span>
        </div>
      </div>

      <div style="font-size:0.8125rem; color:var(--text-secondary); display:flex; justify-content:space-between;">
        <strong>${order.customerName}</strong>
        <span>${order.placedTime}</span>
      </div>

      <div class="kds-items-checklist">
        ${itemsHtml}
      </div>

      ${order.notes ? `<div class="kds-notes-box">📝 ${order.notes}</div>` : ''}

      <button class="btn btn-primary kds-btn-advance" onclick="advanceOrderStatus('${order.id}', '${nextStatus}')">
        ${nextLabel} ➔
      </button>
    </div>
  `;
}

function renderTrackingDetail() {
  const isAr = appState.lang === 'ar';
  const dict = I18N[appState.lang];
  const curr = dict.currency_sar;

  const order = appState.orders.find(o => o.id === appState.selectedOrderId) || appState.orders[0];
  if (!order) return;

  // Quick Chips List
  const quickList = document.getElementById('quickTrackChipsList');
  if (quickList) {
    quickList.innerHTML = appState.orders.map(o => `
      <button class="track-chip-item ${o.id === order.id ? 'active' : ''}" onclick="selectOrderToTrack('${o.id}')">
        #${o.id}
      </button>
    `).join('');
  }

  // Populate tracking info
  document.getElementById('trkOrderId').textContent = `#${order.id}`;
  document.getElementById('trkOrderType').textContent = isAr ? (order.tableOrAddressAr || order.tableOrAddress) : order.tableOrAddress;
  document.getElementById('trkCustName').textContent = order.customerName;
  document.getElementById('trkCustPhone').textContent = order.customerPhone || 'N/A';
  document.getElementById('trkPayMethod').textContent = `${order.paymentMethod === 'Card' ? '💳 شبكة / مدى' : (order.paymentMethod === 'Cash' ? '💵 نقدي' : '📱 Apple Pay')} (${order.paymentStatus})`;
  document.getElementById('trkSpecialNotes').textContent = order.notes || (isAr ? 'لا توجد ملاحظات' : 'None');

  // Stepper 5 Stages logic
  const stagesMap = {
    new: { activeIdx: 1, eta: isAr ? '25 دقيقة' : '25 min' },
    preparing: { activeIdx: 3, eta: isAr ? '12 دقيقة' : '12 min' },
    ready: { activeIdx: 4, eta: isAr ? 'جاهز الآن!' : 'Ready Now!' },
    delivery: { activeIdx: 4, eta: isAr ? 'في الطريق' : 'On the Way' },
    completed: { activeIdx: 5, eta: isAr ? 'مكتمل ✅' : 'Completed' },
    cancelled: { activeIdx: 1, eta: isAr ? 'ملغي' : 'Cancelled' }
  };
  const currentSt = stagesMap[order.status] || stagesMap.new;
  document.getElementById('trkEtaDisplay').textContent = currentSt.eta;

  // Update timestamps
  document.getElementById('trkTime1').textContent = order.placedTime || '08:35 PM';
  document.getElementById('trkTime2').textContent = order.timeline?.accepted || '08:37 PM';
  document.getElementById('trkTime3').textContent = order.timeline?.preparing || (order.status !== 'new' ? '08:42 PM' : '--:--');
  document.getElementById('trkTime4').textContent = order.timeline?.ready || (['ready', 'delivery', 'completed'].includes(order.status) ? '08:55 PM' : '--:--');
  document.getElementById('trkTime5').textContent = order.timeline?.completed || (order.status === 'completed' ? '09:10 PM' : '--:--');

  for (let i = 1; i <= 5; i++) {
    const node = document.getElementById(`stepNode${i}`);
    if (!node) continue;
    node.className = 'stepper-step';
    if (i < currentSt.activeIdx) {
      node.classList.add('step-done');
    } else if (i === currentSt.activeIdx) {
      node.classList.add('step-active');
    } else {
      node.classList.add('step-pending');
    }
  }

  // Items List & Calculations
  const itemsList = document.getElementById('trkItemsList');
  let subtotal = 0;
  itemsList.innerHTML = order.items.map(item => {
    const lineTotal = item.price * item.qty;
    subtotal += lineTotal;
    const itemName = isAr ? item.nameAr : item.nameEn;
    return `
      <div class="trk-item-row">
        <div class="trk-item-meta">
          <span class="trk-qty-box">${item.qty}×</span>
          <span>${item.icon || '🍽️'} ${itemName}</span>
        </div>
        <strong>${lineTotal.toFixed(2)} ${curr}</strong>
      </div>
    `;
  }).join('');

  const vat = subtotal * 0.15;
  const delivery = order.orderType === 'Delivery' ? 12.00 : 0.00;
  const grandTotal = subtotal + vat + delivery;

  document.getElementById('trkSubtotal').textContent = `${subtotal.toFixed(2)} ${curr}`;
  document.getElementById('trkVat').textContent = `${vat.toFixed(2)} ${curr}`;
  document.getElementById('trkDeliveryFee').textContent = `${delivery.toFixed(2)} ${curr}`;
  document.getElementById('trkGrandTotal').textContent = `${grandTotal.toFixed(2)} ${curr}`;
}

function renderAnalyticsTab() {
  const isAr = appState.lang === 'ar';
  const curr = isAr ? 'ر.س' : 'SAR';

  let totalRev = 0;
  let dineinCount = 0;
  let cashRev = 0;
  let cardRev = 0;
  let onlineRev = 0;

  appState.orders.filter(o => o.status !== 'cancelled').forEach(o => {
    const sub = o.items.reduce((s, i) => s + (i.price * i.qty), 0) * 1.15;
    totalRev += sub;
    if (o.orderType === 'Dine-in') dineinCount++;
    if (o.paymentMethod === 'Cash') cashRev += sub;
    else if (o.paymentMethod === 'Card') cardRev += sub;
    else onlineRev += sub;
  });

  document.getElementById('statTotalRevenue').textContent = `${totalRev.toFixed(2)} ${curr}`;
  document.getElementById('statTotalOrdersCount').textContent = appState.orders.length;
  document.getElementById('statDineinCount').textContent = `${dineinCount} ${isAr ? 'طاولات' : 'Tables'}`;

  // Payment Breakdown Bars
  const maxRev = Math.max(cashRev, cardRev, onlineRev, 1);
  document.getElementById('payMethodsBreakdown').innerHTML = `
    <div class="pay-item-bar">
      <div class="pay-meta-row"><span>💳 ${isAr ? 'شبكة / مدى (Card)' : 'Card / Mada'}</span><span>${cardRev.toFixed(2)} ${curr}</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${(cardRev/maxRev)*100}%; background:var(--accent-blue);"></div></div>
    </div>
    <div class="pay-item-bar">
      <div class="pay-meta-row"><span>📱 ${isAr ? 'أبل باي / أونلاين (Apple Pay)' : 'Apple Pay / Online'}</span><span>${onlineRev.toFixed(2)} ${curr}</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${(onlineRev/maxRev)*100}%; background:var(--accent-emerald);"></div></div>
    </div>
    <div class="pay-item-bar">
      <div class="pay-meta-row"><span>💵 ${isAr ? 'كاش نقدي (Cash)' : 'Cash'}</span><span>${cashRev.toFixed(2)} ${curr}</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${(cashRev/maxRev)*100}%; background:var(--primary);"></div></div>
    </div>
  `;

  // History Table
  const historyTbody = document.getElementById('historyTableBody');
  historyTbody.innerHTML = appState.orders.map(o => {
    const sub = o.items.reduce((s, i) => s + (i.price * i.qty), 0) * 1.15;
    return `
      <tr>
        <td><strong>#${o.id}</strong></td>
        <td>${o.customerName}</td>
        <td>${o.orderType}</td>
        <td><strong>${sub.toFixed(2)} ${curr}</strong></td>
        <td>${o.paymentMethod}</td>
        <td><span class="status-badge ${o.status}">${o.status}</span></td>
      </tr>
    `;
  }).join('');
}

function updateLiveTimers() {
  document.querySelectorAll('.order-card, .kds-kitchen-card').forEach(el => {
    const orderId = el.getAttribute('data-order-id') || el.querySelector('.kds-order-num')?.textContent?.replace('#', '');
    if (!orderId) return;
    const order = appState.orders.find(o => o.id === orderId);
    if (!order) return;

    const elapsedSec = Math.floor((Date.now() - order.placedTimestamp) / 1000);
    const elapsedMin = Math.floor(elapsedSec / 60);
    const elapsedRemainder = elapsedSec % 60;
    const timerText = `${String(elapsedMin).padStart(2, '0')}:${String(elapsedRemainder).padStart(2, '0')}`;

    let elapsedClass = 'elapsed-normal';
    if (elapsedMin >= 10 && elapsedMin < 20) elapsedClass = 'elapsed-warning';
    if (elapsedMin >= 20) elapsedClass = 'elapsed-danger';

    const timerSpan = el.querySelector('.elapsed-time') || el.querySelector('.kds-timer-big');
    if (timerSpan) {
      if (el.classList.contains('kds-kitchen-card')) {
        timerSpan.innerHTML = `<span>⏱ ${timerText}</span>`;
        timerSpan.className = `kds-timer-big ${elapsedClass}`;
      } else {
        timerSpan.textContent = `(${timerText})`;
        timerSpan.className = `elapsed-time ${elapsedClass}`;
      }
    }
  });
}

// =============================================================================
// 9. ORDER ACTION HANDLERS & STATUS ADVANCEMENT
// =============================================================================

window.advanceOrderStatus = function(orderId, targetStatus) {
  const order = appState.orders.find(o => o.id === orderId);
  if (!order) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  order.status = targetStatus;
  if (!order.timeline) order.timeline = {};

  if (targetStatus === 'preparing') order.timeline.preparing = timeStr;
  else if (targetStatus === 'ready') order.timeline.ready = timeStr;
  else if (targetStatus === 'completed') order.timeline.completed = timeStr;

  saveStorage();
  playChime('advance');
  renderAllViews();
  showToast(appState.lang === 'ar' ? `تم تحديث الطلب #${order.id} إلى: ${targetStatus}` : `Order #${order.id} updated to ${targetStatus}`, 'success');
};

window.viewOrderInTracker = function(orderId) {
  appState.selectedOrderId = orderId;
  switchTab('tracking');
  renderTrackingDetail();
};

window.selectOrderToTrack = function(orderId) {
  appState.selectedOrderId = orderId;
  renderTrackingDetail();
};

function setupTrackingView() {
  const btnTrack = document.getElementById('btnDoTrack');
  const inp = document.getElementById('trackInputCode');
  const btnAdvance = document.getElementById('btnAdvanceTrkStep');
  const btnReceipt = document.getElementById('btnReceiptFromTrk');

  btnTrack.addEventListener('click', () => {
    const q = inp.value.trim().toUpperCase().replace('#', '');
    if (!q) return;
    const match = appState.orders.find(o => o.id.toUpperCase() === q);
    if (match) {
      appState.selectedOrderId = match.id;
      renderTrackingDetail();
      showToast(appState.lang === 'ar' ? `جاري تتبع الطلب #${match.id}` : `Tracking order #${match.id}`, 'info');
    } else {
      showToast(appState.lang === 'ar' ? `لم يتم العثور على الطلب #${q}` : `Order #${q} not found`, 'warning');
    }
  });

  btnAdvance.addEventListener('click', () => {
    const order = appState.orders.find(o => o.id === appState.selectedOrderId);
    if (!order) return;
    const seq = ['new', 'preparing', 'ready', 'completed'];
    const idx = seq.indexOf(order.status);
    if (idx < seq.length - 1) {
      advanceOrderStatus(order.id, seq[idx + 1]);
    } else {
      showToast(appState.lang === 'ar' ? 'الطلب مكتمل بالفعل' : 'Order is already completed', 'info');
    }
  });

  btnReceipt.addEventListener('click', () => {
    openReceiptModalForOrder(appState.selectedOrderId);
  });
}

// =============================================================================
// 10. SIMULATOR & AUTOMATION ENGINE
// =============================================================================

function toggleAutoSimulation() {
  appState.autoSimulating = !appState.autoSimulating;
  const btn = document.getElementById('btnAutoSimToggle');
  const lbl = document.getElementById('autoSimStatusLabel');
  const dict = I18N[appState.lang];

  if (appState.autoSimulating) {
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-secondary');
    lbl.textContent = dict.btn_stop_sim;
    showToast(appState.lang === 'ar' ? 'تم تشغيل المحاكي التلقائي للطلبات' : 'Auto simulation running', 'info');

    appState.simIntervalId = setInterval(() => {
      // Find an active order and advance it
      const active = appState.orders.filter(o => !['completed', 'cancelled'].includes(o.status));
      if (active.length > 0) {
        const randOrder = active[Math.floor(Math.random() * active.length)];
        const seq = ['new', 'preparing', 'ready', 'completed'];
        const nextSt = seq[seq.indexOf(randOrder.status) + 1];
        if (nextSt) advanceOrderStatus(randOrder.id, nextSt);
      } else {
        simulateNewIncomingOrder();
      }
    }, 4500);
  } else {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-secondary');
    lbl.textContent = dict.btn_start_sim;
    clearInterval(appState.simIntervalId);
    showToast(appState.lang === 'ar' ? 'تم إيقاف المحاكي التلقائي' : 'Simulation stopped', 'info');
  }
}

function simulateNewIncomingOrder() {
  const names = ['سلطان الشهري', 'عبدالرحمن عسيري', 'ماجد الحربي', 'خالد الدوسري', 'نوف الغامدي'];
  const tables = ['طاولة 01', 'طاولة 04', 'طاولة 06', 'طاولة 07', 'طاولة 10'];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomTable = tables[Math.floor(Math.random() * tables.length)];

  const nextNum = 1020 + appState.orders.length + 1;
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const randomItems = [
    { id: 'm_burger', nameAr: 'برجر دجاج مشوي', nameEn: 'Chicken Burger', icon: '🍔', qty: Math.floor(Math.random()*2)+1, price: 24.00 },
    { id: 'm_fries', nameAr: 'بطاطس مقلية مقرمشة', nameEn: 'French Fries', icon: '🍟', qty: 1, price: 10.00 },
    { id: 'm_pepsi', nameAr: 'بيبسي بارد مع ثلج', nameEn: 'Pepsi', icon: '🥤', qty: Math.floor(Math.random()*2)+1, price: 5.00 }
  ];

  const newOrder = {
    id: `ORD-${nextNum}`,
    customerName: randomName,
    customerPhone: '+966 50 ' + Math.floor(1000000 + Math.random() * 9000000),
    orderType: 'Dine-in',
    tableOrAddress: randomTable,
    tableOrAddressAr: randomTable,
    placedTime: timeStr,
    placedTimestamp: Date.now(),
    status: 'new',
    priority: Math.random() > 0.6 ? 'urgent' : 'normal',
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    notes: 'طلب فوري جديد عبر الكاشير',
    items: randomItems,
    timeline: {
      received: timeStr,
      accepted: null,
      preparing: null,
      ready: null,
      completed: null
    }
  };

  appState.orders.unshift(newOrder);
  saveStorage();
  playChime('newOrder');
  renderAllViews();
  showToast(appState.lang === 'ar' ? `وصل طلب جديد #${newOrder.id} - ${randomTable}` : `New order received #${newOrder.id}`, 'success');
}

// =============================================================================
// 11. POS NEW ORDER MODAL & CART SYSTEM
// =============================================================================

function setupNewOrderModal() {
  const modal = document.getElementById('modalNewOrder');
  const btnOpen = document.getElementById('btnOpenNewOrder');
  const btnClose = document.getElementById('btnCloseNewOrder');
  const btnSubmit = document.getElementById('btnSubmitNewOrder');
  const selType = document.getElementById('selOrderType');
  const lblTable = document.getElementById('lblTableOrAddr');
  const inpTable = document.getElementById('inpTableOrAddr');

  btnOpen.addEventListener('click', () => {
    appState.activeCart = {};
    renderModalMenu('all');
    renderModalCart();
    modal.classList.remove('hidden');
  });

  btnClose.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  selType.addEventListener('change', () => {
    const val = selType.value;
    const isAr = appState.lang === 'ar';
    if (val === 'Dine-in') {
      lblTable.textContent = isAr ? 'رقم الطاولة' : 'Table Number';
      inpTable.value = isAr ? `طاولة 0${Math.floor(Math.random()*8)+1}` : `Table 0${Math.floor(Math.random()*8)+1}`;
    } else if (val === 'Pickup') {
      lblTable.textContent = isAr ? 'كاونتر الاستلام' : 'Pickup Counter';
      inpTable.value = isAr ? 'كاونتر سفري 1' : 'Takeaway Counter #1';
    } else {
      lblTable.textContent = isAr ? 'عنوان التوصيل' : 'Delivery Address';
      inpTable.value = isAr ? 'صبيا - حي الروضة' : 'Sabya District';
    }
  });

  const catPills = document.querySelectorAll('#menuCatTabsBar .cat-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderModalMenu(pill.getAttribute('data-cat'));
    });
  });

  btnSubmit.addEventListener('click', submitNewPosOrder);
}

function renderModalMenu(cat = 'all') {
  const grid = document.getElementById('modalMenuCardsGrid');
  const isAr = appState.lang === 'ar';
  const curr = isAr ? 'ر.س' : 'SAR';

  const items = cat === 'all' ? MENU_ITEMS : MENU_ITEMS.filter(m => m.cat === cat);

  grid.innerHTML = items.map(item => `
    <div class="food-item-card">
      <div class="food-item-info">
        <h5>${item.icon} ${isAr ? item.nameAr : item.nameEn}</h5>
        <p>${isAr ? item.descAr : item.descEn}</p>
      </div>
      <div class="food-item-bottom">
        <span class="food-price">${item.price.toFixed(2)} ${curr}</span>
        <button class="btn-add-food" onclick="addItemToCart('${item.id}')">+ إضافة</button>
      </div>
    </div>
  `).join('');
}

window.addItemToCart = function(itemId) {
  appState.activeCart[itemId] = (appState.activeCart[itemId] || 0) + 1;
  renderModalCart();
  playChime('advance');
};

window.modifyCartQty = function(itemId, delta) {
  if (!appState.activeCart[itemId]) return;
  appState.activeCart[itemId] += delta;
  if (appState.activeCart[itemId] <= 0) {
    delete appState.activeCart[itemId];
  }
  renderModalCart();
};

function renderModalCart() {
  const list = document.getElementById('modalCartItemsList');
  const subtotalEl = document.getElementById('cartSubtotal');
  const vatEl = document.getElementById('cartVat');
  const grandEl = document.getElementById('cartGrandTotal');
  const btnSubmit = document.getElementById('btnSubmitNewOrder');

  const isAr = appState.lang === 'ar';
  const curr = isAr ? 'ر.س' : 'SAR';

  const keys = Object.keys(appState.activeCart);
  if (keys.length === 0) {
    list.innerHTML = `<div style="text-align:center; padding:16px; color:var(--text-muted); font-size:0.8125rem;">${isAr ? 'لم تتم إضافة أي أصناف بعد' : 'No items added yet'}</div>`;
    subtotalEl.textContent = `0.00 ${curr}`;
    vatEl.textContent = `0.00 ${curr}`;
    grandEl.textContent = `0.00 ${curr}`;
    btnSubmit.disabled = true;
    return;
  }

  let subtotal = 0;
  list.innerHTML = keys.map(id => {
    const item = MENU_ITEMS.find(m => m.id === id);
    const qty = appState.activeCart[id];
    const lineTotal = item.price * qty;
    subtotal += lineTotal;
    const itemName = isAr ? item.nameAr : item.nameEn;

    return `
      <div class="cart-row-item">
        <span>${item.icon} ${itemName}</span>
        <div class="cart-ctrls">
          <button class="cart-btn-qty" onclick="modifyCartQty('${id}', -1)">-</button>
          <span>${qty}</span>
          <button class="cart-btn-qty" onclick="modifyCartQty('${id}', 1)">+</button>
          <strong style="margin-inline-start:6px;">${lineTotal.toFixed(2)} ${curr}</strong>
        </div>
      </div>
    `;
  }).join('');

  const vat = subtotal * 0.15;
  const grand = subtotal + vat;

  subtotalEl.textContent = `${subtotal.toFixed(2)} ${curr}`;
  vatEl.textContent = `${vat.toFixed(2)} ${curr}`;
  grandEl.textContent = `${grand.toFixed(2)} ${curr}`;
  btnSubmit.disabled = false;
}

function submitNewPosOrder() {
  const name = document.getElementById('inpOrderCustomerName').value.trim() || 'عميل كاشير';
  const phone = document.getElementById('inpOrderCustomerPhone').value.trim();
  const type = document.getElementById('selOrderType').value;
  const table = document.getElementById('inpTableOrAddr').value.trim() || 'طاولة 01';
  const pay = document.getElementById('selPaymentMethod').value;
  const priority = document.getElementById('selOrderPriority').value;
  const notes = document.getElementById('inpOrderSpecialNotes').value.trim();

  const cartKeys = Object.keys(appState.activeCart);
  if (cartKeys.length === 0) return;

  const items = cartKeys.map(id => {
    const item = MENU_ITEMS.find(m => m.id === id);
    return {
      id: item.id,
      nameAr: item.nameAr,
      nameEn: item.nameEn,
      icon: item.icon,
      qty: appState.activeCart[id],
      price: item.price
    };
  });

  const nextNum = 1020 + appState.orders.length + 1;
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newOrder = {
    id: `ORD-${nextNum}`,
    customerName: name,
    customerPhone: phone,
    orderType: type,
    tableOrAddress: table,
    tableOrAddressAr: table,
    placedTime: timeStr,
    placedTimestamp: Date.now(),
    status: 'new',
    priority: priority,
    paymentMethod: pay,
    paymentStatus: 'Paid',
    notes: notes,
    items: items,
    timeline: {
      received: timeStr,
      accepted: null,
      preparing: null,
      ready: null,
      completed: null
    }
  };

  appState.orders.unshift(newOrder);
  saveStorage();
  appState.selectedOrderId = newOrder.id;

  document.getElementById('modalNewOrder').classList.add('hidden');
  playChime('newOrder');
  showToast(appState.lang === 'ar' ? `تم إصدار الفاتورة وإرسال الطلب #${newOrder.id} للمطبخ!` : `Order #${newOrder.id} sent to kitchen!`, 'success');

  renderAllViews();
}

// =============================================================================
// 12. RECEIPT / THERMAL PRINT INVOICE MODAL
// =============================================================================

function setupReceiptModal() {
  const modal = document.getElementById('modalReceipt');
  const btnClose = document.getElementById('btnCloseReceipt');

  btnClose.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}

window.openReceiptModalForOrder = function(orderId) {
  const order = appState.orders.find(o => o.id === orderId);
  if (!order) return;

  const isAr = appState.lang === 'ar';
  const curr = isAr ? 'ر.س' : 'SAR';

  document.getElementById('rcpOrderId').textContent = `#${order.id}`;
  document.getElementById('rcpDate').textContent = new Date().toISOString().split('T')[0];
  document.getElementById('rcpType').textContent = isAr ? (order.tableOrAddressAr || order.tableOrAddress) : order.tableOrAddress;
  document.getElementById('rcpCustomer').textContent = order.customerName;
  document.getElementById('rcpPayment').textContent = order.paymentMethod;

  let subtotal = 0;
  document.getElementById('rcpTableBody').innerHTML = order.items.map(item => {
    const lineTotal = item.price * item.qty;
    subtotal += lineTotal;
    const itemName = isAr ? item.nameAr : item.nameEn;
    return `
      <tr>
        <td align="right">${item.icon || ''} ${itemName}</td>
        <td align="center">${item.qty}</td>
        <td align="left">${lineTotal.toFixed(2)} ${curr}</td>
      </tr>
    `;
  }).join('');

  const vat = subtotal * 0.15;
  const delivery = order.orderType === 'Delivery' ? 12.00 : 0.00;
  const grand = subtotal + vat + delivery;

  document.getElementById('rcpSubtotal').textContent = `${subtotal.toFixed(2)} ${curr}`;
  document.getElementById('rcpVat').textContent = `${vat.toFixed(2)} ${curr}`;
  document.getElementById('rcpDelivery').textContent = `${delivery.toFixed(2)} ${curr}`;
  document.getElementById('rcpGrandTotal').textContent = `${grand.toFixed(2)} ${curr}`;

  document.getElementById('modalReceipt').classList.remove('hidden');
};

// =============================================================================
// 13. TOAST NOTIFICATIONS HELPER
// =============================================================================

function showToast(msg, type = 'info') {
  const hub = document.getElementById('toastNotificationHub');
  const toast = document.createElement('div');
  toast.className = `toast-msg ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : (type === 'warning' ? '⚠️' : '🔔')}</span>
    <span>${msg}</span>
  `;
  hub.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-8px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// Export orders data as JSON
window.exportOrdersJson = function() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState.orders, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `khamir_orders_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast(appState.lang === 'ar' ? 'تم تنزيل ملف البيانات بنجاح' : 'Orders JSON exported successfully', 'success');
};
