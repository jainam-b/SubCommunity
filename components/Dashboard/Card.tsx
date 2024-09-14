import React, { useState } from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSave = () => {
    // Add your save functionality here
    console.log("Save button clicked");
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      <div className="w-[390px] bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
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
          <div className="mb-5 text-base text-center text-gray-700 h-20 overflow-hidden">
            <p>{description}</p>
          </div>
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
      {description.length > 100 && (
        <button
          onClick={handleToggleExpand}
          className="mt-2 text-blue-500 hover:text-blue-600 focus:outline-none"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}
      {isExpanded && (
        <div className="mt-4 p-4 bg-white rounded-xl shadow-lg">
          <p className="text-gray-700">{description}</p>
        </div>
      )}
    </div>
  );
};

export default Card;