import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';
import CatFact from './Models/CatFact';
import fetchMock from 'jest-fetch-mock';

describe('tests for App component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('renders refresh button', () => {
    render(<App />);
    const button = screen.getByTestId('factButton');
    expect(button).toBeInTheDocument();
  });

  it('shows data on button click with mocked responses', async () => {
    render(<App />);
    const buttonData = screen.getByTestId('factButton');
    const fakeData: CatFact = {
      fact: 'Cats are cute',
      length: 32,
    };

    fetchMock.mockResponseOnce(JSON.stringify(fakeData));
    fetchMock.mockResponseOnce(JSON.stringify(fakeData));
    buttonData.click();
    await waitFor(() => {
      screen.getByTestId('dataBlock');
    });

    const message = screen.getByTestId('dataBlock');
    expect(message).toBeInTheDocument();
    expect(message.textContent).toEqual(JSON.stringify(fakeData.fact, null, 2));
  });

  it('shows error on button click when first API fails', async () => {
    render(<App />);
    const buttonData = screen.getByTestId('factButton');
    const errorMessage = 'Dead API';
    fetchMock.mockRejectOnce(new Error(errorMessage));
    buttonData.click();
    await waitFor(() => {
      screen.getByTestId('errorBlock');
    });

    const message = screen.getByTestId('errorBlock');
    expect(message).toBeInTheDocument();
    expect(message.textContent).toEqual(`${errorMessage}`);
  });

  it('shows error on button click when second API fails', async () => {
    render(<App />);
    const buttonData = screen.getByTestId('factButton');
    const errorMessage = 'Dead API';
    const fakeData: CatFact = {
      fact: 'Cats are cute',
      length: 32,
    };

    fetchMock.mockResponseOnce(JSON.stringify(fakeData));
    fetchMock.mockRejectOnce(new Error(errorMessage));

    buttonData.click();
    await waitFor(() => {
      screen.getByTestId('errorBlock');
    });

    const message = screen.getByTestId('errorBlock');
    expect(message).toBeInTheDocument();
    expect(message.textContent).toEqual(`${errorMessage}`);
  });
});
