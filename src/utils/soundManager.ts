import startupSound from '../assets/sounds/xp_startup.mp3';
import shutdownSound from '../assets/sounds/xp_shutdown.mp3';
import logoffSound from '../assets/sounds/xp_logoff.mp3';
import errorSound from '../assets/sounds/xp_error.mp3';
import dingSound from '../assets/sounds/xp_ding.mp3';

export type SystemSound = 'startup' | 'shutdown' | 'logoff' | 'error' | 'ding';

const sounds: Record<SystemSound, string> = {
    startup: startupSound,
    shutdown: shutdownSound,
    logoff: logoffSound,
    error: errorSound,
    ding: dingSound,
};

export const playSystemSound = (sound: SystemSound) => {
    try {
        const audio = new Audio(sounds[sound]);
        audio.volume = 0.5; // Reasonable default volume
        audio.play().catch(e => {
            // Auto-play policies might block this without user interaction
            console.warn('Failed to play system sound:', e);
        });
    } catch (e) {
        console.error('Error playing sound:', e);
    }
};
