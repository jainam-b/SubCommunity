import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle, setDescription, setImageUrl, DesignState } from "@/app/slices/design/designSlice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ImageUpload from "../ImageUpload";
import { RootState } from "@/app/lib/store";

interface DesignProps {
  designDetails: DesignState;
}

const Design: React.FC<DesignProps> = ({ designDetails }) => {
  const dispatch = useDispatch();
  // const designDetails = useSelector((state: RootState) => state.design);

  useEffect(() => {
    console.log("Design component mounted with state:", designDetails);
  }, [designDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "title") {
      console.log("Dispatching setTitle with:", value);
      dispatch(setTitle(value));
    } else if (name === "description") {
      console.log("Dispatching setDescription with:", value);
      dispatch(setDescription(value));
    }
  };

  const handleImageUpload = (url: string) => {
    console.log("Dispatching setImageUrl with:", url);
    dispatch(setImageUrl(url));
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="semibold text-xl">Design</h1>
      <div className="mt-10">
        <ImageUpload onUpload={handleImageUpload} />
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
          <button onClick={() => window.location.href = "/preview"}>Preview</button>
        </div>
      </div>
    </div>
  );
};

export default Design;
