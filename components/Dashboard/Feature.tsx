import { Label } from '@radix-ui/react-label';
import React from 'react';

const Feature = () => {
  return (
    <div>
      <div>
        <Label htmlFor="feature">Features & Perks</Label>
        <FeatureCard />
      </div>
    </div>
  );
};

export default Feature;

const FeatureCard = () => {
  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-6 w-45 h-20">
        <h2 className="text-xl font-semibold mb-2">Feature Title</h2>
        <p className="text-gray-600">Description of the feature goes here...</p>
      </div>
    </div>
  );
};
