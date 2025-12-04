import React, { useState, useEffect } from 'react';

type Suit = '♠' | '♥' | '♦' | '♣';
type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

interface Card {
    suit: Suit;
    rank: Rank;
    faceUp: boolean;
}

const Solitaire: React.FC = () => {
    const [tableau, setTableau] = useState<Card[][]>([]);
    const [foundation, setFoundation] = useState<Card[][]>([[], [], [], []]);
    const [stock, setStock] = useState<Card[]>([]);
    const [waste, setWaste] = useState<Card[]>([]);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);
    const [selectedCard, setSelectedCard] = useState<{ col: number, row: number, type: 'tableau' | 'waste' | 'foundation' } | null>(null);

    // Initialize game
    useEffect(() => {
        newGame();
    }, []);

    const createDeck = (): Card[] => {
        const suits: Suit[] = ['♠', '♥', '♦', '♣'];
        const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const deck: Card[] = [];

        for (const suit of suits) {
            for (const rank of ranks) {
                deck.push({ suit, rank, faceUp: false });
            }
        }

        // Shuffle
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        return deck;
    };

    const newGame = () => {
        const deck = createDeck();
        const newTableau: Card[][] = [[], [], [], [], [], [], []];

        // Deal cards to tableau
        let deckIndex = 0;
        for (let col = 0; col < 7; col++) {
            for (let row = 0; row <= col; row++) {
                const card = deck[deckIndex++];
                card.faceUp = row === col; // Only top card face up
                newTableau[col].push(card);
            }
        }

        // Remaining cards go to stock
        const remainingCards = deck.slice(deckIndex);

        setTableau(newTableau);
        setFoundation([[], [], [], []]);
        setStock(remainingCards);
        setWaste([]);
        setScore(0);
        setMoves(0);
        setSelectedCard(null);
    };

    const drawCard = () => {
        setSelectedCard(null);
        if (stock.length > 0) {
            const newStock = [...stock];
            const newWaste = [...waste];
            const card = newStock.pop()!;
            card.faceUp = true;
            newWaste.push(card);
            setStock(newStock);
            setWaste(newWaste);
            setMoves(moves + 1);
        } else if (waste.length > 0) {
            // Reset stock from waste
            const newStock = [...waste].reverse().map(c => ({ ...c, faceUp: false }));
            setStock(newStock);
            setWaste([]);
            setMoves(moves + 1);
        }
    };

    const getCardColor = (suit: Suit): 'red' | 'black' => {
        return suit === '♥' || suit === '♦' ? 'red' : 'black';
    };

    const getRankValue = (rank: Rank): number => {
        const values: Record<Rank, number> = {
            'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
            '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
        };
        return values[rank];
    };

    const isValidTableauMove = (sourceCard: Card, targetCard: Card | null): boolean => {
        if (!targetCard) return sourceCard.rank === 'K'; // Kings can go to empty columns

        const sourceColor = getCardColor(sourceCard.suit);
        const targetColor = getCardColor(targetCard.suit);

        return sourceColor !== targetColor && getRankValue(targetCard.rank) === getRankValue(sourceCard.rank) + 1;
    };

    const isValidFoundationMove = (sourceCard: Card, targetPile: Card[]): boolean => {
        if (targetPile.length === 0) return sourceCard.rank === 'A';

        const targetCard = targetPile[targetPile.length - 1];
        return sourceCard.suit === targetCard.suit && getRankValue(sourceCard.rank) === getRankValue(targetCard.rank) + 1;
    };

    const handleCardClick = (colIndex: number, rowIndex: number, type: 'tableau' | 'waste' | 'foundation') => {
        // 1. Handle selection
        if (!selectedCard) {
            // Can only select face-up cards
            if (type === 'tableau') {
                const card = tableau[colIndex][rowIndex];
                if (card && card.faceUp) {
                    setSelectedCard({ col: colIndex, row: rowIndex, type });
                }
            } else if (type === 'waste' && waste.length > 0) {
                setSelectedCard({ col: -1, row: waste.length - 1, type });
            }
            return;
        }

        // 2. Handle Deselection (clicking same card)
        if (selectedCard.col === colIndex && selectedCard.row === rowIndex && selectedCard.type === type) {
            setSelectedCard(null);
            return;
        }

        // 3. Handle Move
        let sourceCard: Card;
        let movingCards: Card[] = [];

        // Get source card(s)
        if (selectedCard.type === 'waste') {
            sourceCard = waste[waste.length - 1];
            movingCards = [sourceCard];
        } else if (selectedCard.type === 'tableau') {
            sourceCard = tableau[selectedCard.col][selectedCard.row];
            movingCards = tableau[selectedCard.col].slice(selectedCard.row);
        } else {
            return; // Cannot move FROM foundation
        }

        // Attempt move to Tableau
        if (type === 'tableau') {
            const targetCol = tableau[colIndex];
            const targetCard = targetCol.length > 0 ? targetCol[targetCol.length - 1] : null;

            if (isValidTableauMove(sourceCard, targetCard)) {
                // Execute move
                const newTableau = [...tableau];
                const newWaste = [...waste];
                const newFoundation = [...foundation];

                // Remove from source
                if (selectedCard.type === 'waste') {
                    newWaste.pop();
                } else {
                    newTableau[selectedCard.col] = newTableau[selectedCard.col].slice(0, selectedCard.row);
                    // Flip new top card if needed
                    if (newTableau[selectedCard.col].length > 0) {
                        const topCard = newTableau[selectedCard.col][newTableau[selectedCard.col].length - 1];
                        topCard.faceUp = true;
                    }
                }

                // Add to target
                newTableau[colIndex] = [...newTableau[colIndex], ...movingCards];

                setTableau(newTableau);
                setWaste(newWaste);
                setFoundation(newFoundation);
                setMoves(moves + 1);
                setScore(score + 5); // Simple scoring
                setSelectedCard(null);
            } else {
                // Invalid move, change selection if valid target
                const clickedCard = tableau[colIndex][rowIndex];
                if (clickedCard && clickedCard.faceUp) {
                    setSelectedCard({ col: colIndex, row: rowIndex, type });
                } else {
                    setSelectedCard(null);
                }
            }
        }
        // Attempt move to Foundation
        else if (type === 'foundation') {
            // Can only move one card at a time to foundation
            if (movingCards.length === 1) {
                const targetPile = foundation[colIndex];

                if (isValidFoundationMove(sourceCard, targetPile)) {
                    // Execute move
                    const newTableau = [...tableau];
                    const newWaste = [...waste];
                    const newFoundation = [...foundation];

                    // Remove from source
                    if (selectedCard.type === 'waste') {
                        newWaste.pop();
                    } else {
                        newTableau[selectedCard.col] = newTableau[selectedCard.col].slice(0, selectedCard.row);
                        // Flip new top card if needed
                        if (newTableau[selectedCard.col].length > 0) {
                            const topCard = newTableau[selectedCard.col][newTableau[selectedCard.col].length - 1];
                            topCard.faceUp = true;
                        }
                    }

                    // Add to target
                    newFoundation[colIndex] = [...newFoundation[colIndex], sourceCard];

                    setTableau(newTableau);
                    setWaste(newWaste);
                    setFoundation(newFoundation);
                    setMoves(moves + 1);
                    setScore(score + 10);
                    setSelectedCard(null);
                }
            }
        }
    };

    const Card: React.FC<{ card: Card | null; isSelected?: boolean; onClick?: (e?: React.MouseEvent) => void }> = ({ card, isSelected, onClick }) => {
        if (!card) {
            return (
                <div
                    onClick={onClick}
                    style={{
                        width: '100%',
                        paddingBottom: '140%', // Aspect ratio
                        border: '2px dashed rgba(255,255,255,0.2)',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        cursor: onClick ? 'pointer' : 'default',
                        position: 'relative'
                    }}
                />
            );
        }

        const baseStyle: React.CSSProperties = {
            width: '100%',
            paddingBottom: '140%', // Aspect ratio
            borderRadius: '4px',
            position: 'relative',
            cursor: 'pointer',
            boxShadow: isSelected ? '0 0 8px #ffff00' : '1px 1px 3px rgba(0,0,0,0.3)',
            transform: isSelected ? 'translateY(-2px)' : 'none',
            transition: 'transform 0.1s',
            overflow: 'hidden'
        };

        if (!card.faceUp) {
            return (
                <div style={{
                    ...baseStyle,
                    background: 'linear-gradient(135deg, #1e4d8b 0%, #2563a8 50%, #1e4d8b 100%)',
                    border: '1px solid #fff',
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.1) 5px, rgba(255,255,255,0.1) 10px)',
                    }} />
                </div>
            );
        }

        const color = getCardColor(card.suit);

        return (
            <div
                onClick={onClick}
                style={{
                    ...baseStyle,
                    backgroundColor: '#fff',
                    border: isSelected ? '2px solid #ffff00' : '1px solid #999',
                }}
            >
                {/* Top Left */}
                <div style={{ position: 'absolute', top: '2px', left: '2px', fontSize: '12px', fontWeight: 'bold', color: color === 'red' ? '#d00' : '#000', lineHeight: 1 }}>
                    {card.rank}<br />{card.suit}
                </div>

                {/* Center */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '24px', color: color === 'red' ? '#d00' : '#000' }}>
                    {card.suit}
                </div>

                {/* Bottom Right */}
                <div style={{ position: 'absolute', bottom: '2px', right: '2px', fontSize: '12px', fontWeight: 'bold', color: color === 'red' ? '#d00' : '#000', lineHeight: 1, transform: 'rotate(180deg)' }}>
                    {card.rank}<br />{card.suit}
                </div>
            </div>
        );
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#008000', // Classic green
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            overflow: 'hidden', // Prevent scrolling
            userSelect: 'none'
        }}>
            {/* Top Row: Stock, Waste, and Foundations */}
            <div style={{ display: 'flex', justifyContent: 'space-between', height: '15%' }}>
                <div style={{ display: 'flex', gap: '10px', width: '40%' }}>
                    {/* Stock */}
                    <div style={{ width: '60px', position: 'relative' }}>
                        <Card card={stock.length > 0 ? { suit: '♠', rank: 'A', faceUp: false } : null} onClick={drawCard} />
                    </div>

                    {/* Waste */}
                    <div style={{ width: '60px', position: 'relative' }}>
                        <Card
                            card={waste.length > 0 ? waste[waste.length - 1] : null}
                            isSelected={selectedCard?.type === 'waste'}
                            onClick={() => handleCardClick(0, waste.length - 1, 'waste')}
                        />
                    </div>
                </div>

                {/* Foundations */}
                <div style={{ display: 'flex', gap: '10px', width: '55%', justifyContent: 'flex-end' }}>
                    {foundation.map((pile, i) => (
                        <div key={i} style={{ width: '60px', position: 'relative' }}>
                            <Card
                                card={pile.length > 0 ? pile[pile.length - 1] : null}
                                onClick={() => handleCardClick(i, pile.length - 1, 'foundation')}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Tableau */}
            <div style={{ display: 'flex', gap: '2%', height: '75%', padding: '0 5px' }}>
                {tableau.map((column, colIndex) => (
                    <div
                        key={colIndex}
                        style={{
                            flex: 1,
                            position: 'relative',
                            minHeight: '100px' // Ensure clickable area
                        }}
                        onClick={() => {
                            if (column.length === 0) handleCardClick(colIndex, 0, 'tableau');
                        }}
                    >
                        {column.length === 0 ? (
                            <div style={{
                                width: '100%',
                                paddingBottom: '140%',
                                border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '4px'
                            }} />
                        ) : (
                            column.map((card, cardIndex) => (
                                <div key={cardIndex} style={{
                                    position: 'absolute',
                                    top: `${cardIndex * 25}px`,
                                    width: '100%',
                                    zIndex: cardIndex
                                }}>
                                    <Card
                                        card={card}
                                        isSelected={selectedCard?.type === 'tableau' && selectedCard.col === colIndex && selectedCard.row === cardIndex}
                                        onClick={(e) => {
                                            e?.stopPropagation();
                                            handleCardClick(colIndex, cardIndex, 'tableau');
                                        }}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                ))}
            </div>

            {/* Bottom Bar */}
            <div style={{
                height: '30px',
                background: '#008000',
                borderTop: '1px solid rgba(255,255,255,0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#fff',
                fontSize: '11px',
                padding: '0 5px'
            }}>
                <div>Score: {score}</div>
                <button
                    onClick={newGame}
                    style={{
                        padding: '2px 8px',
                        backgroundColor: '#ECE9D8',
                        border: '1px solid #003C74',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px'
                    }}
                >
                    New Game
                </button>
                <div>Time: 0</div>
            </div>
        </div>
    );
};

export default Solitaire;
