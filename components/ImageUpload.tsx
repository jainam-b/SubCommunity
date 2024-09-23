import React, { useState, useEffect, useCallback } from "react";

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const loadSavedImage = useCallback(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      setPreview(savedImage);
      onUpload(savedImage);
    }
  }, [onUpload]);

  useEffect(() => {
    loadSavedImage();
  }, [loadSavedImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        localStorage.setItem("uploadedImage", result);
        onUpload(result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
      localStorage.removeItem("uploadedImage");
      onUpload("");
    }
  };

  const handleClick = () => {
    document.getElementById("upload")?.click();
  };

  return (
    <section className="container w-full mx-auto mt-5">
      <div className="max-w-xs">
        <div
          id="image-preview"
          className="w-24 h-24 bg-gray-100 rounded-full cursor-pointer flex items-center justify-center overflow-hidden"
          onClick={handleClick}
          style={{
            backgroundImage: preview ? `url(${preview})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <input
            id="upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          {!preview && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageUpload;