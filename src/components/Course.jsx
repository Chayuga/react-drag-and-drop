import React from "react";
import { useDrag } from "react-dnd";

const Course = ({ id, imageTag, title }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      key={id}
      ref={drag}
      className="flex m-2 p-3 bg-slate-500 rounded-lg"
      style={{ border: isDragging ? "3px solid pink" : "0px" }}
    >
      <img src={imageTag} alt="Course Logo" className="mr-5" />
      <p className="text-white">{title}</p>
    </div>
  );
};

export default Course;
