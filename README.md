# 🍽️ RestoTrack - Real-Time Restaurant Order Tracking & Kitchen Display System (KDS)

রেস্তোরাঁর গ্রাহকদের জন্য লাইভ অর্ডার ট্র্যাকিং এবং কিচেন/স্টাফদের জন্য কিচেন ডিসপ্লে সিস্টেম (KDS) ম্যানেজমেন্ট ড্যাশবোর্ড।

---

## 🌟 Key Features / মূল বৈশিষ্ট্যসমূহ

### 1. 📱 Customer Live Order Tracker (গ্রাহক লাইভ ট্র্যাকিং)
- **4-Stage Visual Progress Stepper:**
  1. 📝 Order Placed & Confirmed (অর্ডার গৃহীত ও নিশ্চিত)
  2. 🍳 In Kitchen / Chef Preparing (রান্না চলছে)
  3. 📦 Ready for Service / Pickup (খাবার প্রস্তুত)
  4. ✅ Served / Delivered (পরিবেশিত / সম্পন্ন)
- **Live Countdown & ETA:** রিয়েল-টাইম কাউন্টডাউন এবং আনুমানিক অপেক্ষার সময় প্রদর্শন।
- **Instant Search & Track:** Order ID দিয়ে তাৎক্ষণিক ট্র্যাকিং এবং সক্রিয় অর্ডারগুলোর কুইক চিপস।
- **Detailed Invoice & Receipt:** আইটেমাইজড ব্রেকডাউন, ১৫% ভ্যাট ট্যাক্স হিসাব এবং প্রিন্টেবল রসিদ জেনারেটর।

### 2. 👨‍🍳 Kitchen Display System & Staff Kanban (কিচেন ড্যাশবোর্ড)
- **Live Kanban Board:** ৪টি আলাদা কলামে (Pending, Kitchen, Ready, Completed) অর্ডার সরানো ও স্ট্যাটাস আপডেট করার সুবিধা।
- **Real-Time Kitchen Metrics:**
  - মোট সক্রিয় অর্ডার (Active Orders)
  - রান্নাধীন অর্ডার (In Kitchen)
  - ডেলিভারির জন্য প্রস্তুত (Ready for Pickup)
  - আজকের মোট আয় (Today's Revenue)
- **Filter & Search:** ডাইন-ইন (Dine-in), টেকঅ্যাওয়ে (Pickup), এবং হোম ডেলিভারি (Delivery) অনুযায়ী ফিল্টারিং।
- **Auto-Simulator Engine:** ডেমো ও টেস্টিংয়ের জন্য লাইভ অর্ডার অটোমেশন সিমুলেটর।

### 3. 🛍️ Interactive Order Placement & Cart (নতুন অর্ডার তৈরি)
- মেন্যু ক্যাটাগরি ব্রাউজার (Main Dishes, Grills, Breads & Sides, Drinks & Sweets)।
- কার্টে আইটেম যুক্ত ও পরিমাণ নিয়ন্ত্রণের সুবিধা।
- কাস্টমার নাম, ফোন নম্বর, টেবিল নাম্বার এবং বিশেষ রান্নার নির্দেশনা (Chef Notes) ইনপুট।

### 4. 🔊 Audio Chimes & LocalStorage Persistence
- Web Audio API সিন্থেসাইজারের মাধ্যমে অর্ডার তৈরি ও স্ট্যাটাস পরিবর্তনের লাইভ সাউন্ড নোটিফিকেশন।
- সম্পূর্ণ ডাটা ব্রাউজারের `localStorage`-এ সংরক্ষিত থাকে।

---

## 🚀 Live Demo & Deployment (GitHub Pages)

এই প্রজেক্টটি সরাসরি **GitHub Pages**-এ হোস্ট করা যায়:
1. GitHub রিপোজিটরির **Settings**-এ যান।
2. বাম পাশের মেন্যু থেকে **Pages** নির্বাচন করুন।
3. Branch হিসেবে `main` এবং ফোল্ডার হিসেবে `/ (root)` সিলেক্ট করে **Save** দিন।
4. কয়েক সেকেন্ডের মধ্যে আপনার লাইভ লিংক প্রস্তুত হয়ে যাবে:
   `https://<username>.github.io/<repository-name>/`

---

## 🛠️ Tech Stack

- **HTML5 & CSS3:** Modern Responsive UI/UX Design System (slate/emerald/amber theme, glassmorphism, responsive grid).
- **Vanilla JavaScript (ES6+):** Clean state management, dynamic DOM rendering, Web Audio chime synthesizer.
- **LocalStorage:** Instant offline & persistent data syncing.

---

## 📝 License
MIT License
