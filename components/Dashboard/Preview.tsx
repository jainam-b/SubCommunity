import React from "react";
import Card from "./Card";

const Preview = ({ designDetails }: { designDetails: any }) => {
  return (
    <div>
      <h1 className="semibold text-xl mb-6">Preview</h1>
      <div className="flex justify-center items-center">
        <Card
          title={designDetails.title}
          description={designDetails.description}
          imageUrl={designDetails.imageUrl || ""}
        />
      </div>
    </div>
  );
};

export default Preview;
