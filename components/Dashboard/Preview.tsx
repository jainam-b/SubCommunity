import React from "react";
import Card from "./Card";

const Preview = ({ designDetails }: { designDetails: any }) => {
  return (
    <div>
      <h1 className="semibold text-xl">Preview</h1>
      <Card
        title={designDetails.title}
        description={designDetails.description}
        imageUrl={designDetails.imageUrl} // Preview the uploaded image
      />
    </div>
  );
};

export default Preview;
