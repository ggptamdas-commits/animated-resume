# 🍽️ مطعم خامر (KHAMER RESTAURANT) — Order Tracking Dashboard & Kitchen KDS

আপনার প্রোভাইড করা রেফারেন্স ইমেজ ডিজাইন ও লেআউট অনুযায়ী তৈরি **Restaurant POS & Order Tracking System**।

---

## 🎨 Design Features (হুবহু ডিজাইনের উপাদানসমূহ)

1. **Left Dark Sidebar:**
   - লোগো ও ব্র্যান্ডিং: `مطعم خامر` / `KHAMER RESTAURANT`
   - মেনু অপশনস: Dashboard, Orders, Kitchen, Tracking, Menu, Customers, Reports, Staff, Settings, Logout
   - বটম ইউজার প্রোফাইল: `Admin / Manager (🟢 Online)`

2. **Top Header & Search Bar:**
   - টাইটেল: `Order Tracking Dashboard`
   - সাবটাইটেল: `Real-time overview of all restaurant orders`
   - গ্লোবাল সার্চ বার: `Search order, table, customer...`
   - নোটিফিকেশন বেল ব্যাজ (12) এবং অ্যাডমিন প্রোফাইল ড্রপডাউন (`Admin ⌄ / مدير`)

3. **6 Status Metric Cards:**
   - 🛍️ **New Orders**: `12` (+3 new)
   - 🍲 **Preparing**: `08` (In Progress)
   - 🛎️ **Ready**: `05` (Ready to Serve)
   - 🛵 **Out for Delivery**: `03` (On the way)
   - 🟣 **Completed**: `25` (Today)
   - 🔴 **Cancelled**: `02` (Today)

4. **Live Order Cards (৪টি কার্ড):**
   - **#ORD-1025** | Table 08 | 3 Items · SAR 86.00 | `NEW` (2 min ago) | Chicken Burger x2, French Fries x1, Pepsi x2 | `Cash` | `[View Order]`
   - **#ORD-1024** | Table 03 | 4 Items · SAR 120.00 | `PREPARING` (8 min ago) | Shawarma x2, Arabic Rice x1, Salad x1, Water x1 | `Card` | `[View Order]`
   - **#ORD-1023** | Table 12 | 2 Items · SAR 55.00 | `READY` (15 min ago) | Beef Steak x1, Mashed Potato x1 | `Cash` | `[View Order]`
   - **#ORD-1022** | Delivery | 3 Items · SAR 75.00 | `OUT FOR DELIVERY` (20 min ago) | Zinger Burger x2, Coke x1 | `Online` | `[View Order]`

5. **Right Order Details Drawer & Timeline:**
   - `PREPARING #ORD-1025`
   - `Table 08 • Dine In`
   - `26 May 2024 • 08:42 PM`
   - `👤 Ahmad Al Omar (+966 50 123 4567)`
   - আইটেমাইজড ব্রেকডাউন (SAR 86.00)
   - পেমেন্ট মেথড: `Cash`, স্ট্যাটাস: `Preparing`, ক্যাশিয়ার: `Riham`, নোট: `Please no onion`
   - **Order Timeline (৬টি ধাপ):**
     - ✔️ Order Received (`08:34 PM`)
     - ✔️ Accepted (`08:35 PM`)
     - 🟠 Preparing (`08:38 PM`) [Active Pulse]
     - ⚪ Ready (`08:45 PM`)
     - ⚪ Out for Delivery (`08:47 PM`)
     - ⚪ Completed (`--:--`)
   - অ্যাকশন বাটন: `[Cancel Order]` ও `[Update Status]`

6. **Today's Summary Widget (Dark Card + Chart):**
   - `Total Orders: 55` | `Total Sales: SAR 3,650.00`
   - `Completed: 25` | `Average Order: SAR 66.36`
   - hourly trend স্পার্কলাইন গ্রাফ (`5 AM` থেকে `12 AM`)

7. **📱 Mobile 5-Screen Simulator:**
   - Dashboard, Orders, Kitchen KDS, Tracking, More (Setting) স্ক্রিনসমূহ ইন্টারেক্টিভভাবে টগল করে দেখার সুবিধা।

---

## 🚀 Live Preview

যেকোনো ব্রাউজারে `index.html` ফাইলটি ওপেন করলেই তাৎক্ষণিক চালু হবে।
