# 🌌 EventSphere | Premium Event Platform

[![Deployed on Contentstack Launch](https://img.shields.io/badge/Deployed%20on-Contentstack%20Launch-blueviolet?style=for-the-badge&logo=rocket)](https://www.contentstack.com/launch)
[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**EventSphere** is a high-performance, professional event management and showcase platform built with Next.js and powered by Contentstack's Headless CMS. It features a stunning premium dark-themed UI, smooth interactive animations, and a dynamic content architecture.

---

## ✨ Key Features

-   **🎯 Professional Dark UI:** A sleek, modern aesthetic using a curated Zinc & Indigo color palette.
-   **🎭 Smooth Animations:** Powered by **Framer Motion** for fluid entrance, scroll-triggered, and micro-interaction animations.
-   **🔌 Contentstack Integrated:** Fully dynamic content fetching using Contentstack's Delivery SDK.
-   **👥 Author Profiles:** Dedicated section for speakers/authors with detailed profile views.
-   **📅 Interactive Schedule:** A beautiful timeline-based itinerary with "featuring" highlights.
-   **📱 Fully Responsive:** Optimized for a seamless experience across mobile, tablet, and desktop.

---

## 🛠️ Tech Stack

-   **Frontend:** [Next.js 15+](https://nextjs.org/) (App Router)
-   **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **CMS:** [Contentstack](https://www.contentstack.com/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Deployment:** [Contentstack Launch](https://www.contentstack.com/launch)

---

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+ 
-   A Contentstack account with a configured Stack

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/DhanushG78/events-webpage.git
    cd events-webpage
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory and add your Contentstack credentials:
    ```env
    NEXT_PUBLIC_API_KEY=your_api_key
    NEXT_PUBLIC_DELIVERY_TOKEN=your_delivery_token
    NEXT_PUBLIC_ENVIRONMENT=your_environment
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

## 🏗️ Project Structure

```text
├── app/
│   ├── authors/        # Author listing and detail pages
│   ├── events/         # Event listing page
│   ├── event/[slug]/   # Dynamic event detail pages
│   └── layout.tsx      # Global layout with Navbar
├── components/
│   ├── EventView.tsx   # Core reusable event renderer
│   └── Navbar.tsx      # Global navigation component
├── lib/
│   ├── api.ts          # Contentstack data fetching logic
│   └── contentstack.ts # Contentstack SDK initialization
└── public/             # Static assets
```

---

## 🚢 Deployment

This project is optimized for **Contentstack Launch**. 

To deploy:
1. Connect your GitHub repository to Contentstack Launch.
2. Configure the environment variables in the Launch dashboard.
3. Set the build command to `npm run build` and the output directory to `.next`.

---

## 📄 License

This project is developed for internship/portfolio purposes. All rights reserved.

---

<p align="center">
  Built with ❤️ by the EventSphere Team
</p>
