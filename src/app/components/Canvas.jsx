"use client";
import React, { useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Rnd } from "react-rnd";
import useMediaStore from "../store";
import { Button } from "@mantine/core";
import { FaBolt, FaCheck } from "react-icons/fa";

const Canvas = () => {
  const playerRef = useRef(null);
  const mediaFiles = useMediaStore((state) => state.mediaFiles);
  const {
    currentTime,
    setCurrentTime,
    duration,
    isPlaying,
    position,
    size,
    setPosition,
    setSize,
  } = useMediaStore();

  const lastMedia =
    mediaFiles.length > 0 ? mediaFiles[mediaFiles.length - 1] : null;

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(currentTime, "seconds");
    }
  }, [currentTime]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-between items-center px-3 mx-3 py-3 bg-gray-200">
        <p className="font-bold text-2xl">First Project</p>
        <div className="flex gap-3 items-center">
          <Button className="px-6 py-3 bg-gray-400 text-black font-semibold rounded-lg flex items-center justify-center transition duration-200 hover:bg-gray-500">
            Login To Save Progress
          </Button>

          <Button className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg flex items-center justify-center transition duration-200 hover:bg-yellow-600">
            Upgrade
            <FaBolt className="text-yellow-800 ml-2" size={18} />
          </Button>

          <Button className="px-6 py-3 bg-black text-white font-semibold rounded-lg flex items-center justify-center transition duration-200 hover:bg-gray-900">
            Done
            <FaCheck className="text-green-400 ml-2" size={18} />
          </Button>
        </div>
      </div>

      <div className="bg-black h-3/4 relative overflow-hidden">
        {lastMedia ? (
          <Rnd
            bounds="parent"
            size={{ width: size.width, height: size.height }}
            position={{ x: position.x, y: position.y }}
            onDragStop={(e, d) => setPosition(d.x, d.y)}
            onResizeStop={(e, direction, ref, delta, position) => {
              setSize(ref.offsetWidth, ref.offsetHeight);
              setPosition(position.x, position.y);
            }}
            className="border border-gray-500"
          >
            {lastMedia.type === "video" ? (
              <ReactPlayer
                ref={playerRef}
                url={lastMedia.url}
                // controls
                width="100%"
                height="100%"
                playing={isPlaying}
                onProgress={(state) => setCurrentTime(state.playedSeconds)}
                onDuration={(dur) => useMediaStore.getState().setDuration(dur)}
              />
            ) : (
              <img
                src={lastMedia.url}
                alt="Uploaded"
                className="w-full h-full object-contain"
              />
            )}
          </Rnd>
        ) : (
          <p className="text-gray-400 text-center">No media uploaded</p>
        )}
      </div>
    </div>
  );
};

export default Canvas;
