import React from "react";
import { FeatureCard } from "./Feature";

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
    <div className="w-full max-w-md lg:max-w-lg bg-white rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-6 lg:p-8 flex-grow flex flex-col items-center overflow-hidden">
        <div className="flex justify-center mb-6">
          <img 
            className="w-28 h-28 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-blue-500" 
            src={imageUrl} 
            alt={title} 
          />
        </div>
        <h5 className="mb-3 text-xl lg:text-2xl font-bold text-center text-gray-900">
          {title}
        </h5>
        <p className="mb-5 text-sm lg:text-base text-center text-gray-700">
          {description}
        </p>
        <div className="w-full flex-grow overflow-y-auto scrollbar-hide space-y-4 mb-6">
          <FeatureCard imageURL="🌏" title='Access to members only event' description="Join in-person events in London, Paris, Berlin and Switzerland. You can also join remotely so you don't miss out" style={true} />
          <FeatureCard imageURL="⚡" title='Bonus Content' description="Exclusive images and videos that you'll see nowhere else" style={true} />
          <FeatureCard imageURL="🤝" title='1 on 1 Access To Me' description="Chat with me directly about your business goals and where you want to be over the next few years" style={true} />
          <FeatureCard imageURL="📹" title='Weekly Livestreams' description="Jump into live Q&A livestreams where I'll personally break down business objectives and provide advice" style={true} />
        </div>
      </div>
      <div className="p-4 mt-auto">
        <button 
          onClick={handleSave}
          className="w-full px-6 py-3 rounded-full bg-blue-500 text-white font-semibold tracking-wide uppercase transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Card;