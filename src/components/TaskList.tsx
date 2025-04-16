import React from 'react';
import { Task } from '../types/Task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const todoTasks = tasks.filter(task => task.status === 'TODO');
  const doneTasks = tasks.filter(task => task.status === 'DONE');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">To Do</h2>
        <div className="space-y-2">
          {todoTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">Done</h2>
        <div className="space-y-2">
          {doneTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 