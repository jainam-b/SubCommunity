import React from "react";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  const handleSave = () => {
    // Add your save functionality here
    console.log("Save button clicked");
  };

  return (
    <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <div className="p-8">
        <div className="flex justify-center mb-6">
          <img 
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg" 
            src={imageUrl} 
            alt={title} 
          />
        </div>
        <h5 className="mb-3 text-2xl font-bold text-center text-gray-900">
          {title}
        </h5>
        <p className="mb-5 text-base text-center text-gray-700">
          {description}
        </p>
        <div className="flex justify-center">
          <button 
            onClick={handleSave}
            className="px-6 py-3 rounded-full bg-blue-500 text-white font-semibold tracking-wide uppercase transform transition-all duration-200 hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;