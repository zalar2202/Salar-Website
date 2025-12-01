import React, { useState } from 'react';
import folderIcon from '../../assets/xp_folder_icon.png';

interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'file';
    icon?: string;
}

const fileSystem: Record<string, FileItem[]> = {
    root: [
        { id: 'resume', name: 'Resume', type: 'folder' },
        { id: 'projects', name: 'Projects', type: 'folder' },
        { id: 'photos', name: 'Photos', type: 'folder' },
    ],
    resume: [],
    projects: [],
    photos: []
};

const MyDocuments: React.FC = () => {
    const [currentPath, setCurrentPath] = useState<string>('root');
    const [history, setHistory] = useState<string[]>(['root']);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const currentItems = fileSystem[currentPath] || [];

    const handleNavigate = (path: string) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(path);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setCurrentPath(path);
        setSelectedItem(null);
    };

    const handleBack = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setCurrentPath(history[historyIndex - 1]);
            setSelectedItem(null);
        }
    };

    const handleItemDoubleClick = (item: FileItem) => {
        if (item.type === 'folder') {
            handleNavigate(item.id);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Tahoma, sans-serif' }}>
            {/* Toolbar (Simplified) */}
            <div style={{
                height: '36px',
                backgroundColor: '#ECE9D8',
                borderBottom: '1px solid #D1D1D1',
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                gap: '10px'
            }}>
                <button
                    onClick={handleBack}
                    disabled={historyIndex === 0}
                    style={{
                        opacity: historyIndex === 0 ? 0.5 : 1,
                        cursor: historyIndex === 0 ? 'default' : 'pointer',
                        display: 'flex', alignItems: 'center', gap: '5px',
                        border: '1px solid transparent',
                        backgroundColor: 'transparent',
                        padding: '2px 5px'
                    }}
                >
                    <div style={{ width: '24px', height: '24px', background: '#00D42A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '14px' }}>←</div>
                    <span>Back</span>
                </button>
                <div style={{ width: '1px', height: '20px', backgroundColor: '#ACA899' }} />
                {/* Address Bar Placeholder */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: 'white', border: '1px solid #7F9DB9', padding: '2px 5px', fontSize: '11px' }}>
                    <img src={folderIcon} style={{ width: '16px', height: '16px' }} />
                    <span>{currentPath === 'root' ? 'My Documents' : fileSystem['root'].find(i => i.id === currentPath)?.name || currentPath}</span>
                </div>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Sidebar */}
                <div style={{
                    width: '180px',
                    background: 'linear-gradient(to bottom, #7BA2E7 0%, #6375D6 100%)',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    overflow: 'auto'
                }}>
                    {/* File and Folder Tasks */}
                    <div style={{ backgroundColor: 'white', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                            background: 'linear-gradient(to right, #FFF, #C6D3F7)',
                            padding: '5px 10px',
                            fontWeight: 'bold',
                            fontSize: '11px',
                            color: '#215DC6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer'
                        }}>
                            File and Folder Tasks
                            <span style={{ fontSize: '10px' }}>^</span>
                        </div>
                        <div style={{ padding: '10px', fontSize: '11px', color: '#215DC6', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <div style={{ cursor: 'pointer', display: 'flex', gap: '5px' }}>Make a new folder</div>
                            <div style={{ cursor: 'pointer', display: 'flex', gap: '5px' }}>Share this folder</div>
                        </div>
                    </div>

                    {/* Other Places */}
                    <div style={{ backgroundColor: 'white', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                            background: 'linear-gradient(to right, #FFF, #C6D3F7)',
                            padding: '5px 10px',
                            fontWeight: 'bold',
                            fontSize: '11px',
                            color: '#215DC6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer'
                        }}>
                            Other Places
                            <span style={{ fontSize: '10px' }}>^</span>
                        </div>
                        <div style={{ padding: '10px', fontSize: '11px', color: '#215DC6', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <div style={{ cursor: 'pointer' }}>My Computer</div>
                            <div style={{ cursor: 'pointer' }}>My Network Places</div>
                        </div>
                    </div>

                    {/* Details */}
                    <div style={{ backgroundColor: 'white', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                            background: 'linear-gradient(to right, #FFF, #C6D3F7)',
                            padding: '5px 10px',
                            fontWeight: 'bold',
                            fontSize: '11px',
                            color: '#215DC6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer'
                        }}>
                            Details
                            <span style={{ fontSize: '10px' }}>^</span>
                        </div>
                        <div style={{ padding: '10px', fontSize: '11px', color: 'black' }}>
                            <div style={{ fontWeight: 'bold' }}>{selectedItem ? selectedItem : (currentPath === 'root' ? 'My Documents' : currentPath)}</div>
                            <div>{selectedItem ? 'File Folder' : 'System Folder'}</div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', overflow: 'auto' }}>
                    {currentItems.length === 0 ? (
                        <div style={{ color: '#666', fontSize: '12px', fontStyle: 'italic' }}>This folder is empty.</div>
                    ) : (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                            {currentItems.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedItem(item.name)}
                                    onDoubleClick={() => handleItemDoubleClick(item)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '70px',
                                        cursor: 'default',
                                        opacity: selectedItem === item.name ? 0.7 : 1
                                    }}
                                >
                                    <img
                                        src={item.icon || folderIcon}
                                        style={{ width: '48px', height: '48px', marginBottom: '5px' }}
                                        draggable={false}
                                    />
                                    <span style={{
                                        fontSize: '11px',
                                        textAlign: 'center',
                                        backgroundColor: selectedItem === item.name ? '#316AC5' : 'transparent',
                                        color: selectedItem === item.name ? 'white' : 'black',
                                        padding: '0 2px',
                                        borderRadius: '2px'
                                    }}>
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyDocuments;
