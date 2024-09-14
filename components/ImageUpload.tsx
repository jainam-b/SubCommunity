import React, { useState, useEffect } from "react";

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // On component mount, load the image from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      setPreview(savedImage);
      onUpload(savedImage); // Trigger the onUpload callback with saved image
    }
  }, [onUpload]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;

    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const result = e.target.result as string;
          setPreview(result);
          localStorage.setItem("uploadedImage", result); // Save image to localStorage
          onUpload(result); 
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setPreview(null);
      localStorage.removeItem("uploadedImage"); // Clear localStorage if no file
      onUpload(""); 
    }
  };

  const handleClick = () => {
    const uploadInput = document.getElementById("upload");
    if (uploadInput) uploadInput.click();
  };

  return (
    <section className="container w-full mx-auto mt-5">
      <div className="max-w-xs">
        <div
          id="image-preview"
          className="w-24 h-24 bg-gray-100 rounded-full cursor-pointer flex items-center justify-center overflow-hidden"
          onClick={handleClick}
        >
          <input
            id="upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview ? (
            <img
              src={preview}
              className="w-full h-full object-cover rounded-full"
              alt="Image preview"
              style={{ width: "96px", height: "96px", objectFit: "cover" }}
            />
          ) : (
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
