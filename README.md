# 🍽️ مطعم خَامِر (KHAMIR) — Smart Restaurant POS, Order Flow & Kitchen Display System (KDS)

রেস্তোراঁর সম্পূর্ণ ক্যাশিয়ার, কিচেন এবং ডেলিভারি অপারেশন পরিচালনা করার জন্য একটি সম্পূর্ণ প্রিমিয়াম ওয়েব অ্যাপ্লিকেশন (**Single Page Application**)।

---

## 🎨 UI & Design Architecture

- **Theme & Style:** Modern Glassmorphism + Dark Navy & Soft Cream Dashboard with Warm Amber / Orange Accents (`#f59e0b`, `#ea580c`).
- **Typography:** `Cairo` (العربية) + `Poppins` (English) + `JetBrains Mono` (Receipts/Timers).
- **Languages:** **Arabic (Default RTL)** + **English (LTR)** instant toggle with full bilingual localization.
- **Theme Modes:** Dark Theme (Default) + Light Theme toggle.
- **Sound Alerts:** Web Audio API সিন্থেসাইজারের মাধ্যমে নতুন অর্ডার এবং স্ট্যাটাস পরিবর্তনের রিয়েল-টাইম অডিও বেল সাউন্ড।

---

## 📊 Main Dashboard & Order Stages

রেস্তোراঁর **Cashier ➔ Kitchen ➔ Delivery/Completed** পুরো অর্ডার ফ্লো এক নজরে দেখার জন্য ৬টি নির্দিষ্ট স্ট্যাটাস:

1. 🍽️ **New Orders (طلبات جديدة)** — নতুন অর্ডার ও বুকিং
2. 🔥 **Preparing (قيد التحضير)** — কিচেনে রান্না চলছে
3. 👨‍🍳 **Ready (جاهز للتقديم)** — খাবার প্রস্তুত
4. 🚚 **Out for Delivery (قيد التوصيل)** — ডেলিভারি ড্রাইভারের কাছে
5. ✅ **Completed (مكتمل)** — সফলভাবে সম্পন্ন ও পরিশোধিত
6. ❌ **Cancelled (ملغي)** — বাতিলকৃত অর্ডার

### 🗂️ Order Card Format:
```text
#ORD-1025
Table 08
3 Items · SAR 86.00

🍔 Chicken Burger × 2
🍟 French Fries × 1
🥤 Pepsi × 2

Preparing · 08:42 PM (05:24)
[View Order] [Update Status]
```

---

## 🖥️ Kitchen Display System (KDS Screen)

কিচেন স্টাফ এবং শেফদের জন্য বড় স্ক্রিনের উপযোগী ডেডিকেটেড ডিসপ্লে:
- **NEW / PREPARING / READY** কলাম ভিউ।
- **Live Elapsed Timers:** প্রতিটি অর্ডারে কতক্ষণ সময় অতিবাহিত হয়েছে তা লাইভ কাউন্টডাউন (সবুজ `< 10m`, হলুদ `10-20m`, লাল `> 20m`)।
- **Chef Checklists:** রান্না করার সময় আইটেম ধরে ধরে টিক মার্ক দেওয়ার ব্যবস্থা।
- **Kitchen Priority:** Normal ও Urgent (عاجل) ফায়ার ব্যাজ।

---

## 📱 Mobile UI

- **Bottom Floating Navigation:**
  - 🏠 Dashboard (الرئيسية)
  - 🧾 Orders (الطلبات)
  - 🍳 Kitchen (المطبخ)
  - 📦 Tracking (التتبع)
  - ⚙️ Analytics (المزيد)
- **Top Bar:** Restaurant Name (`مطعم خَامِر`), Live Notification Bell, Sound Alert Toggle, Admin Profile (`Md. Emdadul`).

---

## 🔎 Order Tracking & 5-Step Timeline

গ্রাহক ও কর্মীদের জন্য লাইভ টাইমলাইন ট্র্যাকার:
1. **Order Received (استلام الطلب)** — `08:35 PM`
2. **Accepted (قبول الطلب في الكاشير)** — `08:37 PM`
3. **Preparing (قيد التحضير في المطبخ)** — `08:42 PM`
4. **Ready (جاهز للتسليم والتقديم)** — `08:55 PM`
5. **Delivered / Completed (تم التوصيل / التسليم)** — `09:10 PM`

---

## 🧾 POS Features & Thermal Receipt

- **POS Ticket Generator:** ক্যাশিয়ার নতুন অর্ডার তৈরি করতে পারে (মেন্যু থেকে খাবার সিলেক্ট, টেবিল নাম্বার, পেমেন্ট মেথড: Cash, Mada/Card, Apple Pay)।
- **Thermal Print Invoice:** 80mm থার্মাল পেপার রিসিপ্ট জেনারেটর (১৫% ভ্যাট হিসাব, ট্যাক্স রেজিস্ট্রেশন নম্বর, QR কোড ও সরাসরি প্রিন্ট অপশন)।
- **Daily Analytics:** দৈনিক মোট আয় (SAR), অর্ডার কাউন্ট, পেমেন্ট মেথড ব্রেকডাউন এবং JSON ডাটা এক্সপোর্ট।

---

## 🚀 Live Run

ব্রাউজারে সরাসরি `index.html` ফাইলটি ওপেন করলেই সম্পূর্ণ সিস্টেমটি অফলাইন/অনলাইনে তাৎক্ষণিক সচল হবে।
