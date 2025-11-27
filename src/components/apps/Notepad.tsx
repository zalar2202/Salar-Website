import React, { useState } from 'react';

interface NotepadProps {
    initialContent?: string;
}

const Notepad: React.FC<NotepadProps> = ({ initialContent = '' }) => {
    const [content, setContent] = useState(initialContent);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Lucida Console, monospace', fontSize: '13px' }}>
            {/* Menu Bar */}
            <div style={{ display: 'flex', gap: '10px', padding: '2px 5px', borderBottom: '1px solid #ccc', backgroundColor: '#ECE9D8', fontSize: '11px' }}>
                <span>File</span>
                <span>Edit</span>
                <span>Format</span>
                <span>View</span>
                <span>Help</span>
            </div>

            {/* Text Area */}
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                    flex: 1,
                    border: 'none',
                    resize: 'none',
                    outline: 'none',
                    padding: '5px',
                    fontFamily: 'inherit',
                    fontSize: 'inherit'
                }}
            />
        </div>
    );
};

export default Notepad;
