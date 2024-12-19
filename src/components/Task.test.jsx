import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Task from './Task';

describe('Task', () => {
  const mockOnTaskToggle = vi.fn();
  const mockOnDeleteTask = vi.fn();
  const defaultProps = {
    id: 1,
    title: 'Test Task',
    isComplete: false,
    onTaskToggle: mockOnTaskToggle,
    onDeleteTask: mockOnDeleteTask
  };

  beforeEach(() => {
    mockOnTaskToggle.mockClear();
    mockOnDeleteTask.mockClear();
  });

  test('renders task title', () => {
    render(<Task {...defaultProps} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  test('calls onTaskToggle when clicked', async () => {
    render(<Task {...defaultProps} />);
    await userEvent.click(screen.getByText('Test Task'));
    expect(mockOnTaskToggle).toHaveBeenCalledWith(1);
  });

  test('calls onDeleteTask when delete button clicked', async () => {
    render(<Task {...defaultProps} />);
    await userEvent.click(screen.getByText('x'));
    expect(mockOnDeleteTask).toHaveBeenCalledWith(1);
  });

  test('applies completed class when task is complete', () => {
    render(<Task {...defaultProps} isComplete={true} />);
    expect(screen.getByRole('button', { name: 'Test Task' }))
      .toHaveClass('tasks__item__toggle--completed');
  });
});
