import React, { useState } from 'react';
import ieIcon from '../assets/xp_ie_icon.png';
import notepadIcon from '../assets/xp_notepad_icon.png';
import calculatorIcon from '../assets/xp_calculator_icon.png';
import wmpIcon from '../assets/xp_wmp_icon.png';
import paintIcon from '../assets/xp_paint_icon.png';
import folderIcon from '../assets/xp_folder_icon.png';
import myComputerIcon from '../assets/xp_my_computer_icon.png';
import emailIcon from '../assets/xp_email_icon.png';
import userIcon from '../assets/xp_user_salar.png';
import logOffIcon from '../assets/xp_icon_logoff.png';
import turnOffIcon from '../assets/xp_icon_turnoff.png';
import networkIcon from '../assets/xp_network_icon.png';
import controlPanelIcon from '../assets/xp_control_panel_icon.png';
import printerIcon from '../assets/xp_printer_icon.png';
import helpIcon from '../assets/xp_help_icon.png';
import searchIcon from '../assets/xp_search_icon.png';
import runIcon from '../assets/xp_run_icon.png';
import minesweeperIcon from '../assets/xp_minesweeper_icon.png';
import solitaireIcon from '../assets/xp_solitaire_icon.png';

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onItemClick: (item: string) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onItemClick }) => {
    const [isAllProgramsOpen, setIsAllProgramsOpen] = useState(false);
    const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleAllProgramsClick = () => {
        setIsAllProgramsOpen(!isAllProgramsOpen);
    };

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
            {/* All Programs Submenu - positioned over the RIGHT column */}
            {isAllProgramsOpen && (
                <div style={{
                    position: 'absolute',
                    top: '60px', // Below header
                    bottom: '40px', // Above footer
                    left: '50%', // Start at middle (covering right column)
                    width: '50%', // Cover right column
                    backgroundColor: '#fff',
                    borderLeft: '1px solid #3A6EA5',
                    zIndex: 9999,
                    fontFamily: 'Tahoma, sans-serif',
                    padding: '5px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        padding: '5px',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        color: '#0B53C0',
                        borderBottom: '1px solid #ccc',
                        marginBottom: '5px'
                    }}>
                        Programs
                    </div>

                    {[
                        { name: 'Accessories', icon: folderIcon, isFolder: true, action: null },
                        { name: 'Games', icon: folderIcon, isFolder: true, action: null },
                        { name: 'Internet Explorer', icon: ieIcon, isFolder: false, action: 'internet-explorer' },
                        { name: 'Outlook Express', icon: emailIcon, isFolder: false, action: 'email' },
                    ].map((program, i) => (
                        <div
                            key={i}
                            style={{
                                position: 'relative'
                            }}
                            onMouseEnter={() => program.isFolder && setHoveredFolder(program.name)}
                            onMouseLeave={() => program.isFolder && setHoveredFolder(null)}
                        >
                            <div style={{
                                padding: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                fontSize: '11px',
                                color: '#000',
                                backgroundColor: hoveredFolder === program.name ? '#316AC5' : 'transparent'
                            }}
                                onClick={() => {
                                    if (program.action) {
                                        onItemClick(program.action);
                                        setIsAllProgramsOpen(false);
                                    }
                                }}
                                onMouseEnter={(e) => {
                                    if (!program.isFolder) {
                                        e.currentTarget.style.backgroundColor = '#316AC5';
                                        e.currentTarget.style.color = 'white';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!program.isFolder && hoveredFolder !== program.name) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = '#000';
                                    }
                                }}
                            >
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    marginRight: '8px',
                                    backgroundImage: `url(${program.icon})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'
                                }} />
                                <span style={{ color: hoveredFolder === program.name ? 'white' : '#000' }}>
                                    {program.name} {program.isFolder && '▶'}
                                </span>
                            </div>

                            {/* Games submenu */}
                            {program.name === 'Games' && hoveredFolder === 'Games' && (
                                <div style={{
                                    position: 'absolute',
                                    left: '100%',
                                    top: 0,
                                    width: 'min(200px, 40vw)',
                                    backgroundColor: '#fff',
                                    border: '1px solid #0B53C0',
                                    borderRadius: '3px',
                                    boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
                                    padding: '5px',
                                    zIndex: 10000
                                }}>
                                    {[
                                        { name: 'Minesweeper', icon: minesweeperIcon, action: 'minesweeper' },
                                        { name: 'Solitaire', icon: solitaireIcon, action: 'solitaire' },
                                    ].map((game, gi) => (
                                        <div key={gi} style={{
                                            padding: '5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            fontSize: '11px',
                                            color: '#000'
                                        }}
                                            onClick={() => {
                                                if (game.action) {
                                                    onItemClick(game.action);
                                                    setIsAllProgramsOpen(false);
                                                    setHoveredFolder(null);
                                                }
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#316AC5';
                                                e.currentTarget.style.color = 'white';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                e.currentTarget.style.color = '#000';
                                            }}
                                        >
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                marginRight: '8px',
                                                backgroundImage: `url(${game.icon})`,
                                                backgroundSize: 'contain',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center'
                                            }} />
                                            <span>{game.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Accessories submenu */}
                            {program.name === 'Accessories' && hoveredFolder === 'Accessories' && (
                                <div style={{
                                    position: 'absolute',
                                    left: '100%',
                                    top: 0,
                                    width: 'min(200px, 40vw)',
                                    backgroundColor: '#fff',
                                    border: '1px solid #0B53C0',
                                    borderRadius: '3px',
                                    boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
                                    padding: '5px',
                                    zIndex: 10000
                                }}>
                                    {[
                                        { name: 'Notepad', icon: notepadIcon, action: 'notepad' },
                                        { name: 'Paint', icon: paintIcon, action: 'paint' },
                                        { name: 'Calculator', icon: calculatorIcon, action: 'calculator' },
                                        { name: 'Windows Media Player', icon: wmpIcon, action: 'media-player' },
                                    ].map((app, ai) => (
                                        <div key={ai} style={{
                                            padding: '5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            fontSize: '11px',
                                            color: '#000'
                                        }}
                                            onClick={() => {
                                                if (app.action) {
                                                    onItemClick(app.action);
                                                    setIsAllProgramsOpen(false);
                                                    setHoveredFolder(null);
                                                }
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#316AC5';
                                                e.currentTarget.style.color = 'white';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                e.currentTarget.style.color = '#000';
                                            }}
                                        >
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                marginRight: '8px',
                                                backgroundImage: `url(${app.icon})`,
                                                backgroundSize: 'contain',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center'
                                            }} />
                                            <span>{app.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Main Start Menu Body */}
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
                        { name: 'Minesweeper', icon: minesweeperIcon, desc: 'Play Minesweeper', action: 'minesweeper' },
                        { name: 'Calculator', icon: calculatorIcon, desc: 'Perform calculations', action: 'calculator' },
                        { name: 'Windows Media Player', icon: wmpIcon, desc: 'Play audio and video files', action: 'media-player' },
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
                        <div
                            style={{
                                padding: '5px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                backgroundColor: isAllProgramsOpen ? '#316AC5' : 'transparent',
                                color: isAllProgramsOpen ? 'white' : '#000'
                            }}
                            onClick={handleAllProgramsClick}
                            onMouseEnter={(e) => {
                                if (!isAllProgramsOpen) e.currentTarget.style.backgroundColor = '#e8f0ff';
                            }}
                            onMouseLeave={(e) => {
                                if (!isAllProgramsOpen) e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            All Programs ▶
                        </div>
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
                        { name: 'My Network Places', icon: networkIcon, bold: false, action: 'my-network-places' },
                        { name: 'Control Panel', icon: controlPanelIcon, bold: false, action: 'control-panel' },
                        { name: 'Printers and Faxes', icon: printerIcon, bold: false, action: 'printers' },
                        { name: 'Help and Support', icon: helpIcon, bold: false, action: 'help' },
                        { name: 'Search', icon: searchIcon, bold: false, action: 'search' },
                        { name: 'Run...', icon: runIcon, bold: false, action: 'run' }
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
                }} onClick={() => onItemClick('log-off')}>
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
                }} onClick={() => onItemClick('turn-off')}>
                    <img src={turnOffIcon} alt="Turn Off" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                    Turn Off Computer
                </button>
            </div>
        </div>
    );
};

export default StartMenu;
