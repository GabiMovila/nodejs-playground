import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import exp from 'constants';

describe('tests for App component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders refresh button', () => {
    render(<App />);
    const button = screen.getByText('Refresh');
    expect(button).toBeInTheDocument();
  });

  it('shows data on button click', async () => {
    render(<App />);
    const buttonData = screen.getByText('Refresh');
    const fakeData = {
      activity: 'Learn JS',
      hours: 32,
      id: 44,
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeData),
      })
    ) as jest.Mock;
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      userEvent.click(buttonData);
    });
    const message = screen.getByTestId('dataBlock');
    expect(message).toBeInTheDocument();
    expect(message.textContent).toEqual(JSON.stringify(fakeData, null, 2));
  });

  it('shows error on button click', async () => {
    render(<App />);
    const buttonData = screen.getByText('Refresh');
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.reject('Something went wrong'),
      })
    ) as jest.Mock;
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      userEvent.click(buttonData);
    });
    const message = screen.getByText('Error: Something went wrong');
    expect(message).toBeInTheDocument();
  });
});
