import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';

describe('TaskList', () => {
  const mockTasks = [
    { id: 1, title: 'Task 1', isComplete: false },
    { id: 2, title: 'Task 2', isComplete: true }
  ];

  const mockOnTaskToggle = vi.fn();
  const mockOnDeleteTask = vi.fn();

  test('renders list of tasks', () => {
    render(
      <TaskList
        tasks={mockTasks}
        onTaskToggle={mockOnTaskToggle}
        onDeleteTask={mockOnDeleteTask}
      />
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('renders empty list when no tasks', () => {
    render(
      <TaskList
        tasks={[]}
        onTaskToggle={mockOnTaskToggle}
        onDeleteTask={mockOnDeleteTask}
      />
    );

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
