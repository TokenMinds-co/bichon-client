"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useState, useCallback } from "react";

interface ImageUploadedPreviewProps {
  files: File[];
  handleRemove: (index: number) => void;
}

const ImageUploadedPreview = ({
  files,
  handleRemove,
}: ImageUploadedPreviewProps) => {
  const [fullScreenIndex, setFullScreenIndex] = useState<number | null>(null);

  const toggleFullScreen = useCallback((index: number | null) => {
    setFullScreenIndex(index);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        toggleFullScreen(null);
      }
    },
    [toggleFullScreen]
  );

  const handleTruncateFileName = (fileName: string) => {
    const extension = fileName.slice(fileName.lastIndexOf("."));
    const nameWithoutExtension = fileName.slice(0, fileName.lastIndexOf("."));
    if (nameWithoutExtension.length > 30 - extension.length) {
      return `${nameWithoutExtension.slice(
        0,
        30 - extension.length
      )}...${extension}`;
    }
    return fileName;
  };
  return (
    <>
      {files.length > 0 && (
        <div className="mt-4" onKeyDown={handleKeyDown} tabIndex={0}>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Uploaded Files:
          </p>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 p-2 rounded"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="relative w-10 h-10">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Preview of ${file.name}`}
                        layout="fill"
                        className="cursor-pointer rounded-lg w-10 h-10 object-cover transition-transform hover:scale-105"
                        onClick={() => toggleFullScreen(index)}
                      />
                    </div>
                    {fullScreenIndex === index && (
                      <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55"
                        onClick={() => toggleFullScreen(null)}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                        role="button"
                        aria-label="Close full screen preview"
                      >
                        <button
                          className="absolute top-4 right-4 z-10 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFullScreen(null);
                          }}
                          aria-label="Close full screen preview"
                        >
                          <X className="h-8 w-8" />
                        </button>
                        <div className="relative h-full w-full">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`Preview of ${file.name}`}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">
                      {handleTruncateFileName(file.name)} -{" "}
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemove(index)}
                  className="h-6 w-6 rounded-full"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ImageUploadedPreview;
