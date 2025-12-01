import React, { useState, useEffect } from 'react';

interface Cell {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighborMines: number;
}

const Minesweeper: React.FC = () => {
    const ROWS = 9;
    const COLS = 9;
    const MINES = 10;

    const [board, setBoard] = useState<Cell[][]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [mineCount, setMineCount] = useState(MINES);

    const initializeBoard = () => {
        // Create empty board
        const newBoard: Cell[][] = Array(ROWS).fill(null).map(() =>
            Array(COLS).fill(null).map(() => ({
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborMines: 0
            }))
        );

        // Place mines randomly
        let minesPlaced = 0;
        while (minesPlaced < MINES) {
            const row = Math.floor(Math.random() * ROWS);
            const col = Math.floor(Math.random() * COLS);
            if (!newBoard[row][col].isMine) {
                newBoard[row][col].isMine = true;
                minesPlaced++;
            }
        }

        // Calculate neighbor mines
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (!newBoard[r][c].isMine) {
                    let count = 0;
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            const nr = r + dr;
                            const nc = c + dc;
                            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newBoard[nr][nc].isMine) {
                                count++;
                            }
                        }
                    }
                    newBoard[r][c].neighborMines = count;
                }
            }
        }

        setBoard(newBoard);
        setGameOver(false);
        setGameWon(false);
        setMineCount(MINES);
    };

    useEffect(() => {
        initializeBoard();
    }, []);

    const revealCell = (row: number, col: number) => {
        if (gameOver || gameWon || board[row][col].isRevealed || board[row][col].isFlagged) return;

        const newBoard = board.map(r => r.map(c => ({ ...c })));

        if (newBoard[row][col].isMine) {
            // Game over - reveal all mines
            newBoard.forEach(r => r.forEach(c => {
                if (c.isMine) c.isRevealed = true;
            }));
            setGameOver(true);
        } else {
            // Reveal cell and neighbors if no adjacent mines
            const reveal = (r: number, c: number) => {
                if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
                if (newBoard[r][c].isRevealed || newBoard[r][c].isFlagged) return;

                newBoard[r][c].isRevealed = true;

                if (newBoard[r][c].neighborMines === 0 && !newBoard[r][c].isMine) {
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            reveal(r + dr, c + dc);
                        }
                    }
                }
            };

            reveal(row, col);

            // Check win condition
            const unrevealedSafeCells = newBoard.flat().filter(c => !c.isRevealed && !c.isMine).length;
            if (unrevealedSafeCells === 0) {
                setGameWon(true);
            }
        }

        setBoard(newBoard);
    };

    const toggleFlag = (row: number, col: number, e: React.MouseEvent) => {
        e.preventDefault();
        if (gameOver || gameWon || board[row][col].isRevealed) return;

        const newBoard = board.map(r => r.map(c => ({ ...c })));
        newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
        setMineCount(prev => newBoard[row][col].isFlagged ? prev - 1 : prev + 1);
        setBoard(newBoard);
    };

    const getCellContent = (cell: Cell) => {
        if (cell.isFlagged) return '🚩';
        if (!cell.isRevealed) return '';
        if (cell.isMine) return '💣';
        if (cell.neighborMines === 0) return '';
        return cell.neighborMines;
    };

    const getCellColor = (cell: Cell) => {
        if (!cell.isRevealed) return '#000';
        const colors = ['', '#0000FF', '#008200', '#FE0000', '#000084', '#840000', '#008284', '#840084', '#757575'];
        return colors[cell.neighborMines] || '#000';
    };

    return (
        <div style={{
            height: '100%',
            width: '100%',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Courier New, monospace',
            userSelect: 'none',
            backgroundColor: '#C0C0C0'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '252px',
                marginBottom: '10px',
                padding: '5px',
                backgroundColor: '#C0C0C0',
                border: '2px inset #fff'
            }}>
                <div style={{
                    backgroundColor: '#000',
                    color: '#FF0000',
                    padding: '2px 5px',
                    fontFamily: 'Digital',
                    fontSize: '16px',
                    border: '1px inset #808080'
                }}>
                    {String(mineCount).padStart(3, '0')}
                </div>
                <button
                    onClick={initializeBoard}
                    style={{
                        fontSize: '20px',
                        padding: '0px 8px',
                        cursor: 'pointer',
                        border: '2px outset #fff',
                        backgroundColor: '#C0C0C0'
                    }}
                >
                    {gameOver ? '😵' : gameWon ? '😎' : '🙂'}
                </button>
                <div style={{
                    backgroundColor: '#000',
                    color: '#FF0000',
                    padding: '2px 5px',
                    fontFamily: 'Digital',
                    fontSize: '16px',
                    border: '1px inset #808080'
                }}>
                    000
                </div>
            </div>

            <div style={{
                display: 'inline-block',
                border: '3px solid',
                borderColor: '#808080 #fff #fff #808080',
                padding: '5px',
                backgroundColor: '#C0C0C0'
            }}>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex' }}>
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                onClick={() => revealCell(rowIndex, colIndex)}
                                onContextMenu={(e) => toggleFlag(rowIndex, colIndex, e)}
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    border: cell.isRevealed ? '1px solid #808080' : '2px outset #fff',
                                    backgroundColor: cell.isRevealed ? '#C0C0C0' : '#C0C0C0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: getCellColor(cell)
                                }}
                            >
                                {getCellContent(cell)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {gameOver && (
                <div style={{
                    marginTop: '10px',
                    color: 'red',
                    fontWeight: 'bold'
                }}>
                    Game Over! Click the face to restart.
                </div>
            )}

            {gameWon && (
                <div style={{
                    marginTop: '10px',
                    color: 'green',
                    fontWeight: 'bold'
                }}>
                    You Won! Click the face to play again.
                </div>
            )}
        </div>
    );
};

export default Minesweeper;
