import React from 'react';
import recycleBinIcon from '../../assets/xp_recycle_bin_empty.png';

const RecycleBin: React.FC = () => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Tahoma, sans-serif' }}>
            {/* Toolbar */}
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
                    disabled
                    style={{
                        opacity: 0.5,
                        cursor: 'default',
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
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: 'white', border: '1px solid #7F9DB9', padding: '2px 5px', fontSize: '11px' }}>
                    <img src={recycleBinIcon} style={{ width: '16px', height: '16px' }} />
                    <span>Recycle Bin</span>
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
                    {/* Recycle Bin Tasks */}
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
                            Recycle Bin Tasks
                            <span style={{ fontSize: '10px' }}>^</span>
                        </div>
                        <div style={{ padding: '10px', fontSize: '11px', color: '#215DC6', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <div style={{ cursor: 'pointer', display: 'flex', gap: '5px' }}>Empty the Recycle Bin</div>
                            <div style={{ cursor: 'pointer', display: 'flex', gap: '5px' }}>Restore all items</div>
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
                            <div style={{ cursor: 'pointer' }}>My Network Places</div>
                            <div style={{ cursor: 'pointer' }}>My Documents</div>
                            <div style={{ cursor: 'pointer' }}>My Computer</div>
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
                            <div style={{ fontWeight: 'bold' }}>Recycle Bin</div>
                            <div>System Folder</div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', overflow: 'auto' }}>
                    <div style={{ color: '#666', fontSize: '12px', fontStyle: 'italic' }}>The Recycle Bin is empty.</div>
                </div>
            </div>
        </div>
    );
};

export default RecycleBin;
