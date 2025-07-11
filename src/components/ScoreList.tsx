import React, { useState } from 'react';

interface ScoreListProps {
  scores: number[];
  groupName: string;
  onDeleteLastN: (n: number) => void;
  onDeleteAll: () => void;
}

const formatTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${seconds}.${centiseconds.toString().padStart(2, '0')}s`;
};

export default function ScoreList({ scores, groupName, onDeleteLastN, onDeleteAll }: ScoreListProps) {
  const [n, setN] = useState(1);

  return (
    <div
      style={{
        width: '220px',
        border: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h4 style={{ margin: '10px auto 5px auto' }}>Scores of {groupName}</h4>

      {/* 滚动成绩区域 */}
      <div
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          padding: '10px',
          borderTop: '1px solid #eee',
          borderBottom: '1px solid #eee',
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {scores.slice().reverse().map((time, index) => (
            <li key={index}>{formatTime(time)}</li>
          ))}
        </ul>
      </div>

      {/* 固定操作按钮区域 */}
      <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            style={{ width: '50px', marginRight: '5px' }}
            min={1}
          />
          <button onClick={() => onDeleteLastN(n)}>Delete Last {n}</button>
        </div>
        <button onClick={onDeleteAll}>Delete All</button>
      </div>
    </div>
  );
}
