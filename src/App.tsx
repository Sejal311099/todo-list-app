import React, { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners } from '@dnd-kit/core';
import { Task } from './types/Task';
import { api } from './services/api';
import { TaskColumn } from './components/TaskColumn';
import { TaskCard } from './components/TaskCard';
import { NewTaskModal } from './components/NewTaskModal';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await api.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newTask = await api.createTask(task);
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const task = tasks.find((t) => t.id === active.id);
      if (task) {
        const newStatus = over.id as Task['status'];
        try {
          const updatedTask = await api.updateTask(task.id, {
            status: newStatus,
          });
          setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
          );
        } catch (err) {
          setError('Failed to update task status');
          console.error(err);
        }
      }
    }
    setActiveTask(null);
  };

  const getTasksByStatus = (status: Task['status']) =>
    tasks.filter((task) => task.status === status);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Task Management Dashboard</h1>
          <button
            onClick={() => setIsNewTaskModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add New Task
          </button>
        </div>

        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TaskColumn
              title="To Do"
              status="TODO"
              tasks={getTasksByStatus('TODO')}
            />
            <TaskColumn
              title="In Progress"
              status="IN_PROGRESS"
              tasks={getTasksByStatus('IN_PROGRESS')}
            />
            <TaskColumn
              title="Done"
              status="DONE"
              tasks={getTasksByStatus('DONE')}
            />
          </div>

          <DragOverlay>
            {activeTask ? (
              <div className="bg-white p-4 rounded-lg shadow-lg opacity-90">
                <h3 className="font-medium mb-2">{activeTask.title}</h3>
                {activeTask.description && (
                  <p className="text-gray-600 text-sm">{activeTask.description}</p>
                )}
                <div className="mt-2">
                  <span className={`text-sm px-2 py-1 rounded ${
                    activeTask.status === 'DONE' ? 'bg-green-100 text-green-800' :
                    activeTask.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {activeTask.status}
                  </span>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        <NewTaskModal
          isOpen={isNewTaskModalOpen}
          onClose={() => setIsNewTaskModalOpen(false)}
          onSubmit={handleCreateTask}
        />
      </div>
    </div>
  );
};

export default App;
