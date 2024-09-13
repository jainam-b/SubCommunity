import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import Left from "./Design";
import Right from "./Preview";

const DesignContent = () => {
  const designDetails = useSelector((state: RootState) => state.design);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <Left designDetails={designDetails} />
      </div>
      <div>
        <Right designDetails={designDetails} />
      </div>
    </div>
  );
};

export default DesignContent;
