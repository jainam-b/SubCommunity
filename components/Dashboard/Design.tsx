import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTitle,
  setDescription,
  setImageUrl,
  DesignState,
  setHasChanged,
  undo
} from "@/app/slices/design/designSlice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ImageUpload from "../ImageUpload";
import { Button } from "@/components/ui/button";
import { RootState } from "@/app/lib/store";
import Feature from "./Feature";

interface DesignProps {
  designDetails: DesignState;
}

const Design: React.FC<DesignProps> = ({ designDetails }) => {
  const dispatch = useDispatch();
  const design = useSelector((state: RootState) => state.design);
  const handleUndo = () => {
    dispatch(undo());
  };
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
    dispatch(setHasChanged(true))
  };

  const handleImageUpload = (url: string) => {
    console.log("Dispatching setImageUrl with:", url);
    dispatch(setImageUrl(url));
  };

  return (
    <div className="flex flex-col space-y-4 ">
      <h1 className="semibold text-xl">Design</h1>
      <div className="mt-10 mb-4">
        <ImageUpload onUpload={handleImageUpload} />
        <div className="mt-10 mb-4 mx-6 sm:mx-0 text-black">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={designDetails.title}
            onChange={handleInputChange}
            placeholder="Enter title"
          />
          <div className="mt-4"><Label htmlFor="description">Description</Label></div>
          <Input
            id="description"
            name="description"
            value={designDetails.description}
            onChange={handleInputChange}
            placeholder="Enter description"
          />
         {design.hasChange && (
           <div className="flex flex-row  justify-center items-center ">
           <Button onClick={()=>{dispatch(setHasChanged(false))}} className="mt-4 w-full mx-1">Save</Button>
           <Button onClick={handleUndo} className="mt-4 w-full mx-1 bg-black text-white border border-2 border-white">
             Cancel
           </Button>
         </div>
         )}
        </div>
        {/* <div><button onClick={()=>{window.location.href=("/preview")}}>Publish </button></div> */}
      </div>
        <Feature/>
    </div>
  );
};

export default Design;