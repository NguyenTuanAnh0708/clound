import React from 'react'
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
export const Card = ({ info }) => {
    const { setNodeRef, transform, listeners, attributes, transition } = useSortable({ id: info.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='card-info'>
            {info.name}
        </div>
    )
}
