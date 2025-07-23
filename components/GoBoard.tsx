import { useState, useEffect } from 'react';

interface Stone {
  x: number;
  y: number;
  color: 'black' | 'white';
}

interface GoBoardProps {
  size: number;
  stones: Stone[];
  currentMove?: number;
  showCoordinates?: boolean;
}

export function GoBoard({ size = 19, stones, currentMove = stones.length, showCoordinates = true }: GoBoardProps) {
  const cellSize = 20;
  const margin = 30;
  const boardSize = (size - 1) * cellSize;
  const svgSize = boardSize + 2 * margin;

  // Filter stones up to current move
  const visibleStones = stones.slice(0, currentMove);

  // Create coordinate labels
  const letters = 'ABCDEFGHJKLMNOPQRST'.split('').slice(0, size);
  const numbers = Array.from({ length: size }, (_, i) => size - i);

  // Star points for different board sizes
  const getStarPoints = (boardSize: number) => {
    if (boardSize === 19) {
      return [
        { x: 3, y: 3 }, { x: 9, y: 3 }, { x: 15, y: 3 },
        { x: 3, y: 9 }, { x: 9, y: 9 }, { x: 15, y: 9 },
        { x: 3, y: 15 }, { x: 9, y: 15 }, { x: 15, y: 15 }
      ];
    } else if (boardSize === 13) {
      return [
        { x: 3, y: 3 }, { x: 6, y: 6 }, { x: 9, y: 3 },
        { x: 3, y: 9 }, { x: 9, y: 9 }
      ];
    } else if (boardSize === 9) {
      return [
        { x: 2, y: 2 }, { x: 4, y: 4 }, { x: 6, y: 2 },
        { x: 2, y: 6 }, { x: 6, y: 6 }
      ];
    }
    return [];
  };

  const starPoints = getStarPoints(size);

  return (
    <div className="flex flex-col items-center">
      <svg
        width={svgSize}
        height={svgSize}
        className="border border-border rounded-lg bg-amber-50"
        viewBox={`0 0 ${svgSize} ${svgSize}`}
      >
        {/* Grid lines */}
        {Array.from({ length: size }, (_, i) => (
          <g key={`lines-${i}`}>
            {/* Vertical lines */}
            <line
              x1={margin + i * cellSize}
              y1={margin}
              x2={margin + i * cellSize}
              y2={margin + boardSize}
              stroke="#8B4513"
              strokeWidth="1"
            />
            {/* Horizontal lines */}
            <line
              x1={margin}
              y1={margin + i * cellSize}
              x2={margin + boardSize}
              y2={margin + i * cellSize}
              stroke="#8B4513"
              strokeWidth="1"
            />
          </g>
        ))}

        {/* Star points */}
        {starPoints.map((point, index) => (
          <circle
            key={`star-${index}`}
            cx={margin + point.x * cellSize}
            cy={margin + point.y * cellSize}
            r="3"
            fill="#8B4513"
          />
        ))}

        {/* Stones */}
        {visibleStones.map((stone, index) => (
          <g key={`stone-${index}`}>
            <circle
              cx={margin + stone.x * cellSize}
              cy={margin + stone.y * cellSize}
              r="9"
              fill={stone.color === 'black' ? '#1a1a1a' : '#f8f8f8'}
              stroke={stone.color === 'black' ? '#000' : '#ccc'}
              strokeWidth="1"
            />
            {/* Move number on the last played stone */}
            {index === currentMove - 1 && (
              <text
                x={margin + stone.x * cellSize}
                y={margin + stone.y * cellSize}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fill={stone.color === 'black' ? 'white' : 'black'}
                fontWeight="bold"
              >
                {index + 1}
              </text>
            )}
          </g>
        ))}

        {/* Coordinates */}
        {showCoordinates && (
          <>
            {/* Letters (bottom) */}
            {letters.map((letter, i) => (
              <text
                key={`letter-${i}`}
                x={margin + i * cellSize}
                y={svgSize - 10}
                textAnchor="middle"
                fontSize="12"
                fill="#666"
              >
                {letter}
              </text>
            ))}
            {/* Numbers (right) */}
            {numbers.map((number, i) => (
              <text
                key={`number-${i}`}
                x={svgSize - 10}
                y={margin + i * cellSize}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fill="#666"
              >
                {number}
              </text>
            ))}
          </>
        )}
      </svg>
    </div>
  );
}