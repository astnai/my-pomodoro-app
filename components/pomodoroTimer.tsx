"use client";

import React, { useState, useEffect, useRef } from 'react';

const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [inputMinutes, setInputMinutes] = useState<number>(25);
  const [pomodoroCount, setPomodoroCount] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              clearInterval(intervalRef.current as NodeJS.Timeout);
              setIsActive(false);
              setPomodoroCount((prevCount) => prevCount + 1);
              if (audioRef.current) {
                audioRef.current.play();
              }
              return 0;
            } else {
              setMinutes((prevMinutes) => prevMinutes - 1);
              return 59;
            }
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, minutes]);

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    setIsActive(false);
    setMinutes(inputMinutes);
    setSeconds(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = Number(e.target.value);
    setInputMinutes(newMinutes);
    if (!isActive) {
      setMinutes(newMinutes);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (typeof window !== 'undefined') {
      if (!isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="text-6xl font-bold mb-4">
        {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
      </div>
      <div className="mb-4">
        <label htmlFor="minutes" className="mr-2">Set Minutes:</label>
        <input
          type="number"
          id="minutes"
          value={inputMinutes}
          onChange={handleInputChange}
          className="border rounded px-2 py-1"
        />
      </div>
      <div>
        <button onClick={handleStart} className="bg-green-500 text-white px-4 py-2 mr-2 rounded">
          Start
        </button>
        <button onClick={handlePause} className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded">
          Pause
        </button>
        <button onClick={handleReset} className="bg-red-500 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>
      <div className="mt-4">
        <p>Pomodoro Count: {pomodoroCount}</p>
        <p>Block Progress: {Math.floor(pomodoroCount / 4)}</p>
      </div>
      <div className="mt-4">
        <button onClick={toggleDarkMode} className="px-4 py-2 border rounded">
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>
      <audio ref={audioRef} src="/bell.wav" preload="auto"></audio>
    </div>
  );
};

export default PomodoroTimer;
