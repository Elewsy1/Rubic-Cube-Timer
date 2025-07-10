import React, { useState, useEffect } from 'react';
import ScrambleGenerator from '../components/ScrambleGenerator'

interface TimerProps {
  onSave: (time: number) => void;
}

export default function Timer({ onSave }: TimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [readyToStart, setReadyToStart] = useState(false); // 判断是否等待开始
  const [trigger, setTrigger] = useState(Date.now()); // 用来触发 scramble 更新

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && startTime !== null) {
      timer = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    return () => clearInterval(timer);
  }, [isRunning, startTime]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();

        if (isRunning) {
          // 按下空格时结束计时
          const finalTime = Date.now() - (startTime ?? Date.now());
          setIsRunning(false);
          setTime(finalTime);
          onSave(finalTime);
          setReadyToStart(false); // 需要重新抬起空格才能开始
        } else {
          // 处于等待中，不做任何事
          setReadyToStart(true);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();

        if (!isRunning && readyToStart) {
          // 抬起空格时开始计时
          const now = Date.now();
          setStartTime(now);
          setTime(0);
          setIsRunning(true);
          setReadyToStart(true); // 表示已经开始，不允许再次开始直到下一次结束
        }else{
          setTrigger(Date.now());
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isRunning, startTime, readyToStart]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${seconds}.${centiseconds.toString().padStart(2, '0')}s`;
  };

  return (
    <div style={{ fontSize: '4rem', paddingTop: '20px', textAlign: 'center' }}>
      <ScrambleGenerator trigger={trigger} />
      <div>{formatTime(time)}</div>
      <div style={{ fontSize: '1.2rem' }}>
        Press and release space to start, press again to stop
      </div>
    </div>
  );
}
