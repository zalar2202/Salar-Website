import React from 'react';

interface DesktopProps {
    children: React.ReactNode;
    onBackgroundClick: () => void;
}

const Desktop: React.FC<DesktopProps> = ({ children, onBackgroundClick }) => {
    return (
        <div
            onClick={onBackgroundClick}
            style={{
                flex: 1,
                position: 'relative',
                overflow: 'visible',
                // Background is handled by body in index.css, but we can override here if needed
                width: '100%',
                height: 'calc(100% - 30px)', // Subtract taskbar height
            }}
        >
            {children}
        </div>
    );
};

export default Desktop;
