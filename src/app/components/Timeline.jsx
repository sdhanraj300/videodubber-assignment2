"use client";
import React from "react";
import {
  FaPlay,
  FaPause,
  FaBackward,
  FaSearchPlus,
  FaSearchMinus,
} from "react-icons/fa";
import useMediaStore from "../store";

const Timeline = () => {
  const { currentTime, duration, isPlaying, togglePlayPause, setCurrentTime } =
    useMediaStore();

  return (
    <div className="timeline w-full flex items-center justify-center ">
      {/* Playback Controls */}
      <div className="flex gap-4 items-center justify-center">
        <button onClick={togglePlayPause} className="rounded  transition">
          {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
        </button>

        <p className="text-sm">
          {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
        </p>
      </div>

      <input
        type="range"
        min="0"
        max={duration}
        step="0.1"
        value={currentTime}
        onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
        className="mx-4  cursor-pointer accent-blue-500"
      />

      {/* Zoom Controls */}
    </div>
  );
};

export default Timeline;
