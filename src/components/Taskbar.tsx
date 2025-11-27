import React, { useState, useEffect } from 'react';
import StartMenu from './StartMenu';
import startButtonImg from '../assets/xp_start_button_1764252000140.png';

interface TaskbarProps {
    openWindows: { id: number; title: string; minimized: boolean; icon?: string }[];
    activeWindowId: number | null;
    onWindowClick: (id: number) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ openWindows, activeWindowId, onWindowClick }) => {
    const [isStartOpen, setIsStartOpen] = useState(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '30px',
            background: 'linear-gradient(to bottom, #1F50B5 0%, #245DDA 4%, #245DDA 50%, #1F50B5 100%)',
            display: 'flex',
            alignItems: 'center',
            zIndex: 9999,
            borderTop: '1px solid #3E75CF',
            userSelect: 'none'
        }}>
            <StartMenu isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} />

            {/* Start Button */}
            <div
                onClick={() => setIsStartOpen(!isStartOpen)}
                style={{
                    width: '100px',
                    height: '30px',
                    backgroundImage: `url(${startButtonImg})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left center',
                    cursor: 'pointer',
                    marginRight: '6px',
                    flexShrink: 0,
                    transition: 'filter 0.1s',
                }}
                onMouseDown={(e) => e.currentTarget.style.filter = 'brightness(0.9)'}
                onMouseUp={(e) => e.currentTarget.style.filter = 'brightness(1)'}
                onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
            />

            {/* Task Area */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '5px',
                gap: '2px'
            }}>
                {openWindows.map((window) => (
                    <div
                        key={window.id}
                        onClick={() => onWindowClick(window.id)}
                        style={{
                            width: '150px',
                            height: '24px',
                            backgroundColor: activeWindowId === window.id ? '#1F50B5' : '#3C81F3',
                            borderRadius: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 5px',
                            cursor: 'pointer',
                            color: 'white',
                            fontSize: '11px',
                            boxShadow: activeWindowId === window.id
                                ? 'inset 1px 1px 2px rgba(0,0,0,0.5)'
                                : 'inset 1px 1px 0 rgba(255,255,255,0.2), 1px 1px 1px rgba(0,0,0,0.3)',
                            opacity: window.minimized ? 0.8 : 1
                        }}
                    >
                        <div style={{
                            width: '16px',
                            height: '16px',
                            marginRight: '5px',
                            backgroundImage: window.icon ? `url(${window.icon})` : 'none',
                            backgroundColor: window.icon ? 'transparent' : '#ccc',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat'
                        }} />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {window.title}
                        </span>
                    </div>
                ))}
            </div>

            {/* System Tray */}
            <div style={{
                width: '100px',
                height: '100%',
                backgroundColor: '#0B77E9',
                borderLeft: '1px solid #1042AF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '11px',
                padding: '0 10px',
                boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.2)'
            }}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
};

export default Taskbar;
