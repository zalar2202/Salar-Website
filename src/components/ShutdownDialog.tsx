import React from 'react';
import turnOffIcon from '../assets/xp_icon_turnoff.png';
import standbyBtn from '../assets/xp_btn_standby.png';
import turnOffBtn from '../assets/xp_btn_turnoff.png';
import restartBtn from '../assets/xp_btn_restart.png';
import { playSystemSound } from '../utils/soundManager';

interface ShutdownDialogProps {
    onCancel: () => void;
    onShutdown: () => void;
    onRestart: () => void;
    onStandby: () => void;
}

const ShutdownDialog: React.FC<ShutdownDialogProps> = ({ onCancel, onShutdown, onRestart, onStandby }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Tahoma, sans-serif'
        }}>
            {/* Dialog Box */}
            <div style={{
                width: '408px', // Authentic width
                backgroundColor: '#003399',
                border: '1px solid #fff', // Outer white border
                borderRadius: '3px',
                boxShadow: '0 0 15px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative'
            }}>
                {/* Inner Blue Border */}
                <div style={{
                    border: '2px solid #003399',
                    borderRadius: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '6px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'linear-gradient(to right, #003399 0%, #0054E3 50%, #003399 100%)', // Authentic header gradient
                        height: '42px'
                    }}>
                        <span style={{
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            textShadow: '1px 1px 1px rgba(0,0,0,0.3)',
                            fontFamily: 'Franklin Gothic Medium, Arial, sans-serif'
                        }}>
                            Turn off computer
                        </span>
                        <div style={{
                            width: '25px',
                            height: '25px',
                            backgroundImage: `url(${turnOffIcon})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.9
                        }} />
                    </div>

                    {/* Body */}
                    <div style={{
                        background: 'linear-gradient(to bottom, #D6DFF7 0%, #F2F5FE 100%)', // Authentic body gradient
                        padding: '25px 35px 15px 35px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        borderTop: '2px solid #E68B2C' // The orange line
                    }}>
                        {/* Buttons Row */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            width: '100%'
                        }}>
                            {/* Standby Button */}
                            <div className="shutdown-btn" onClick={onStandby}>
                                <div className="shutdown-icon-wrapper">
                                    <img src={standbyBtn} alt="Standby" className="shutdown-icon" />
                                </div>
                                <span className="shutdown-label">Stand By</span>
                            </div>

                            {/* Turn Off Button */}
                            <div className="shutdown-btn" onClick={() => { playSystemSound('shutdown'); onShutdown(); }}>
                                <div className="shutdown-icon-wrapper">
                                    <img src={turnOffBtn} alt="Turn Off" className="shutdown-icon" />
                                </div>
                                <span className="shutdown-label">Turn Off</span>
                            </div>

                            {/* Restart Button */}
                            <div className="shutdown-btn" onClick={() => { playSystemSound('shutdown'); onRestart(); }}>
                                <div className="shutdown-icon-wrapper">
                                    <img src={restartBtn} alt="Restart" className="shutdown-icon" />
                                </div>
                                <span className="shutdown-label">Restart</span>
                            </div>
                        </div>

                        {/* Footer / Cancel Button */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '10px'
                        }}>
                            <button
                                onClick={onCancel}
                                style={{
                                    padding: '3px 20px',
                                    backgroundColor: '#ECE9D8',
                                    border: '1px solid #003C74',
                                    borderRadius: '3px',
                                    color: '#000',
                                    fontSize: '11px',
                                    cursor: 'pointer',
                                    boxShadow: 'inset 1px 1px #fff, 1px 1px 2px rgba(0,0,0,0.2)',
                                    fontFamily: 'Tahoma, sans-serif'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'inset 1px 1px #fff, 0 0 3px #E6D6AE'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'inset 1px 1px #fff, 1px 1px 2px rgba(0,0,0,0.2)'}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .shutdown-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    cursor: pointer;
                    width: 80px;
                }
                .shutdown-icon-wrapper {
                    width: 45px;
                    height: 45px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.1s;
                }
                .shutdown-icon {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 50%; /* Clip black corners if square */
                }
                
                .shutdown-btn:hover .shutdown-icon-wrapper {
                    transform: translateY(-2px);
                }
                .shutdown-label {
                    font-size: 11px;
                    color: #000;
                    font-family: Tahoma, sans-serif;
                }
            `}</style>
        </div>
    );
};

export default ShutdownDialog;
