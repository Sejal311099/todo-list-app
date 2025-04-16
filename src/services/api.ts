import { Task } from '../types/Task';

// Mock data
let mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the project',
    status: 'TODO',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Implement authentication',
    description: 'Add user authentication system',
    status: 'TODO',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Setup CI/CD',
    description: 'Configure continuous integration and deployment',
    status: 'DONE',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const api = {
  getTasks: async (): Promise<Task[]> => {
    return Promise.resolve(mockTasks);
  },

  createTask: async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockTasks = [...mockTasks, newTask];
    return Promise.resolve(newTask);
  },

  updateTask: async (taskId: string, updates: Partial<Task>): Promise<Task> => {
    const taskIndex = mockTasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    const updatedTask = {
      ...mockTasks[taskIndex],
      ...updates,
      updatedAt: new Date(),
    };

    mockTasks = [
      ...mockTasks.slice(0, taskIndex),
      updatedTask,
      ...mockTasks.slice(taskIndex + 1),
    ];

    return Promise.resolve(updatedTask);
  },

  deleteTask: async (taskId: string): Promise<void> => {
    mockTasks = mockTasks.filter((t) => t.id !== taskId);
    return Promise.resolve();
  },
}; 