import React from 'react';
import userIcon from '../assets/xp_user_salar.png';

interface LoginScreenProps {
    onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#003399',
            backgroundImage: 'radial-gradient(circle at center, #5B7CB8 0%, #003399 100%)',
            zIndex: 200000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Tahoma, sans-serif',
            overflow: 'hidden'
        }}>
            {/* Top Bar */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '80px',
                backgroundColor: '#003399',
                borderBottom: '2px solid #F6851F',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '20px'
            }}>
                {/* Windows Logo (Simplified) */}
                <div style={{
                    fontFamily: 'Franklin Gothic Medium, Arial, sans-serif',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'white',
                    fontStyle: 'italic'
                }}>
                    Microsoft <br />
                    <span style={{ fontSize: '36px', fontStyle: 'normal' }}>Windows</span>
                    <span style={{ fontSize: '24px', verticalAlign: 'super', marginLeft: '5px' }}>xp</span>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '80px',
                backgroundColor: '#003399',
                borderTop: '2px solid #F6851F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px',
                color: 'white',
                fontSize: '14px'
            }}>
                <div>Turn off computer</div>
                <div>After you log on, you can add or change accounts.<br />Just go to Control Panel and click User Accounts.</div>
            </div>

            {/* Main Content */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: '800px'
            }}>
                {/* Left Side (Welcome) */}
                <div style={{
                    flex: 1,
                    textAlign: 'right',
                    paddingRight: '40px',
                    borderRight: '1px solid rgba(255,255,255,0.3)',
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }}>
                    <div style={{
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        To begin, click your user name
                    </div>
                </div>

                {/* Right Side (Users) */}
                <div style={{
                    flex: 1,
                    paddingLeft: '40px',
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <div
                        onClick={onLogin}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '10px',
                            borderRadius: '5px',
                            transition: 'background-color 0.2s',
                            width: 'fit-content'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '5px',
                            border: '2px solid #fff',
                            backgroundImage: `url(${userIcon})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            marginRight: '15px',
                            boxShadow: '2px 2px 5px rgba(0,0,0,0.3)'
                        }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Salar</span>
                            <span style={{ color: '#ccc', fontSize: '12px' }}>Type your password</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
