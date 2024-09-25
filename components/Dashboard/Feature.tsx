import { Label } from '@radix-ui/react-label';
import React from 'react';

const Feature = () => {
  return (
    <div className="space-y-4">
      <Label htmlFor="feature" className="text-lg font-semibold">Features & Perks</Label>
      <FeatureCard imageURL="🌏" title='Access to members only event' description="Join in-person events in London, Paris, Berlin and Switzerland. You can also join remotely so you don't miss out" />
      <FeatureCard imageURL="⚡" title='Bonus Content' description="Exclusive images and videos that you'll see nowhere else" />
      <FeatureCard imageURL="🤝" title='1 on 1 Access To Me' description="Chat with me directly about your business goals and where you want to be over the next few years" />
      <FeatureCard imageURL="📹" title='Weekly Livestreams' description="Jump into live Q&A livestreams where I'll personally break down business objectives and provide advice" />
    </div>
  );
};

interface FeatureCardProps {
  imageURL: string;
  title: string;
  description: string;
  style?:boolean;
}

export const FeatureCard = ({ imageURL, title, description,style }: FeatureCardProps) => {
  const borderClass = !style ? 'shadow-lg border border-gray-200' : '';
  
  return (
    <div className={`bg-white rounded-lg p-4 ${borderClass}`}>
      <div className="flex items-start space-x-4">
        <div className="bg-gray-200 w-12 h-12 flex-shrink-0 flex justify-center items-center rounded-lg">
          <p className="text-2xl">{imageURL}</p>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-md font-semibold">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Feature;