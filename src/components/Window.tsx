import React, { useState, useRef, useEffect } from 'react';

interface WindowProps {
    id: number;
    title: string;
    children: React.ReactNode;
    isActive: boolean;
    isMinimized: boolean;
    onClose: () => void;
    onMinimize: () => void;
    onFocus: () => void;
    initialPosition?: { x: number; y: number };
}

const Window: React.FC<WindowProps> = ({
    // id, // Unused but kept in props interface for clarity
    title,
    children,
    isActive,
    isMinimized,
    onClose,
    onMinimize,
    onFocus,
    initialPosition = { x: 100, y: 100 }
}) => {
    const [position, setPosition] = useState(() => {
        if (window.innerWidth < 768) {
            return {
                x: 5, // Small margin from left
                y: 20 // Closer to top
            };
        }
        return initialPosition;
    });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isMaximized, setIsMaximized] = useState(false);
    const windowRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        onFocus();
        if (e.button !== 0) return; // Only left click
        if (isMaximized) return;
        setIsDragging(true);
        const rect = windowRef.current?.getBoundingClientRect();
        if (rect) {
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        onFocus();
        if (isMaximized) return;
        const touch = e.touches[0];
        setIsDragging(true);
        const rect = windowRef.current?.getBoundingClientRect();
        if (rect) {
            setDragOffset({
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            });
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                setPosition({
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y
                });
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (isDragging) {
                const touch = e.touches[0];
                setPosition({
                    x: touch.clientX - dragOffset.x,
                    y: touch.clientY - dragOffset.y
                });
                e.preventDefault(); // Prevent scrolling while dragging window
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const handleTouchEnd = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, dragOffset]);

    if (isMinimized) return null;

    const isMobile = window.innerWidth < 768;

    return (
        <div
            ref={windowRef}
            onMouseDown={() => onFocus()}
            style={{
                position: 'absolute',
                left: isMaximized ? 0 : position.x,
                top: isMaximized ? 0 : position.y,
                width: isMaximized ? '100vw' : (isMobile ? 'calc(100vw - 20px)' : 'min(600px, 95vw)'),
                height: isMaximized ? 'calc(100vh - 30px)' : (isMobile ? 'calc(100vh - 80px)' : 'min(400px, 80vh)'),
                backgroundColor: '#0055EA',
                border: isMaximized ? 'none' : '1px solid #00138C',
                borderTopLeftRadius: isMaximized ? 0 : '8px',
                borderTopRightRadius: isMaximized ? 0 : '8px',
                boxShadow: isActive ? '2px 2px 10px rgba(0,0,0,0.5)' : '1px 1px 5px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                zIndex: isActive ? 100 : 1,
                padding: '3px'
            }}
        >
            {/* Title Bar */}
            <div
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                style={{
                    height: '30px',
                    background: isActive
                        ? 'linear-gradient(to bottom, #0058EE 0%, #3593FF 4%, #288EFF 18%, #127DFF 44%, #0369FC 100%)'
                        : 'linear-gradient(to bottom, #7697E7 0%, #7E9EE3 3%, #94AFED 6%, #97B4F3 8%, #82A5E4 14%, #7C9FE2 17%, #7996DE 25%, #7B99E1 56%, #82A9E9 81%, #80A5E7 89%, #7B96E1 94%, #7A93DF 97%, #ABBAE3 100%)',
                    borderTopLeftRadius: '5px',
                    borderTopRightRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 5px',
                    cursor: 'default',
                    userSelect: 'none'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', color: 'white', fontWeight: 'bold', fontSize: '13px', textShadow: '1px 1px 1px black' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: 'transparent', marginRight: '5px' }}>
                        {/* Icon placeholder */}
                    </div>
                    {title}
                </div>

                <div style={{ display: 'flex', gap: '2px', paddingRight: '2px' }}>
                    <button
                        onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                        style={{
                            width: '21px',
                            height: '21px',
                            background: 'linear-gradient(180deg, #8EAEE6 0%, #6C93E2 50%, #466CC5 50%, #6C93E2 100%)',
                            border: '1px solid #FFF',
                            borderRadius: '3px',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            color: 'white',
                            cursor: 'pointer',
                            boxShadow: 'inset 1px 1px 0px rgba(255,255,255,0.3)',
                            textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
                        }}
                    >_</button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
                        style={{
                            width: '21px',
                            height: '21px',
                            background: 'linear-gradient(180deg, #8EAEE6 0%, #6C93E2 50%, #466CC5 50%, #6C93E2 100%)',
                            border: '1px solid #FFF',
                            borderRadius: '3px',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            color: 'white',
                            cursor: 'pointer',
                            boxShadow: 'inset 1px 1px 0px rgba(255,255,255,0.3)',
                            textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
                        }}
                    >{isMaximized ? '❐' : '□'}</button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        style={{
                            width: '21px',
                            height: '21px',
                            background: 'linear-gradient(180deg, #E67E73 0%, #E35043 50%, #D12F19 50%, #E35043 100%)',
                            border: '1px solid #FFF',
                            borderRadius: '3px',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            color: 'white',
                            cursor: 'pointer',
                            boxShadow: 'inset 1px 1px 0px rgba(255,255,255,0.3)',
                            textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
                        }}
                    >X</button>
                </div>
            </div>

            {/* Content Area */}
            {/* Content Area Wrapper (Beige) */}
            <div style={{
                flex: 1,
                backgroundColor: '#ECE9D8',
                padding: '3px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                {/* Actual Content (White) */}
                <div style={{
                    flex: 1,
                    backgroundColor: 'white',
                    border: '1px solid #828790',
                    overflow: 'auto',
                    position: 'relative'
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Window;
