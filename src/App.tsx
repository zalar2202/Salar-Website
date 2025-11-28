import { useState } from 'react';
import './App.css';
import Taskbar from './components/Taskbar';
import Desktop from './components/Desktop';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import Notepad from './components/apps/Notepad';
import InternetExplorer from './components/apps/InternetExplorer';
import Email from './components/apps/Email';

// Assets
import myComputerIcon from './assets/xp_my_computer_authentic.png';
import ieIcon from './assets/xp_ie_icon_1764251910162.png';
import notepadIcon from './assets/xp_notepad_icon_1764251925686.png';
import folderIcon from './assets/xp_folder_icon_1764251985048.png';
import recycleBinEmptyIcon from './assets/xp_recycle_bin_empty.png';
import emailIcon from './assets/xp_email_icon.png';
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
    }
  ]);

  const [activeWindowId, setActiveWindowId] = useState<number | null>(1);
  const [nextZIndex, setNextZIndex] = useState(2);
  const [selectedIconId, setSelectedIconId] = useState<number | null>(null);

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
      case 'notepad':
        handleOpenWindow(4);
        break;
      case 'my-computer':
        handleOpenWindow(1);
        break;
      case 'my-documents':
        handleOpenWindow(2);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const [iconPositions, setIconPositions] = useState<Record<number, { x: number; y: number }>>({
    1: { x: 20, y: 20 },
    2: { x: 20, y: 120 },
    3: { x: 20, y: 220 },
    4: { x: 20, y: 320 },
    5: { x: 20, y: 420 },
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
      <Desktop onBackgroundClick={() => setSelectedIconId(null)}>
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
      />
    </>
  );
}

export default App;
