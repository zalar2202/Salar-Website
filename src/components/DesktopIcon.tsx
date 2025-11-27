import React, { useState } from 'react';

interface DesktopIconProps {
    label: string;
    icon?: string;
    onDoubleClick: () => void;
    selected?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    position?: { x: number; y: number };
    onPositionChange?: (position: { x: number; y: number }) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
    label,
    icon,
    onDoubleClick,
    selected,
    onClick,
    position = { x: 0, y: 0 },
    onPositionChange
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button === 0) { // Left click only
            setIsDragging(true);
            setDragOffset({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
            e.preventDefault();
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && onPositionChange) {
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;
            onPositionChange({ x: newX, y: newY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, dragOffset]);

    return (
        <div
            onDoubleClick={onDoubleClick}
            onClick={onClick}
            onMouseDown={handleMouseDown}
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: '75px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: isDragging ? 'grabbing' : 'grab',
                padding: '5px',
                backgroundColor: selected ? 'rgba(11, 97, 255, 0.3)' : 'transparent',
                border: selected ? '1px dotted rgba(255, 255, 255, 0.5)' : '1px solid transparent',
                borderRadius: '3px',
                userSelect: 'none'
            }}
        >
            <div style={{
                width: '32px',
                height: '32px',
                marginBottom: '5px',
                backgroundImage: icon ? `url(${icon})` : 'none',
                backgroundColor: icon ? 'transparent' : '#ccc',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                position: 'relative',
                pointerEvents: 'none'
            }}>
                {!icon && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '1px solid #999', background: '#eee' }}></div>}
            </div>
            <span style={{
                color: 'white',
                fontSize: '11px',
                textAlign: 'center',
                textShadow: '1px 1px 1px black',
                backgroundColor: selected ? '#0B61FF' : 'transparent',
                padding: '0 2px',
                borderRadius: '2px',
                lineHeight: '1.2',
                pointerEvents: 'none'
            }}>
                {label}
            </span>
        </div>
    );
};

export default DesktopIcon;
