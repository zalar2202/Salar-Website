import React, { useState, useRef, useEffect } from 'react';

const WindowsMediaPlayer: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => setCurrentTime(video.currentTime);
        const updateDuration = () => {
            if (video.duration && !isNaN(video.duration)) {
                setDuration(video.duration);
            }
        };
        const handleError = (e: Event) => {
            console.error('Video error:', e);
        };

        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', updateDuration);
        video.addEventListener('error', handleError);
        video.addEventListener('canplay', updateDuration);

        // Force load
        video.load();

        return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('loadedmetadata', updateDuration);
            video.removeEventListener('error', handleError);
            video.removeEventListener('canplay', updateDuration);
        };
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleStop = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        if (videoRef.current) {
            videoRef.current.volume = vol;
            if (vol > 0) setIsMuted(false);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(to bottom, #3B6EA5 0%, #2B5B8E 50%, #1E4A73 100%)',
            fontFamily: 'Tahoma, sans-serif',
            overflow: 'hidden'
        }}>
            {/* Top Menu Bar */}
            <div style={{
                background: 'linear-gradient(to bottom, #5B8FC7, #3B6EA5)',
                borderBottom: '1px solid #1E4A73',
                padding: '3px 8px',
                fontSize: '11px',
                display: 'flex',
                gap: '12px',
                color: '#fff'
            }}>
                <span style={{ cursor: 'pointer', padding: '2px 5px' }}>File</span>
                <span style={{ cursor: 'pointer', padding: '2px 5px' }}>View</span>
                <span style={{ cursor: 'pointer', padding: '2px 5px' }}>Play</span>
                <span style={{ cursor: 'pointer', padding: '2px 5px' }}>Tools</span>
                <span style={{ cursor: 'pointer', padding: '2px 5px' }}>Help</span>
            </div>

            {/* Main Content Area */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '8px',
                gap: '8px'
            }}>
                {/* Video Display Area */}
                <div style={{
                    flex: 1,
                    backgroundColor: '#000',
                    border: '2px solid #1E4A73',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
                }}>
                    <video
                        ref={videoRef}
                        src="/videos/demo.mp4"
                        preload="metadata"
                        playsInline
                        webkit-playsinline="true"
                        controls
                        loop
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }}
                        onEnded={() => setIsPlaying(false)}
                    />
                </div>

                {/* Seek Bar */}
                <div style={{
                    background: 'linear-gradient(to bottom, #4A8BC2, #2B5B8E)',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #1E4A73'
                }}>
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        style={{
                            width: '100%',
                            height: '6px',
                            cursor: 'pointer',
                            accentColor: '#5B8FC7'
                        }}
                    />
                </div>
            </div>

            {/* Control Bar */}
            <div style={{
                background: 'linear-gradient(to bottom, #5B8FC7 0%, #4A8BC2 50%, #3B6EA5 100%)',
                borderTop: '1px solid #6B9FD7',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)'
            }}>
                {/* Previous Button */}
                <button
                    style={{
                        width: '28px',
                        height: '28px',
                        background: 'linear-gradient(to bottom, #6B9FD7, #4A8BC2)',
                        border: '1px solid #2B5B8E',
                        borderRadius: '3px',
                        color: '#fff',
                        fontSize: '14px',
                        cursor: 'pointer',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                    }}
                >
                    ⏮
                </button>

                {/* Play/Pause Button */}
                <button
                    onClick={togglePlay}
                    style={{
                        width: '36px',
                        height: '36px',
                        background: 'linear-gradient(to bottom, #7BAFD7, #5B8FC7)',
                        border: '2px solid #2B5B8E',
                        borderRadius: '4px',
                        color: '#fff',
                        fontSize: '18px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {isPlaying ? '⏸' : '▶'}
                </button>

                {/* Stop Button */}
                <button
                    onClick={handleStop}
                    style={{
                        width: '28px',
                        height: '28px',
                        background: 'linear-gradient(to bottom, #6B9FD7, #4A8BC2)',
                        border: '1px solid #2B5B8E',
                        borderRadius: '3px',
                        color: '#fff',
                        fontSize: '14px',
                        cursor: 'pointer',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                    }}
                >
                    ⏹
                </button>

                {/* Next Button */}
                <button
                    style={{
                        width: '28px',
                        height: '28px',
                        background: 'linear-gradient(to bottom, #6B9FD7, #4A8BC2)',
                        border: '1px solid #2B5B8E',
                        borderRadius: '3px',
                        color: '#fff',
                        fontSize: '14px',
                        cursor: 'pointer',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                    }}
                >
                    ⏭
                </button>

                {/* Time Display */}
                <div style={{
                    color: '#fff',
                    fontSize: '11px',
                    marginLeft: '8px',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    minWidth: '80px'
                }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Volume Button */}
                <button
                    onClick={toggleMute}
                    style={{
                        width: '28px',
                        height: '28px',
                        background: 'linear-gradient(to bottom, #6B9FD7, #4A8BC2)',
                        border: '1px solid #2B5B8E',
                        borderRadius: '3px',
                        color: '#fff',
                        fontSize: '14px',
                        cursor: 'pointer',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                    }}
                >
                    {isMuted ? '🔇' : '🔊'}
                </button>

                {/* Volume Slider */}
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    style={{
                        width: '80px',
                        height: '6px',
                        cursor: 'pointer',
                        accentColor: '#7BAFD7'
                    }}
                />
            </div>

            {/* Status Bar */}
            <div style={{
                background: 'linear-gradient(to bottom, #4A8BC2, #3B6EA5)',
                borderTop: '1px solid #6B9FD7',
                padding: '4px 8px',
                fontSize: '10px',
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)'
            }}>
                <span>Ready</span>
                <span>Windows Media Player</span>
            </div>
        </div>
    );
};

export default WindowsMediaPlayer;
