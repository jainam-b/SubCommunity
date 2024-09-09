"use client"
import { useParams } from 'next/navigation';
import React from 'react';

const TitlePage = async () => {
  const { title } = useParams();

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center">Title Page</h1>
      <div className="text-center mt-5">
        <p>The title is: {title}</p>
        {/* Here you can fetch and display content based on the title */}
      </div>
    </div>
  );
};

export default TitlePage;
