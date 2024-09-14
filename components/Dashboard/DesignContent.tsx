import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import Design from "./Design";
import Preview from "./Preview";

const DesignContent: React.FC = () => {
  const designDetails = useSelector((state: RootState) => state.design);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mx-4">
      <div className="mt-4 ">
        <Design designDetails={designDetails} />
      </div>
      <div className="mt-10 md:mt-4">
        <Preview designDetails={designDetails} />
      </div>
    </div>
  );
};

export default DesignContent;
