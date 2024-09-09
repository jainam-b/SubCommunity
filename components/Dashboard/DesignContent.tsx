import React, { useState } from "react";
import ImageUpload from "../ImageUpload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/app/lib/utils";
import Card from "./Card";

const DesignContent = () => {
  // State to track the design details
  const [designDetails, setDesignDetails] = useState({
    title: "",
    description: "",
    image: "", // for image handling later
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <Left
          designDetails={designDetails}
          setDesignDetails={setDesignDetails}
        />
      </div>
      <div>
        <Right designDetails={designDetails} />
      </div>
    </div>
  );
};

export default DesignContent;
export interface Type {
  designDetails: {
    title: string;
    description: string;
    imageUrl: string | null;
  };
  setDesignDetails: React.Dispatch<React.SetStateAction<any>>;
  e:any
}
// Left Component for input
const Left = ({ designDetails, setDesignDetails }:Type) => {
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setDesignDetails((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="semibold text-xl">Design</h1>
      <div className="mt-10">
      <ImageUpload setDesignDetails={setDesignDetails} />
        <div className="mt-10">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={designDetails.title}
            onChange={handleInputChange}
            placeholder="Enter title"
          />

          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            value={designDetails.description}
            onChange={handleInputChange}
            placeholder="Enter description"
          />
        </div>
      </div>
    </div>
  );
};

// Right Component for real-time preview
const Right = ({ designDetails }) => {
  return (
    <div>
      <h1 className="semibold text-xl">Preview</h1>
      <Card
        title={designDetails.title}
        description={designDetails.description}
        imageUrl={designDetails.imageUrl} // this can be handled with the ImageUpload logic later
      />
    </div>
  );
};
