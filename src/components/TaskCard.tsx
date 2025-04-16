import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Task } from '../types/Task';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'DONE':
        return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white p-4 rounded-lg shadow cursor-move hover:shadow-md transition-all ${
        isDragging ? 'opacity-50 shadow-lg' : ''
      }`}
    >
      <h3 className="font-medium mb-2">{task.title}</h3>
      {task.description && (
        <p className="text-gray-600 text-sm">{task.description}</p>
      )}
      <div className="mt-2 flex items-center justify-between">
        <span className={`text-sm px-2 py-1 rounded ${getStatusColor(task.status)}`}>
          {task.status.replace('_', ' ')}
        </span>
      </div>
    </div>
  );
}; 