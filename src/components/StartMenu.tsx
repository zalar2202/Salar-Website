import React from 'react';
import ieIcon from '../assets/xp_ie_icon_1764251910162.png';
import notepadIcon from '../assets/xp_notepad_icon_1764251925686.png';
import folderIcon from '../assets/xp_folder_icon_1764251985048.png';
import myComputerIcon from '../assets/xp_my_computer_icon_1764252098649.png';
import emailIcon from '../assets/xp_email_icon.png';
import userIcon from '../assets/xp_user_salar.png';
import logOffIcon from '../assets/xp_icon_logoff.png';
import turnOffIcon from '../assets/xp_icon_turnoff.png';
import networkIcon from '../assets/xp_network_icon.png';
import controlPanelIcon from '../assets/xp_control_panel_icon.png';
import printerIcon from '../assets/xp_printer_icon.png';
import helpIcon from '../assets/xp_help_icon.png';

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onItemClick: (item: string) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onItemClick }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '0',
            width: 'min(380px, 90vw)',
            height: 'min(480px, 80vh)',
            backgroundColor: '#fff',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            boxShadow: '2px -2px 5px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10000,
            fontFamily: 'Tahoma, sans-serif'
        }}>
            {/* Header */}
            <div style={{
                height: '60px',
                background: 'linear-gradient(to bottom, #1F50B5, #4E8FE7)',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '3px',
                    border: '2px solid white',
                    marginRight: '10px',
                    backgroundColor: '#D8E4F8',
                    backgroundImage: `url(${userIcon})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
                <span>Salar</span>
            </div>

            {/* Body */}
            <div style={{
                flex: 1,
                display: 'flex',
                borderLeft: '1px solid #3A6EA5',
                borderRight: '1px solid #3A6EA5',
            }}>
                {/* Left Column (Pinned/Recent Apps) */}
                <div style={{
                    flex: 1,
                    backgroundColor: 'white',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px'
                }}>
                    {[
                        { name: 'Internet Explorer', icon: ieIcon, desc: 'Browse the Internet', action: 'internet-explorer' },
                        { name: 'E-mail', icon: emailIcon, desc: 'E-mail program', action: 'email' },
                        { name: 'Notepad', icon: notepadIcon, desc: 'Text Editor', action: 'notepad' },
                    ].map((app, i) => (
                        <div key={i} style={{
                            padding: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: '#333'
                        }}
                            onClick={() => onItemClick(app.action)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#316AC5'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <div style={{
                                width: '32px',
                                height: '32px',
                                marginRight: '8px',
                                backgroundImage: app.icon ? `url(${app.icon})` : 'none',
                                backgroundColor: app.icon ? 'transparent' : '#ccc',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center'
                            }} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{app.name}</span>
                                <span style={{ fontSize: '10px', color: '#666' }}>{app.desc}</span>
                            </div>
                        </div>
                    ))}

                    <div style={{ marginTop: 'auto', borderTop: '1px solid #ccc', paddingTop: '10px', textAlign: 'center' }}>
                        <div style={{ padding: '5px', fontWeight: 'bold' }}>All Programs</div>
                    </div>
                </div>

                {/* Right Column (System Folders) */}
                <div style={{
                    flex: 1,
                    backgroundColor: '#D3E5FA',
                    borderLeft: '1px solid #95BDE7',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px'
                }}>
                    {[
                        { name: 'My Documents', icon: folderIcon, bold: true, action: 'my-documents' },
                        { name: 'My Computer', icon: myComputerIcon, bold: true, action: 'my-computer' },
                        { name: 'My Network Places', icon: networkIcon, bold: false, action: null },
                        { name: 'Control Panel', icon: controlPanelIcon, bold: false, action: null },
                        { name: 'Printers and Faxes', icon: printerIcon, bold: false, action: null },
                        { name: 'Help and Support', icon: helpIcon, bold: false, action: null },
                        { name: 'Search', icon: folderIcon, bold: false, action: null },
                        { name: 'Run...', icon: folderIcon, bold: false, action: null }
                    ].map((item, i) => (
                        <div key={i} style={{
                            padding: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: '#1F3C6D',
                            fontSize: '11px',
                            fontWeight: item.bold ? 'bold' : 'normal'
                        }}
                            onClick={() => item.action && onItemClick(item.action)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#316AC5';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#1F3C6D';
                            }}
                        >
                            <div style={{
                                width: '20px',
                                height: '20px',
                                marginRight: '8px',
                                backgroundImage: item.icon ? `url(${item.icon})` : 'none',
                                backgroundColor: item.icon ? 'transparent' : '#99B4D1',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center'
                            }} />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div style={{
                height: '40px',
                background: 'linear-gradient(to bottom, #1F50B5, #4E8FE7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '0 10px',
                borderTop: '1px solid #fff'
            }}>
                <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    marginRight: '10px'
                }}>
                    <img src={logOffIcon} alt="Log Off" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                    Log Off
                </button>
                <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer'
                }}>
                    <img src={turnOffIcon} alt="Turn Off" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                    Turn Off Computer
                </button>
            </div>
        </div>
    );
};

export default StartMenu;
