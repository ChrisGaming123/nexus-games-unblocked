/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

type Grid = number[][];

const GRID_SIZE = 4;

const App2048 = () => {
  const [grid, setGrid] = useState<Grid>(() => {
    const initialGrid = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
    return addRandomTile(addRandomTile(initialGrid));
  });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);

  function addRandomTile(currentGrid: Grid): Grid {
    const emptyCells: [number, number][] = [];
    currentGrid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell === 0) emptyCells.push([r, c]);
      });
    });

    if (emptyCells.length === 0) return currentGrid;

    const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newGrid = currentGrid.map((row) => [...row]);
    newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
    return newGrid;
  }

  const move = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver) return;

    let moved = false;
    let newScore = score;
    let newGrid = grid.map(row => [...row]);

    const rotate = (matrix: Grid) => {
      return matrix[0].map((_, index) => matrix.map(row => row[index]).reverse());
    };

    // Normalize to left move
    let rotations = 0;
    if (direction === 'up') rotations = 3;
    if (direction === 'right') rotations = 2;
    if (direction === 'down') rotations = 1;

    for (let i = 0; i < rotations; i++) {
      newGrid = rotate(newGrid);
    }

    // Process rows (move left)
    const processedGrid = newGrid.map((row) => {
      let newRow = row.filter(val => val !== 0);
      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          newScore += newRow[i];
          newRow.splice(i + 1, 1);
          moved = true;
        }
      }
      while (newRow.length < GRID_SIZE) {
        newRow.push(0);
      }
      if (JSON.stringify(row) !== JSON.stringify(newRow)) moved = true;
      return newRow;
    });

    newGrid = processedGrid;

    // Rotate back
    const reverseRotations = (4 - rotations) % 4;
    for (let i = 0; i < reverseRotations; i++) {
      newGrid = rotate(newGrid);
    }

    if (moved) {
      const gridWithNewTile = addRandomTile(newGrid);
      setGrid(gridWithNewTile);
      setScore(newScore);
      
      // Check game over
      if (isGameOver(gridWithNewTile)) {
        setGameOver(true);
      }
    }
  }, [grid, score, gameOver]);

  const isGameOver = (currentGrid: Grid) => {
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (currentGrid[r][c] === 0) return false;
        if (r < GRID_SIZE - 1 && currentGrid[r][c] === currentGrid[r + 1][c]) return false;
        if (c < GRID_SIZE - 1 && currentGrid[r][c] === currentGrid[r][c + 1]) return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasVisited) return;
      if (['ArrowUp', 'w', 'W'].includes(e.key)) { e.preventDefault(); move('up'); }
      if (['ArrowDown', 's', 'S'].includes(e.key)) { e.preventDefault(); move('down'); }
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) { e.preventDefault(); move('left'); }
      if (['ArrowRight', 'd', 'D'].includes(e.key)) { e.preventDefault(); move('right'); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move, hasVisited]);

  const resetGame = () => {
    const initialGrid = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
    setGrid(addRandomTile(addRandomTile(initialGrid)));
    setScore(0);
    setGameOver(false);
  };

  const getTileColor = (value: number) => {
    switch (value) {
      case 2: return 'bg-zinc-800 text-zinc-100';
      case 4: return 'bg-zinc-700 text-zinc-100';
      case 8: return 'bg-orange-500 text-white';
      case 16: return 'bg-orange-600 text-white';
      case 32: return 'bg-orange-700 text-white';
      case 64: return 'bg-orange-800 text-white';
      case 128: return 'bg-yellow-500 text-white text-2xl';
      case 256: return 'bg-yellow-400 text-white text-2xl';
      case 512: return 'bg-yellow-300 text-white text-2xl';
      case 1024: return 'bg-yellow-200 text-zinc-900 text-xl';
      case 2048: return 'bg-yellow-100 text-zinc-900 text-xl';
      default: return 'bg-zinc-900 text-zinc-500';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl relative">
      <AnimatePresence>
        {!hasVisited && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md z-50 flex flex-col items-center justify-center rounded-2xl cursor-pointer"
            onClick={() => setHasVisited(true)}
          >
            <div className="w-16 h-16 bg-[#00ffa3] rounded-full flex items-center justify-center animate-bounce shadow-[0_0_30px_rgba(0,255,163,0.5)]">
               <Play className="w-8 h-8 text-zinc-950 fill-zinc-950 ml-1" />
            </div>
            <p className="mt-4 font-black uppercase tracking-tighter text-[#00ffa3] text-xl italic drop-shadow-lg">Click to Play 2048</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between w-full mb-6 items-center">
        <div>
          <h2 className="text-4xl font-black text-cyan-400 tracking-tighter">2048</h2>
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Puzzle Arcade</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800 text-center min-w-[80px]">
            <p className="text-[10px] uppercase text-zinc-500 font-bold">Score</p>
            <p className="text-xl font-mono text-cyan-400">{score}</p>
          </div>
          <button 
            onClick={resetGame}
            className="bg-cyan-500 hover:bg-cyan-400 transition-colors text-zinc-950 px-4 py-2 rounded-lg font-bold uppercase text-xs"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="relative bg-zinc-900 p-2 rounded-xl border-4 border-zinc-800 grid grid-cols-4 gap-2 w-[320px] h-[320px]">
        {grid.map((row, r) => (
          row.map((cell, c) => (
            <div key={`${r}-${c}`} className="w-16 h-16 bg-zinc-800/50 rounded-lg flex items-center justify-center relative overflow-hidden">
               {cell !== 0 && (
                <motion.div
                  layoutId={`tile-${cell}-${r}-${c}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`absolute inset-0 flex items-center justify-center font-black text-3xl rounded-lg shadow-lg ${getTileColor(cell)}`}
                >
                  {cell}
                </motion.div>
               )}
            </div>
          ))
        ))}

        <AnimatePresence>
          {gameOver && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-10"
            >
              <h3 className="text-3xl font-black text-red-500 mb-4 tracking-tighter uppercase italic">Game Over</h3>
              <button 
                onClick={resetGame}
                className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 px-6 py-2 rounded-full font-bold uppercase transition-all transform hover:scale-105"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 text-zinc-500 text-[10px] font-mono uppercase text-center opacity-60">
        Use Arrow Keys or WASD to slide tiles
      </div>
    </div>
  );
};

export default App2048;
