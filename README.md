# Salar XP Portfolio

A nostalgic Windows XP-style portfolio website built with React, TypeScript, and Vite. This interactive desktop environment showcases a retro computing aesthetic with draggable icons, functional windows, and authentic XP styling.

![Salar XP Portfolio](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue) ![Vite](https://img.shields.io/badge/Vite-7.2.4-purple)

## ✨ Features

- **Authentic Windows XP Interface**: Classic blue taskbar, Start menu, and window chrome
- **Draggable Desktop Icons**: Click and drag icons to reposition them anywhere on the desktop
- **Interactive Windows**: Open, close, minimize, and drag windows around the desktop
- **Functional Applications**:
  - **My Computer (Welcome)**: Personal bio and introduction
  - **My Documents**: Portfolio content and file shortcuts
  - **Notepad**: A working text editor
  - **Internet Explorer**: Browser window (placeholder)
- **Start Menu**: Authentic XP-style menu with pinned apps and system folders
- **Custom Wallpaper**: Personalized background with your name
- **Responsive Design**: Desktop icons and windows adapt to screen size

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/salar-xp-portfolio.git
cd salar-xp-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Customization

### Updating Personal Information

Edit the bio in `src/App.tsx`:
```tsx
<p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
  Your bio text here...
</p>
```

### Changing Desktop Icons

Icons are stored in `src/assets/`. Update the imports in `src/App.tsx`:
```tsx
import myComputerIcon from './assets/your-icon.png';
```

### Modifying Window Content

Window content is defined in the `windows` state array in `src/App.tsx`. Each window has:
- `id`: Unique identifier
- `title`: Window title bar text
- `content`: React component or JSX to display
- `icon`: Icon image path

## 📁 Project Structure

```
salar-xp-portfolio/
├── src/
│   ├── assets/          # Icons and images
│   ├── components/      # React components
│   │   ├── apps/        # Application components (Notepad, etc.)
│   │   ├── Desktop.tsx  # Desktop container
│   │   ├── DesktopIcon.tsx  # Draggable desktop icons
│   │   ├── StartMenu.tsx    # Start menu component
│   │   ├── Taskbar.tsx      # Bottom taskbar
│   │   └── Window.tsx       # Draggable window component
│   ├── App.tsx          # Main application logic
│   ├── index.css        # Global styles and XP theme
│   └── main.tsx         # Application entry point
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md           # This file
```

## 🐳 Deploying to Coolify

1. Build the production bundle:
```bash
npm run build
```

2. In Coolify, create a new application:
   - Choose "Static Site" or "Dockerfile"
   - Point to your GitHub repository
   - Set build command: `npm install && npm run build`
   - Set output directory: `dist`

3. Configure environment variables if needed

4. Deploy!

## 🛠️ Technologies Used

- **React 18.3.1** - UI library
- **TypeScript 5.6.2** - Type safety
- **Vite 7.2.4** - Build tool and dev server
- **CSS3** - Styling with custom XP theme variables

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Salar Safayi**

A multidisciplinary developer focused on web engineering, automation, and infrastructure. I build reliable systems, deploy scalable applications, and solve complex technical problems across the full stack—from WordPress and Next.js to Docker, VPS orchestration, and AI-powered workflows.

## 🙏 Acknowledgments

- Inspired by the classic Windows XP interface
- Original concept inspired by [mitchivin.com](https://mitchivin.com)
- Icons sourced from IconArchive and custom generated assets

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/salar-xp-portfolio/issues).

---

Made with ❤️ and nostalgia for Windows XP
