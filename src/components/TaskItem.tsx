import React from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateTask, onDeleteTask }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateTask(task.id, { status: e.target.value as Task['status'] });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateTask(task.id, { title: e.target.value });
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-4 flex-1">
        <input
          type="text"
          value={task.title}
          onChange={handleTitleChange}
          className="flex-1 px-2 py-1 border rounded"
        />
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="px-2 py-1 border rounded"
        >
          <option value="TODO">To Do</option>
          <option value="DONE">Done</option>
        </select>
      </div>
      <button
        onClick={() => onDeleteTask(task.id)}
        className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}; 