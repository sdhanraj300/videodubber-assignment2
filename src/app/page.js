"use client";
import Upload from "./components/Upload";
import Canvas from "./components/Canvas";
import Timeline from "./components/Timeline"; // Use your own Timeline component

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      {/* Top Section (90% height) */}
      <div className="flex h-[90%]">
        {/* Left Panel - Upload (1/3 width) */}
        <div className="w-1/3 p-4 bg-gray-100 border-r">
          <p className="font-semibold text-lg mb-2">Add A Media</p>
          <Upload />
        </div>

        {/* Right Panel - Canvas (2/3 width) */}
        <div className="w-2/3 p-4 bg-gray-200 flex items-center justify-center">
          <Canvas />
        </div>
      </div>

      {/* Bottom Timeline Section (10% height) */}
        <div className="w-full h-[10%]  flex items-center justify-center">
        <Timeline />
      </div>
    </main>
  );
}
