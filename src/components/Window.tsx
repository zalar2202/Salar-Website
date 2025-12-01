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
    const windowRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        onFocus();
        if (e.button !== 0) return; // Only left click
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
                left: position.x,
                top: position.y,
                width: isMobile ? 'calc(100vw - 20px)' : 'min(600px, 95vw)',
                height: isMobile ? 'calc(100vh - 80px)' : 'min(400px, 80vh)',
                backgroundColor: '#ECE9D8',
                border: '1px solid #0055EA',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
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

                <div style={{ display: 'flex', gap: '2px' }}>
                    <button
                        onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                        style={{
                            width: '21px',
                            height: '21px',
                            backgroundColor: '#D6DFF7',
                            border: '1px solid white',
                            borderRadius: '3px',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            color: 'black',
                            cursor: 'pointer'
                        }}
                    >_</button>
                    <button
                        style={{
                            width: '21px',
                            height: '21px',
                            backgroundColor: '#D6DFF7',
                            border: '1px solid white',
                            borderRadius: '3px',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            color: 'black',
                            cursor: 'pointer'
                        }}
                    >□</button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        style={{
                            width: '21px',
                            height: '21px',
                            backgroundColor: '#E04F38',
                            border: '1px solid white',
                            borderRadius: '3px',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >X</button>
                </div>
            </div>

            {/* Content Area */}
            <div style={{
                flex: 1,
                backgroundColor: 'white',
                border: '1px solid #999',
                marginTop: '2px',
                overflow: 'auto',
                position: 'relative'
            }}>
                {children}
            </div>
        </div>
    );
};

export default Window;
