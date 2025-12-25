import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import { playSystemSound } from './utils/soundManager';

import myComputerIcon from './assets/xp_my_computer_icon.png';
import ieIcon from './assets/xp_ie_icon.png';
import notepadIcon from './assets/xp_notepad_icon.png';
import folderIcon from './assets/xp_folder_icon.png';
import recycleBinEmptyIcon from './assets/xp_recycle_bin_empty.png';
import emailIcon from './assets/xp_email_icon.png';
import minesweeperIcon from './assets/xp_minesweeper_icon.png';
import calculatorIcon from './assets/xp_calculator_icon.png';
import wmpIcon from './assets/xp_wmp_icon.png';
import solitaireIcon from './assets/xp_solitaire_icon.png';

// Lazy load apps
const Notepad = React.lazy(() => import('./components/apps/Notepad'));
const InternetExplorer = React.lazy(() => import('./components/apps/InternetExplorer'));
const Email = React.lazy(() => import('./components/apps/Email'));
const Minesweeper = React.lazy(() => import('./components/apps/Minesweeper'));
const Calculator = React.lazy(() => import('./components/apps/Calculator'));
const MyDocuments = React.lazy(() => import('./components/apps/MyDocuments'));
const MyComputer = React.lazy(() => import('./components/apps/MyComputer'));
const RecycleBin = React.lazy(() => import('./components/apps/RecycleBin'));
const Resume = React.lazy(() => import('./components/apps/Resume'));
const WindowsMediaPlayer = React.lazy(() => import('./components/apps/WindowsMediaPlayer'));
const Solitaire = React.lazy(() => import('./components/apps/Solitaire'));

// Loading Fallback Component
const AppLoadingData = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    color: '#000',
    fontFamily: 'Tahoma'
  }}>
    Loading...
  </div>
);
import AuthenticPopup from './components/AuthenticPopup';
import ShutdownDialog from './components/ShutdownDialog';
import LogOffDialog from './components/LogOffDialog';
import LoginScreen from './components/LoginScreen';
import TurnedOffScreen from './components/TurnedOffScreen';
import BootScreen from './components/BootScreen';

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
      content: <MyComputer />,
      isOpen: true,
      isMinimized: false,
      zIndex: 1,
      icon: myComputerIcon
    },
    {
      id: 2,
      title: 'My Documents',
      content: <MyDocuments />,
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
    },
    {
      id: 8,
      title: 'Recycle Bin',
      content: <RecycleBin />,
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      icon: recycleBinIcon
    },
    {
      id: 9,
      title: 'My Resume',
      content: <Resume />,
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      icon: notepadIcon // Using notepad icon for text file look
    },
    {
      id: 10,
      title: 'Windows Media Player',
      content: <WindowsMediaPlayer />,
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      icon: wmpIcon
    },
    {
      id: 11,
      title: 'Solitaire',
      content: <Solitaire />,
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      icon: solitaireIcon
    }
  ]);

  const [activeWindowId, setActiveWindowId] = useState<number | null>(1);
  const [nextZIndex, setNextZIndex] = useState(2);
  const [selectedIconId, setSelectedIconId] = useState<number | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  // System State
  const [systemState, setSystemState] = useState<'desktop' | 'logging_off' | 'logged_out' | 'shutting_down' | 'turned_off' | 'restarting_shutdown' | 'restarting_boot'>('desktop');

  // Restart Sequence Effect
  useEffect(() => {
    if (systemState === 'restarting_shutdown') {
      // Step 1: "Windows is shutting down..." for 2 seconds
      const timer1 = setTimeout(() => {
        setSystemState('restarting_boot');
      }, 2000);
      return () => clearTimeout(timer1);
    }

    if (systemState === 'restarting_boot') {
      // Step 2: Boot Screen for 4 seconds
      const timer2 = setTimeout(() => {
        setSystemState('logged_out'); // Land on Login Screen
      }, 4000);
      return () => clearTimeout(timer2);
    }
  }, [systemState]);

  // Initial Startup Sound
  useEffect(() => {
    // Play startup sound on initial load
    playSystemSound('startup');
  }, []);

  const [popupState, setPopupState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'error' | 'info' | 'warning';
  }>({
    isOpen: false,
    title: 'Error',
    message: '',
    type: 'error'
  });

  const handleShowPopup = (message: string, title: string = 'Error', type: 'error' | 'info' | 'warning' = 'error') => {
    setPopupState({
      isOpen: true,
      title,
      message,
      type
    });
  };

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
        handleShowPopup('Paint is not yet installed on this system.', 'Paint', 'info');
        break;
      case 'notepad':
        handleOpenWindow(4);
        break;
      case 'resume':
        handleOpenWindow(9);
        break;
      case 'media-player':
        handleOpenWindow(10);
        break;
      case 'solitaire':
        handleOpenWindow(11);
        break;
      case 'my-network-places':
        handleShowPopup('Network discovery is disabled by your administrator.', 'Network Error', 'error');
        break;
      case 'control-panel':
        handleShowPopup('Access to Control Panel is restricted.', 'System Restriction', 'warning');
        break;
      case 'printers':
        handleShowPopup('The printer spooler service is not running.', 'Printer Error', 'error');
        break;
      case 'help':
        handleShowPopup('Help and Support Center could not be started because a required component is missing.', 'Help and Support', 'error');
        break;
      case 'search':
        handleShowPopup('The search companion is currently unavailable.', 'Search', 'info');
        break;
      case 'run':
        handleShowPopup('This operation has been cancelled due to restrictions in effect on this computer.', 'Restrictions', 'error');
        break;

      case 'log-off':
        setSystemState('logging_off');
        break;
      case 'turn-off':
        setSystemState('shutting_down');
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
      9: { x: startX, y: startY + spacing * 4 }, // Resume

      // Column 2
      10: { x: startX + spacing, y: startY }, // Media Player
      11: { x: startX + spacing, y: startY + spacing }, // Solitaire
      8: { x: startX + spacing, y: startY + spacing * 2 }, // Recycle Bin
    };
  });

  const desktopIcons = [
    { id: 1, label: 'My Computer', icon: myComputerIcon },
    { id: 2, label: 'My Documents', icon: folderIcon },
    { id: 3, label: 'Internet Explorer', icon: ieIcon },
    { id: 4, label: 'Notepad', icon: notepadIcon },
    { id: 9, label: 'My Resume', icon: notepadIcon },
    { id: 10, label: 'Media Player', icon: wmpIcon },
    { id: 11, label: 'Solitaire', icon: solitaireIcon },
    { id: 8, label: 'Recycle Bin', icon: recycleBinIcon },
  ];

  const handleIconPositionChange = (iconId: number, position: { x: number; y: number }) => {
    setIconPositions(prev => ({
      ...prev,
      [iconId]: position
    }));
  };

  return (
    <>
      {/* System Screens */}
      {systemState === 'logged_out' && (
        <LoginScreen onLogin={() => { playSystemSound('startup'); setSystemState('desktop'); }} />
      )}

      {systemState === 'turned_off' && (
        <TurnedOffScreen onRestart={() => window.location.reload()} />
      )}

      {/* Desktop Environment (Grayscale when dialogs are open) */}
      <div style={{
        height: '100vh',
        width: '100vw',
        filter: (systemState === 'shutting_down' || systemState === 'logging_off') ? 'grayscale(100%)' : 'none',
        transition: 'filter 0.5s ease'
      }}>
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
                handleOpenWindow(icon.id);
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
                <React.Suspense fallback={<AppLoadingData />}>
                  {win.content}
                </React.Suspense>
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
      </div>

      {/* Dialog Overlays */}
      {systemState === 'shutting_down' && (
        <ShutdownDialog
          onCancel={() => setSystemState('desktop')}
          onShutdown={() => setSystemState('turned_off')}
          onRestart={() => setSystemState('restarting_shutdown')}
          onStandby={() => setSystemState('desktop')} // Just close for now
        />
      )}

      {/* Restarting Screens */}
      {systemState === 'restarting_shutdown' && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: '#003399',
          zIndex: 300000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Tahoma, sans-serif'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{
              fontFamily: 'Franklin Gothic Medium, Arial, sans-serif',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              fontStyle: 'italic'
            }}>
              Windows is shutting down...
            </div>
          </div>
        </div>
      )}

      {systemState === 'restarting_boot' && (
        <BootScreen />
      )}

      {systemState === 'logging_off' && (
        <LogOffDialog
          onCancel={() => setSystemState('desktop')}
          onLogOff={() => setSystemState('logged_out')}
          onSwitchUser={() => setSystemState('logged_out')}
        />
      )}

      <AuthenticPopup
        isOpen={popupState.isOpen}
        onClose={() => setPopupState(prev => ({ ...prev, isOpen: false }))}
        title={popupState.title}
        message={popupState.message}
        type={popupState.type}
      />
    </>
  );
}

export default App;
