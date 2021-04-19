import React from 'react';
import { render, screen } from '@testing-library/react';
import AddinApp from './AddinApp';

test('renders learn react link', () => {
  render(<AddinApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
