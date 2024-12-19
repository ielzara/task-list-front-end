import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewTaskForm from './NewTaskForm';

describe('NewTaskForm', () => {
  const mockCreateTask = vi.fn();

  beforeEach(() => {
    mockCreateTask.mockClear();
  });

  test('renders form elements', () => {
    render(<NewTaskForm createTask={mockCreateTask} />);

    expect(screen.getByText('New Task')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add new task here')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description (optional)')).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  test('calls createTask with form data when submitted', async () => {
    render(<NewTaskForm createTask={mockCreateTask} />);
    const titleInput = screen.getByPlaceholderText('Add new task here');
    const descInput = screen.getByPlaceholderText('Description (optional)');

    await userEvent.type(titleInput, 'New Task');
    await userEvent.type(descInput, 'Task Description');
    await userEvent.click(screen.getByText('Add Task'));

    expect(mockCreateTask).toHaveBeenCalledWith({
      title: 'New Task',
      description: 'Task Description'
    });
  });

  test('does not submit if title is empty', async () => {
    render(<NewTaskForm createTask={mockCreateTask} />);

    await userEvent.click(screen.getByText('Add Task'));
    expect(mockCreateTask).not.toHaveBeenCalled();
  });
});
