import React from 'react';

interface TurnedOffScreenProps {
    onRestart: () => void;
}

const TurnedOffScreen: React.FC<TurnedOffScreenProps> = ({ onRestart }) => {
    return (
        <div
            onClick={onRestart}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'black',
                zIndex: 300000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Tahoma, sans-serif',
                cursor: 'pointer'
            }}
        >
            <div style={{
                color: '#E68B2C',
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center'
            }}>
                It is now safe to turn off your computer.
            </div>
        </div>
    );
};

export default TurnedOffScreen;
