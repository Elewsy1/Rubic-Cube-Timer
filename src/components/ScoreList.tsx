import React from 'react';

interface ScoreListProps {
  scores: number[];
  groupName: string
}

const formatTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${seconds}.${centiseconds.toString().padStart(2, '0')}s`;
};

export default function ScoreList({ scores, groupName }: ScoreListProps) {
  return (
    <div style={{
      maxHeight: '300px',
      overflowY: 'auto',
      border: '1px solid #ccc',
      padding: '10px',
      width: '200px'
    }}>
      <h4>Scores of {groupName}</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {scores.slice().reverse().map((time, index) => (
          <li key={index}>{formatTime(time)}</li>
        ))}
      </ul>
    </div>
  );
}
