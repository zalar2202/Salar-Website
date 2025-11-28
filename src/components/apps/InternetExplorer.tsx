import React, { useState, useRef } from 'react';

interface InternetExplorerProps {
  initialUrl?: string;
}

const InternetExplorer: React.FC<InternetExplorerProps> = ({ initialUrl = 'https://www.google.com/webhp?igu=1' }) => {
  const [url, setUrl] = useState(initialUrl);
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNavigate = (e?: React.FormEvent) => {
    e?.preventDefault();
    let targetUrl = url;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }
    setCurrentUrl(targetUrl);
    setUrl(targetUrl); // Normalize input
    setIsLoading(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleHome = () => {
    const homeUrl = 'https://www.google.com/webhp?igu=1';
    setUrl(homeUrl);
    setCurrentUrl(homeUrl);
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
        // Force reload by resetting src
        const current = iframeRef.current.src;
        iframeRef.current.src = '';
        setTimeout(() => {
            if (iframeRef.current) iframeRef.current.src = current;
        }, 10);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f0f0f0' }}>
      {/* Toolbar */}
      <div style={{ 
        padding: '2px', 
        borderBottom: '1px solid #a0a0a0',
        backgroundColor: '#ece9d8',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
      }}>
        {/* Menu Bar (Visual only) */}
        <div style={{ display: 'flex', gap: '10px', padding: '2px 5px', fontSize: '11px' }}>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Favorites</span>
          <span>Tools</span>
          <span>Help</span>
        </div>

        {/* Navigation Bar */}
        <div style={{ display: 'flex', gap: '5px', padding: '2px', alignItems: 'center' }}>
          <button onClick={() => {}} style={{ minWidth: '24px' }}>←</button>
          <button onClick={() => {}} style={{ minWidth: '24px' }}>→</button>
          <div style={{ width: '1px', height: '20px', backgroundColor: '#a0a0a0', margin: '0 2px' }} />
          <button onClick={handleRefresh} title="Refresh">↻</button>
          <button onClick={handleHome} title="Home">🏠</button>
          
          <div style={{ width: '1px', height: '20px', backgroundColor: '#a0a0a0', margin: '0 2px' }} />
          
          <span style={{ fontSize: '11px', alignSelf: 'center' }}>Address</span>
          <form onSubmit={handleNavigate} style={{ flex: 1, display: 'flex', gap: '2px' }}>
            <input 
              type="text" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)}
              style={{ 
                flex: 1, 
                padding: '2px 5px',
                border: '1px solid #7f9db9',
                fontSize: '11px',
                fontFamily: 'Tahoma, sans-serif'
              }} 
            />
            <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '2px', padding: '0 5px' }}>
              Go
            </button>
          </form>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, position: 'relative', backgroundColor: 'white' }}>
        {isLoading && (
            <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255,0.8)',
                zIndex: 1
            }}>
                Loading...
            </div>
        )}
        <iframe 
          ref={iframeRef}
          src={currentUrl} 
          title="Internet Explorer"
          style={{ width: '100%', height: '100%', border: 'none' }}
          onLoad={handleIframeLoad}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
      
      {/* Status Bar */}
      <div style={{ 
        borderTop: '1px solid #a0a0a0', 
        padding: '2px 5px', 
        fontSize: '11px', 
        backgroundColor: '#ece9d8',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <span>Done</span>
        <span>Internet</span>
      </div>
    </div>
  );
};

export default InternetExplorer;
