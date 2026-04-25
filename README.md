# ⚡ WebPFlow | Studio Edition

[![Live Demo](https://img.shields.io/badge/Live-Demo-2dd4bf?style=for-the-badge&logo=vercel)](https://web-p-flow.vercel.app/)

WebPFlow is a premium, high-performance image optimization suite designed for developers and designers who demand precision and privacy. Built with a "Studio Engine" philosophy, it performs heavy-duty image transformations entirely on the client-side using advanced browser APIs.

![WebPFlow Studio](/public/favicon.png)

## 🚀 Key Features

- **Multi-Core Studio Engine**: Utilizes Web Workers and `OffscreenCanvas` to process massive batches of images in the background without freezing the UI.
*   **Three-Phase Pipeline**:
    1.  **Intake (Upload)**: Drag-and-drop support for all major image formats.
    2.  **Engine (Configure)**: Real-time adjustment of quality, dimensions, and formats.
    3.  **Output (Export)**: Intelligent bulk download as a structured ZIP archive.
- **Quality Review Hub**: Full-screen "Before & After" comparison tool with precision slider to verify optimization fidelity.
- **Studio History**: Persistent local storage via **IndexedDB**, allowing you to access and manage past optimizations even after a page refresh.
- **Privacy First**: 100% Client-Side. Your images never touch a server. Processing is done entirely within your browser's private sandbox.
- **Performance Optimized**: Achieves top-tier Core Web Vitals with lazy-loaded modules, font preloading, and critical CSS inlining.

## 🛠️ Technology Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Utility-First Design)
- **Animations**: Framer Motion (Fluid UI transitions)
- **Architecture**:
  - **Web Workers**: For non-blocking image processing.
  - **IndexedDB**: For persistent local asset storage.
  - **JSZip**: For client-side archive generation.
  - **React Helmet Async**: For dynamic, step-based SEO management.

## 📦 Getting Started

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/your-repo/webp-flow.git
    cd webp-flow
    npm install
    ```
2.  **Development Mode**:
    ```bash
    npm run dev
    ```
3.  **Production Build**:
    ```bash
    npm run build
    npm run preview
    ```

## 📈 Performance Benchmarks

- **FCP / LCP**: Optimized for <1.5s on high-speed connections via resource pre-fetching and critical-path inlining.
- **Processing Speed**: Up to 4 images processed concurrently using multithreaded pipelines.
- **Layout Shift (CLS)**: Zero cumulative layout shift through rigid container management.

---

Designed with ❤️ for the Modern Web. 100% Private. 100% Performance.
