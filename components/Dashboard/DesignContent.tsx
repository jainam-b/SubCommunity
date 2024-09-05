import React from "react";
import ImageUpload from "../ImageUpload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/app/lib/utils";
const DesignContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <Left />
      </div>
      <div>
        <Right />
      </div>
    </div>
  );
};

export default DesignContent;

const Left = () => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="semibold text-xl">Design</h1>
      <div className="mt-10">
        <ImageUpload />
       

        
      </div>
    </div>
  );
};

const Right = () => {
  return (
    <div>
      <h1 className="semibold text-xl">Preview</h1>
    </div>
  );
};


