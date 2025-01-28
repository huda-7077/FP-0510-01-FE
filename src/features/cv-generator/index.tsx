"use client";
import React from "react";
import dynamic from "next/dynamic";

const CVGenerator = dynamic(() => import("./components/CVGenerator"), {
  ssr: false,
});

const CVGeneratorPage = () => {
  return <CVGenerator />;
};

export default CVGeneratorPage;
