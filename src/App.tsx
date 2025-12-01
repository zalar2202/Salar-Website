import { useState } from 'react';
import './App.css';
import Taskbar from './components/Taskbar';
import Desktop from './components/Desktop';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import Notepad from './components/apps/Notepad';
import InternetExplorer from './components/apps/InternetExplorer';
import Email from './components/apps/Email';
import Minesweeper from './components/apps/Minesweeper';
import Calculator from './components/apps/Calculator';

// Assets
import myComputerIcon from './assets/xp_my_computer_icon.png';
import ieIcon from './assets/xp_ie_icon.png';
import notepadIcon from './assets/xp_notepad_icon.png';
import folderIcon from './assets/xp_folder_icon.png';
import recycleBinEmptyIcon from './assets/xp_recycle_bin_empty.png';
import emailIcon from './assets/xp_email_icon.png';
import minesweeperIcon from './assets/xp_minesweeper_icon.png';
import calculatorIcon from './assets/xp_calculator_icon.png';
// Recycle bin - using empty icon by default
const recycleBinIcon = recycleBinEmptyIcon;

interface WindowState {
  id: number;
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  icon?: string;
}

function App() {
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 1,
      title: 'My Computer',
      content: (
        <div style={{ padding: '20px', fontFamily: 'Tahoma, sans-serif' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <img src={myComputerIcon} style={{ width: '32px', height: '32px' }} />
            <h1 style={{ fontSize: '24px', fontWeight: 'normal', margin: 0 }}>Salar XP</h1>
          </div>
          <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
            I'm Salar, a multidisciplinary developer focused on web engineering, automation, and infrastructure.
            I build reliable systems, deploy scalable applications, and solve complex technical problems across
            the full stack—from WordPress and Next.js to Docker, VPS orchestration, and AI-powered workflows.
            My work is fast, practical, and execution-driven, with a clear focus on stability, performance,
            and real-world usability.
          </p>
          <hr style={{ margin: '15px 0', border: '0', borderTop: '1px solid #ccc' }} />
          <p>Feel free to explore the desktop, open applications, and drag windows around.</p>
          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            <li>Double-click icons to open programs.</li>
            <li>Use the Start Menu to access more options.</li>
            <li>Try the Notepad application!</li>
          </ul>
        </div>
      ),
      isOpen: true,
      isMinimized: false,
      zIndex: 1,
      icon: myComputerIcon
    },
    {
      id: 2,
      title: 'My Documents',
      content: (
        <div style={{ padding: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', width: '60px' }}>
            <img src={folderIcon} style={{ width: '32px', height: '32px' }} />
            <div style={{ fontSize: '11px' }}>Resume</div>
          </div>
          <div style={{ textAlign: 'center', width: '60px' }}>
            <img src={folderIcon} style={{ width: '32px', height: '32px' }} />
            <div style={{ fontSize: '11px' }}>Projects</div>
          </div>
          <div style={{ textAlign: 'center', width: '60px' }}>
            <img src={folderIcon} style={{ width: '32px', height: '32px' }} />
            <div style={{ fontSize: '11px' }}>Photos</div>
          </div>
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      icon: folderIcon
    },
    {
      id: 3,
      title: 'Internet Explorer',
      content: <InternetExplorer />,
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      icon: ieIcon
    },
    {
      id: 4,
      title: 'Notepad',
      content: <Notepad initialContent="Welcome to Notepad!" />,
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      icon: notepadIcon
    },
    {
      id: 5,
      title: 'Outlook Express',
      content: <Email />,
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      icon: emailIcon
    },
    {
      id: 6,
      title: 'Minesweeper',
      content: <Minesweeper />,
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      icon: minesweeperIcon
    },
    {
      id: 7,
      title: 'Calculator',
      content: <Calculator />,
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      icon: calculatorIcon
    }
  ]);

  const [activeWindowId, setActiveWindowId] = useState<number | null>(1);
  const [nextZIndex, setNextZIndex] = useState(2);
  const [selectedIconId, setSelectedIconId] = useState<number | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const handleOpenWindow = (id: number) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, isOpen: true, isMinimized: false, zIndex: nextZIndex };
      }
      return w;
    }));
    setActiveWindowId(id);
    setNextZIndex(prev => prev + 1);
  };

  const handleCloseWindow = (id: number) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, isOpen: false };
      }
      return w;
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const handleMinimizeWindow = (id: number) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, isMinimized: true };
      }
      return w;
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const handleFocusWindow = (id: number) => {
    if (activeWindowId === id) return;
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, zIndex: nextZIndex, isMinimized: false };
      }
      return w;
    }));
    setActiveWindowId(id);
    setNextZIndex(prev => prev + 1);
  };

  const handleTaskbarClick = (id: number) => {
    const win = windows.find(w => w.id === id);
    if (win?.isMinimized || activeWindowId !== id) {
      handleFocusWindow(id);
    } else {
      handleMinimizeWindow(id);
    }
  }

  const handleStartMenuItemClick = (action: string) => {
    switch (action) {
      case 'internet-explorer':
        handleOpenWindow(3);
        break;
      case 'email':
        handleOpenWindow(5);
        break;
      case 'my-computer':
        handleOpenWindow(1);
        break;
      case 'my-documents':
        handleOpenWindow(2);
        break;
      case 'minesweeper':
        handleOpenWindow(6);
        break;
      case 'calculator':
        handleOpenWindow(7);
        break;
      case 'paint':
      case 'notepad':
        handleOpenWindow(4);
        break;

      default:
        console.log('Unknown action:', action);
    }
  };

  const [iconPositions, setIconPositions] = useState<Record<number, { x: number; y: number }>>(() => {
    const isMobile = window.innerWidth < 768;
    const spacing = isMobile ? 90 : 100;
    const startX = isMobile ? 10 : 20;
    const startY = isMobile ? 10 : 20;

    return {
      1: { x: startX, y: startY },
      2: { x: startX, y: startY + spacing },
      3: { x: startX, y: startY + spacing * 2 },
      4: { x: startX, y: startY + spacing * 3 },
      5: { x: startX, y: startY + spacing * 4 },
    };
  });

  const desktopIcons = [
    { id: 1, label: 'My Computer', icon: myComputerIcon },
    { id: 2, label: 'My Documents', icon: folderIcon },
    { id: 3, label: 'Internet Explorer', icon: ieIcon },
    { id: 4, label: 'Notepad', icon: notepadIcon },
    { id: 5, label: 'Recycle Bin', icon: recycleBinIcon },
  ];

  const handleIconPositionChange = (iconId: number, position: { x: number; y: number }) => {
    setIconPositions(prev => ({
      ...prev,
      [iconId]: position
    }));
  };

  return (
    <>
      <Desktop onBackgroundClick={() => { setSelectedIconId(null); setIsStartMenuOpen(false); }}>
        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.id}
            label={icon.label}
            icon={icon.icon}
            selected={selectedIconId === icon.id}
            position={iconPositions[icon.id]}
            onPositionChange={(pos) => handleIconPositionChange(icon.id, pos)}
            onClick={(e) => { e?.stopPropagation(); setSelectedIconId(icon.id); }}
            onDoubleClick={() => {
              // Map icon IDs to window IDs
              if (icon.id <= 4) handleOpenWindow(icon.id);
            }}
          />
        ))}

        {windows.map(win => (
          win.isOpen && (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              isActive={activeWindowId === win.id}
              isMinimized={win.isMinimized}
              onClose={() => handleCloseWindow(win.id)}
              onMinimize={() => handleMinimizeWindow(win.id)}
              onFocus={() => handleFocusWindow(win.id)}
              initialPosition={{ x: 50 + (win.id * 20), y: 50 + (win.id * 20) }}
            >
              {win.content}
            </Window>
          )
        ))}
      </Desktop>

      <Taskbar
        openWindows={windows.filter(w => w.isOpen).map(w => ({ id: w.id, title: w.title, minimized: w.isMinimized, icon: w.icon }))}
        activeWindowId={activeWindowId}
        onWindowClick={handleTaskbarClick}
        onStartMenuItemClick={handleStartMenuItemClick}
        isStartOpen={isStartMenuOpen}
        setIsStartOpen={setIsStartMenuOpen}
      />
    </>
  );
}

export default App;
