import React, { useState } from "react";
import { CourseData } from "./assets/CourseData";
import { useDrop } from "react-dnd";

import Course from "./Course";

const DragDrop = () => {
  const [board, setBoard] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => addCourseToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addCourseToBoard = (id) => {
    const courseData = CourseData.filter((course) => id === course.id);
    setBoard((board) => [...board, courseData[0]]);
  };

  const removeCourseFromBoard = (id) => {
    const courseData = CourseData.filter((course) => id === course.id);
    const courseRemove = board.indexOf(id);
    if (courseRemove > -1) {
      setBoard(() => {
        board.splice(courseRemove, 1);
      });
    }
  };

  return (
    <div className="flex">
      <div className="h-screen bg-blue-100">
        {CourseData.map((course) => {
          return (
            <Course src={course.imageTag} id={course.id} title={course.title} />
          );
        })}
      </div>
      <div className="flex-grow h-screen bg-red-100" ref={drop}>
        {board.map((course) => {
          return (
            <div id={course.id} className="">
              <button
                onClick={() => removeCourseFromBoard()}
                className="flex bg-red-800 text-white rounded-lg px-3"
              >
                remove
              </button>
              <Course src={course.imageTag} title={course.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DragDrop;
