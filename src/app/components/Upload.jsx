"use client";
import { useState } from "react";
import { Input } from "@mantine/core";
import { useDropzone } from "react-dropzone";
import { IconUpload } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
import useMediaStore from "../store";

const Upload = () => {
  const [text, setText] = useState(""); 
  const addMedia = useMediaStore((state) => state.addMedia);
  const updateMedia = useMediaStore((state) => state.updateMedia);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);
    const id = uuidv4();
    const isImage = file.type.startsWith("image");

    const mediaObject = {
      id,
      type: isImage ? "image" : "video",
      url,
      startTime: 0,
      endTime: isImage ? 10 : 0,
    };

    addMedia(mediaObject);

    if (!isImage) {
      const player = document.createElement("video");
      player.src = url;
      player.onloadedmetadata = () => {
        updateMedia(id, { endTime: player.duration });
      };
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,video/*",
    onDrop,
  });

  return (
    <div className="w-full flex flex-col items-center">
      {/* Upload Section */}
      <div
        {...getRootProps()}
        className="bg-gray-100/90 flex items-center justify-center flex-col border-dotted border-2 duration-150 hover:cursor-pointer hover:bg-gray-200 rounded-xl h-50 w-full p-5"
      >
        <input {...getInputProps()} />
        <IconUpload size={40} color="#776" className="text-sm mx-auto mb-2" />
        <span className="font-bold text-sm">Upload A File</span>
        <div className="text-sm font-extralight">Drag & Drop</div>
      </div>

      <p>
        <span className="font-semibold">Note:</span> You can also enter the
        height and width of the media in the input below.
      </p>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Height and Width Separated by Comma"
        className="mt-4 w-full border-2 p-2 rounded-lg"
      />
    </div>
  );
};

export default Upload;
