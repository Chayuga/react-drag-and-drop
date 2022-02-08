import React, { useState } from "react";
import { CourseData } from "./assets/CourseData";
import { useDrop } from "react-dnd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  //   ========================= movable Items =============================

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(board);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onEnd = (result) => {
    console.log(result);
    setBoard(reorder(board, result.source.index, result.destination.index));
  };

  // ========================== End movable Items ==========================

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
        <DragDropContext onDragEnd={onEnd}>
          <Droppable droppableId="1234">
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                {board.map((course, index) => {
                  return (
                    <Draggable
                      draggableId={`${course.id}`}
                      key={course.title}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Course src={course.imageTag} title={course.title} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DragDrop;
