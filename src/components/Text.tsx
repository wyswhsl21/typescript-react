import React from "react";

interface TextProps {
  completed?: boolean;
}

const Text = ({ completed }: TextProps) => {
  return (
    <>
      <div className={`text ${completed ? "completedText" : ""}`}></div>
    </>
  );
};

export default Text;
