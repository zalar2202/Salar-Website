import React, { useEffect } from 'react';
import { playSystemSound } from '../utils/soundManager';

interface AuthenticPopupProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string;
    type?: 'error' | 'info' | 'warning';
}

const AuthenticPopup: React.FC<AuthenticPopupProps> = ({
    isOpen,
    onClose,
    title = 'Error',
    message,
    type = 'error'
}) => {
    if (!isOpen) return null;

    // Play sound when popup opens
    useEffect(() => {
        if (isOpen) {
            if (type === 'error') {
                playSystemSound('error');
            } else {
                playSystemSound('ding');
            }
        }
    }, [isOpen, type]);

    // XP System Sounds (simulated visual feel)

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent overlay to block clicks
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Tahoma, sans-serif'
        }}
            onClick={(e) => {
                // Play sound effect here if we had one
                e.stopPropagation();
            }}
        >
            <div style={{
                width: '350px',
                backgroundColor: '#ECE9D8',
                border: '1px solid #0055EA',
                borderRadius: '3px',
                boxShadow: '2px 2px 10px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                userSelect: 'none'
            }}>
                {/* Title Bar */}
                <div style={{
                    height: '30px',
                    background: 'linear-gradient(to right, #0058EE, #3A93FF 3%, #288EFF 6%, #0069FC)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 5px',
                    borderTopLeftRadius: '2px',
                    borderTopRightRadius: '2px',
                }}>
                    <span style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '13px',
                        textShadow: '1px 1px #000'
                    }}>
                        {title}
                    </span>
                    <button
                        onClick={onClose}
                        style={{
                            width: '21px',
                            height: '21px',
                            backgroundColor: '#D8402A',
                            border: '1px solid #fff',
                            borderRadius: '3px',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            padding: 0,
                            lineHeight: 1,
                            boxShadow: 'inset 1px 1px rgba(255,255,255,0.5)'
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div style={{
                    padding: '15px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start'
                }}>
                    {/* Icon */}
                    <div style={{ marginRight: '15px' }}>
                        {type === 'error' && (
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: '#FF0000',
                                border: '2px solid #800000',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
                                background: 'radial-gradient(circle at 30% 30%, #ff4d4d, #ff0000)'
                            }}>
                                ×
                            </div>
                        )}
                        {type === 'info' && (
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: '#4060FF',
                                border: '2px solid #000080',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                fontStyle: 'italic',
                                fontFamily: 'serif',
                                boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
                                background: 'radial-gradient(circle at 30% 30%, #6680ff, #0040ff)'
                            }}>
                                i
                            </div>
                        )}
                        {type === 'warning' && (
                            <div style={{
                                width: '32px',
                                height: '32px',
                                // Triangle shape using borders is tricky with gradient, using a simpler approach
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '32px',
                                color: '#FFCC00',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                            }}>
                                ⚠
                            </div>
                        )}
                    </div>

                    {/* Message */}
                    <div style={{
                        flex: 1,
                        fontSize: '12px',
                        color: '#000',
                        paddingTop: '5px'
                    }}>
                        {message}
                    </div>
                </div>

                {/* Button Area */}
                <div style={{
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            minWidth: '75px',
                            padding: '3px 10px',
                            backgroundColor: '#ECE9D8',
                            border: '1px solid #003C74',
                            borderRadius: '3px',
                            color: '#000',
                            fontSize: '12px',
                            cursor: 'pointer',
                            boxShadow: 'inset 1px 1px #fff, 1px 1px 2px rgba(0,0,0,0.2)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = 'inset 1px 1px #fff, 0 0 3px #E6D6AE';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'inset 1px 1px #fff, 1px 1px 2px rgba(0,0,0,0.2)';
                        }}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthenticPopup;
