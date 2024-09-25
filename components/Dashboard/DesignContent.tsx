import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import Design from "./Design";
import Preview from "./Preview";

const DesignContent: React.FC = () => {
  const designDetails = useSelector((state: RootState) => state.design);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full overflow-y-auto">
      {/* Design component with scroll */}
      <div className="overflow-y-auto md:max-h-screen p-4 rounded-lg scrollbar-hidden touch-auto h-auto">
        <Design designDetails={designDetails} />
      </div>
      {/* Preview component with flex and proper height */}
      <div className="p-4 rounded-lg h-auto md:h-full overflow-y-auto scrollbar-hidden ">
        <Preview designDetails={designDetails} />
      </div>
    </div>
  );
};

export default DesignContent;
