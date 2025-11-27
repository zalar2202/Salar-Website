import React from 'react';
import ieIcon from '../assets/xp_ie_icon_1764251910162.png';
import notepadIcon from '../assets/xp_notepad_icon_1764251925686.png';
import folderIcon from '../assets/xp_folder_icon_1764251985048.png';
import myComputerIcon from '../assets/xp_my_computer_icon_1764252098649.png';

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '0',
            width: '380px',
            height: '480px',
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
                    backgroundImage: 'none',
                    backgroundSize: 'cover'
                }} />
                <span>Guest</span>
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
                        { name: 'Internet Explorer', icon: ieIcon, desc: 'Browse the Internet' },
                        { name: 'E-mail', icon: null, desc: 'E-mail program' },
                        { name: 'Notepad', icon: notepadIcon, desc: 'Text Editor' },
                    ].map((app, i) => (
                        <div key={i} style={{
                            padding: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: '#333'
                        }}
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
                        { name: 'My Documents', icon: folderIcon, bold: true },
                        { name: 'My Computer', icon: myComputerIcon, bold: true },
                        { name: 'My Network Places', icon: null, bold: false },
                        { name: 'Control Panel', icon: null, bold: false },
                        { name: 'Printers and Faxes', icon: null, bold: false },
                        { name: 'Help and Support', icon: null, bold: false },
                        { name: 'Search', icon: null, bold: false },
                        { name: 'Run...', icon: null, bold: false }
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
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#E8A22B', marginRight: '5px', borderRadius: '2px' }} />
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
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#D63529', marginRight: '5px', borderRadius: '2px' }} />
                    Turn Off Computer
                </button>
            </div>
        </div>
    );
};

export default StartMenu;
