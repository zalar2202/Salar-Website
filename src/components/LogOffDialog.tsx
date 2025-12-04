import React from 'react';
import logOffIcon from '../assets/xp_icon_logoff.png';
import switchUserBtn from '../assets/xp_btn_switchuser.png';
import logOffBtn from '../assets/xp_btn_logoff.png';

interface LogOffDialogProps {
    onCancel: () => void;
    onLogOff: () => void;
    onSwitchUser: () => void;
}

const LogOffDialog: React.FC<LogOffDialogProps> = ({ onCancel, onLogOff, onSwitchUser }) => {
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
                width: '350px',
                backgroundColor: '#003399',
                border: '1px solid #fff',
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
                        background: 'linear-gradient(to right, #003399 0%, #0054E3 50%, #003399 100%)',
                        height: '42px'
                    }}>
                        <span style={{
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            textShadow: '1px 1px 1px rgba(0,0,0,0.3)',
                            fontFamily: 'Franklin Gothic Medium, Arial, sans-serif'
                        }}>
                            Log Off Windows
                        </span>
                        <div style={{
                            width: '25px',
                            height: '25px',
                            backgroundImage: `url(${logOffIcon})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.9
                        }} />
                    </div>

                    {/* Body */}
                    <div style={{
                        background: 'linear-gradient(to bottom, #D6DFF7 0%, #F2F5FE 100%)',
                        padding: '25px 35px 15px 35px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        borderTop: '2px solid #E68B2C'
                    }}>
                        {/* Buttons Row */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'flex-start',
                            width: '100%'
                        }}>
                            {/* Switch User Button */}
                            <div className="logoff-btn" onClick={onSwitchUser}>
                                <div className="logoff-icon-wrapper">
                                    <img src={switchUserBtn} alt="Switch User" className="logoff-icon" />
                                </div>
                                <span className="logoff-label">Switch User</span>
                            </div>

                            {/* Log Off Button */}
                            <div className="logoff-btn" onClick={onLogOff}>
                                <div className="logoff-icon-wrapper">
                                    <img src={logOffBtn} alt="Log Off" className="logoff-icon" />
                                </div>
                                <span className="logoff-label">Log Off</span>
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
                .logoff-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    cursor: pointer;
                    width: 80px;
                }
                .logoff-icon-wrapper {
                    width: 45px;
                    height: 45px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.1s;
                }
                .logoff-icon {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 50%; /* Clip black corners if square */
                }
                
                .logoff-btn:hover .logoff-icon-wrapper {
                    transform: translateY(-2px);
                }
                .logoff-label {
                    font-size: 11px;
                    color: #000;
                    font-family: Tahoma, sans-serif;
                }
            `}</style>
        </div>
    );
};

export default LogOffDialog;
