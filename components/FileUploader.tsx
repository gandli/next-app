// components/FileUploader.tsx
"use client";

import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileIcon, UploadIcon } from "lucide-react";
import Image from "next/image";

interface FileUploaderProps {
  acceptedFileTypes?: string;
  maxFileSizeInBytes?: number;
  uploadUrl?: string;
  onUploadSuccess?: (url: string) => void;
  onUploadError?: (error: Error) => void;
  buttonText?: {
    idle: string;
    uploading: string;
  };
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  acceptedFileTypes = "*",
  maxFileSizeInBytes = 5 * 1024 * 1024, // 默认 5MB
  uploadUrl = "/api/upload",
  onUploadSuccess,
  onUploadError,
  buttonText = { idle: "上传", uploading: "上传中..." },
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (
      selectedFile &&
      selectedFile.size <= maxFileSizeInBytes &&
      (acceptedFileTypes === "*" || selectedFile.type.match(acceptedFileTypes))
    ) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError("选择的文件不符合要求（类型或大小限制）。");
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUploadedUrl(data.url);
        onUploadSuccess?.(data.url);
      } else {
        throw new Error(data.error || "文件上传失败");
      }
    } catch (error) {
      console.error("上传出错:", error);
      setError(error instanceof Error ? error.message : "未知错误");
      onUploadError?.(error instanceof Error ? error : new Error("未知错误"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
          disabled={uploading}
          className="flex-grow"
        />
        <Button
          type="button"
          onClick={handleFileUpload}
          disabled={!file || uploading}
        >
          {uploading ? (
            <>
              <FileIcon className="mr-2 h-4 w-4 animate-spin" />
              {buttonText.uploading}
            </>
          ) : (
            <>
              <UploadIcon className="mr-2 h-4 w-4" />
              {buttonText.idle}
            </>
          )}
        </Button>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {uploadedUrl && (
        <Alert>
          <AlertDescription>
            已上传的文件:{" "}
            <a
              href={uploadedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {uploadedUrl}
            </a>
            {uploadedUrl.endsWith(".jpg") || uploadedUrl.endsWith(".png") ? (
              <div className="relative h-72">
                <Image
                  src={uploadedUrl}
                  alt="Uploaded Image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 添加 sizes 属性
                  style={{ objectFit: "contain" }}
                />
              </div>
            ) : null}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FileUploader;
