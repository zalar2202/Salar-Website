import React from 'react';

const BootScreen: React.FC = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'black',
            zIndex: 400000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Tahoma, sans-serif',
            cursor: 'none' // Hide cursor during boot
        }}>
            {/* Logo Area */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '50px'
            }}>
                {/* Windows Flag (CSS) */}
                <div style={{
                    width: '50px',
                    height: '50px',
                    display: 'grid',
                    gridTemplateColumns: '22px 22px',
                    gridTemplateRows: '22px 22px',
                    gap: '3px',
                    marginRight: '15px'
                }}>
                    <div style={{ background: '#F25022', borderRadius: '2px' }} />
                    <div style={{ background: '#7FBA00', borderRadius: '2px' }} />
                    <div style={{ background: '#00A4EF', borderRadius: '2px' }} />
                    <div style={{ background: '#FFB900', borderRadius: '2px' }} />
                </div>

                {/* Text */}
                <div style={{
                    fontFamily: 'Franklin Gothic Medium, Arial, sans-serif',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: 'white',
                    fontStyle: 'italic',
                    lineHeight: 1
                }}>
                    Microsoft <br />
                    <span style={{ fontSize: '48px', fontStyle: 'normal' }}>Windows</span>
                    <span style={{ fontSize: '28px', verticalAlign: 'super', marginLeft: '5px', color: '#FF6600' }}>xp</span>
                </div>
            </div>

            {/* Loading Bar Container */}
            <div style={{
                width: '200px',
                height: '14px',
                border: '2px solid #555',
                borderRadius: '4px',
                padding: '2px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'black'
            }}>
                {/* Moving Blue Bar */}
                <div className="boot-loading-bar" style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    gap: '2px'
                }}>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} style={{
                            width: '15px',
                            height: '100%',
                            background: 'linear-gradient(to bottom, #2D589E 0%, #6C95E0 20%, #2D589E 100%)',
                            borderRadius: '2px',
                            boxShadow: '0 0 2px rgba(255,255,255,0.5)'
                        }} />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes bootLoad {
                    0% { transform: translateX(-50px); }
                    100% { transform: translateX(200px); }
                }
                .boot-loading-bar {
                    position: absolute;
                    top: 2px;
                    left: 0;
                    width: 50px !important;
                    animation: bootLoad 2s linear infinite;
                }
            `}</style>

            {/* Copyright */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                color: 'white',
                fontSize: '12px'
            }}>
                Copyright © Microsoft Corporation
            </div>
        </div>
    );
};

export default BootScreen;
