import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import Design from "./Design";
import Preview from "./Preview";

const DesignContent: React.FC = () => {
  const designDetails = useSelector((state: RootState) => state.design);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <Design designDetails={designDetails} />
      </div>
      <div>
        <Preview designDetails={designDetails} />
      </div>
    </div>
  );
};

export default DesignContent;
