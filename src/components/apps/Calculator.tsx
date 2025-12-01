import React, { useState } from 'react';

const Calculator: React.FC = () => {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');
    const [isNewNumber, setIsNewNumber] = useState(true);

    const handleNumber = (num: string) => {
        if (isNewNumber) {
            setDisplay(num);
            setIsNewNumber(false);
        } else {
            setDisplay(display === '0' ? num : display + num);
        }
    };

    const handleOperator = (op: string) => {
        setEquation(display + ' ' + op + ' ');
        setIsNewNumber(true);
    };

    const handleEqual = () => {
        try {
            // eslint-disable-next-line no-eval
            const result = eval(equation + display);
            setDisplay(String(result));
            setEquation('');
            setIsNewNumber(true);
        } catch (error) {
            setDisplay('Error');
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setEquation('');
        setIsNewNumber(true);
    };

    const buttons = [
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['0', '.', '=', '+']
    ];

    return (
        <div style={{
            padding: '10px',
            backgroundColor: '#D9E4F1',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            fontFamily: 'Tahoma, sans-serif'
        }}>
            <div style={{
                backgroundColor: 'white',
                border: '1px solid #829ABC',
                borderRadius: '2px',
                padding: '5px 10px',
                textAlign: 'right',
                marginBottom: '5px'
            }}>
                <div style={{ fontSize: '12px', color: '#666', height: '15px' }}>{equation}</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{display}</div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '5px',
                flex: 1
            }}>
                <button
                    onClick={handleClear}
                    style={{
                        gridColumn: 'span 4',
                        padding: '5px',
                        marginBottom: '5px',
                        cursor: 'pointer',
                        background: 'linear-gradient(to bottom, #FFF, #EAEAEA)',
                        border: '1px solid #707070',
                        borderRadius: '2px',
                        color: '#D32F2F'
                    }}
                >
                    C
                </button>
                {buttons.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((btn) => (
                            <button
                                key={btn}
                                onClick={() => {
                                    if (btn === '=') handleEqual();
                                    else if (['+', '-', '*', '/'].includes(btn)) handleOperator(btn);
                                    else handleNumber(btn);
                                }}
                                style={{
                                    padding: '10px',
                                    cursor: 'pointer',
                                    background: 'linear-gradient(to bottom, #FFF, #EAEAEA)',
                                    border: '1px solid #707070',
                                    borderRadius: '2px',
                                    fontWeight: ['=', '+', '-', '*', '/'].includes(btn) ? 'bold' : 'normal',
                                    color: ['=', '+', '-', '*', '/'].includes(btn) ? '#1F3C6D' : '#000'
                                }}
                            >
                                {btn}
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Calculator;
