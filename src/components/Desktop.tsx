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
                width: '100%',
                height: 'calc(100% - 30px)',
            }}
        >
            {children}

            {/* Windows XP Style Logo Overlay */}
            <div style={{
                position: 'absolute',
                bottom: window.innerWidth < 768 ? '40px' : window.innerWidth < 1024 ? '45px' : '50px',
                right: window.innerWidth < 768 ? '10px' : window.innerWidth < 1024 ? '20px' : '30px',
                display: 'flex',
                alignItems: 'center',
                gap: window.innerWidth < 768 ? '5px' : '10px',
                pointerEvents: 'none',
                userSelect: 'none',
                transform: window.innerWidth < 768 ? 'scale(0.5)' : window.innerWidth < 1024 ? 'scale(0.75)' : 'scale(1)',
                transformOrigin: 'bottom right'
            }}>
                {/* Windows Logo */}
                <div style={{
                    width: '50px',
                    height: '50px',
                    display: 'grid',
                    gridTemplateColumns: '22px 22px',
                    gridTemplateRows: '22px 22px',
                    gap: '3px',
                    transform: 'perspective(200px) rotateY(-10deg)',
                }}>
                    <div style={{ background: '#F25022', borderRadius: '2px' }} />
                    <div style={{ background: '#7FBA00', borderRadius: '2px' }} />
                    <div style={{ background: '#00A4EF', borderRadius: '2px' }} />
                    <div style={{ background: '#FFB900', borderRadius: '2px' }} />
                </div>

                {/* Salar Text */}
                <div style={{
                    fontFamily: 'Franklin Gothic Medium, Arial, sans-serif',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: 'white',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 8px rgba(0,0,0,0.3)',
                    letterSpacing: '1px'
                }}>
                    Salar
                </div>
            </div>
        </div>
    );
};

export default Desktop;
