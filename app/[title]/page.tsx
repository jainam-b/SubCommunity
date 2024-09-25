"use client";
import React, { useEffect } from 'react';
import Card from "@/components/Dashboard/Card";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";

const Page = () => {
  const design = useSelector((state: RootState) => state.design);

  useEffect(() => {
    console.log('Page component mounted with design state:', design);
  }, []);

  useEffect(() => {
    console.log('Design state changed:', design);
  }, [design.title, design.description, design.imageUrl]);

  return (
    <div className="flex h-screen justify-center bg-white items-center">
      <Card title={design.title} description={design.description} imageUrl={design.imageUrl || ""} />
    </div>
  );
};

export default Page;