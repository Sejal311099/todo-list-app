import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Task } from '../types/Task';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  tasks: Task[];
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ title, status, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div className={`bg-white rounded-lg shadow p-4 transition-colors ${
      isOver ? 'bg-blue-50' : ''
    }`}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div
        ref={setNodeRef}
        className={`min-h-[200px] space-y-2 transition-colors ${
          isOver ? 'border-2 border-dashed border-blue-500 rounded-lg p-2' : ''
        }`}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="text-gray-500 text-center py-4">
            {isOver ? 'Drop here' : 'No tasks in this column'}
          </div>
        )}
      </div>
    </div>
  );
}; 