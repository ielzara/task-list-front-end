import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from './App';

vi.mock('axios');

describe('App', () => {
  const mockTasks = [
    { id: 1, title: 'Test Task 1', description: 'desc 1', is_complete: false },
    { id: 2, title: 'Test Task 2', description: 'desc 2', is_complete: true }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockTasks });
  });

  test('renders task list and form', async () => {
    render(<App />);
    expect(screen.getByText("Ada's Task List")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add new task here')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    });
  });

  test('can add a new task', async () => {
    const newTask = { id: 3, title: 'New Task', description: 'new desc', is_complete: false };
    axios.post.mockResolvedValue({ data: { task: newTask } });

    render(<App />);
    const input = screen.getByPlaceholderText('Add new task here');
    await userEvent.type(input, 'New Task');
    await userEvent.click(screen.getByRole('button', { name: 'Add Task' }));

    await waitFor(() => {
      // Use a more specific selector to find the task button
      const taskButtons = screen.getAllByRole('button', { name: 'New Task' });
      const taskButton = taskButtons.find(button => 
        button.classList.contains('tasks__item__toggle')
      );
      expect(taskButton).toBeInTheDocument();
    });
  });

  test('can delete a task', async () => {
    axios.delete.mockResolvedValue({});
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByText('x')[0];
    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText('Test Task 1')).not.toBeInTheDocument();
    });
  });
});
