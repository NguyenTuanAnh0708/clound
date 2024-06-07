import { useEffect, useState } from 'react';
import './App.css'
import { data } from './assets/db'
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DataView } from 'primereact/dataview';

const Card = ({ info }) => {
  const { setNodeRef, transform, listeners, attributes, transition, isDragging } = useSortable({ id: info.id });
  console.log(transform)
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  // console.log(style)
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='card-info'>
      {info.name}
    </div>
  )
}
const ImageList = props => {
  const [courses, setCourses] = useState(data)
  useEffect(() => {
    setTimeout(() => {
      setCourses(data)
    }, 1000)
  }, [])
  const handelDragEnd = (event) => {
    const { active, over } = event
    console.log({ active }, { over })
    if (active.id !== over.id) {
      setCourses((items) => {
        console.log(items)
        const activeIndex = items.findIndex(item => {
          console.log(item)
          return item.id == active.id
        });
        const overIndex = items.findIndex(item => item.id == over.id);
        console.log(activeIndex)
        console.log(overIndex)
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
        // items: [2, 3, 1]   0  -> 2
        // [1, 2, 3] oldIndex: 0 newIndex: 2  -> [2, 3, 1] 
      });

    }
  }
  const itemTemplate = (course) => !course ? null : <Card key={course.id} info={course} />;
  return (
    <div className="cards">
      <DndContext collisionDetection={closestCenter} onDragEnd={handelDragEnd}>
        <SortableContext
          items={courses}
          strategy={horizontalListSortingStrategy}
        >
          <DataView value={courses} itemTemplate={itemTemplate} layout="grid" />

        </SortableContext>
      </DndContext>
    </div>
  )

}

function App() {

  return (
    <>
      <p>Learning react DND</p>
      <ImageList />

    </>
  )
}

export default App
