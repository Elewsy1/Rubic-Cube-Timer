import React, { useEffect, useState } from 'react';

type Props = {
  trigger: number; // 每次计时停止时改变的值（例如时间戳）
};

export default function ScrambleGenerator({ trigger }: Props) {
  const [scramble, setScramble] = useState(generateScramble());

  useEffect(() => {
    setScramble(generateScramble());
  }, [trigger]); // 每当 trigger 改变时自动生成新的 scramble

  const handleRegenerate = () => {
    setScramble(generateScramble());
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{scramble}</div>
      <button onClick={handleRegenerate}>🔄 Next Scramble</button>
    </div>
  );
}

function generateScramble(): string {
  const moves = ['R', 'L', 'U', 'D', 'F', 'B'];
  const modifiers = ["", "'", "2"];
  const sequence: string[] = [];
  for (let i = 0; i < 20; i++) {
    const move = moves[Math.floor(Math.random() * moves.length)];
    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    if (i === 0 || sequence[i - 1][0] !== move) {
      sequence.push(move + modifier);
    } else {
      i--;
    }
  }
  return sequence.join(' ');
}
