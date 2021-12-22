import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../Componentes/Loading'

it('renders okay', () => {
  render(<Loading/>);
  expect(screen.getByTestId('loading')).toBeInTheDocument();
});

it('shows text when loading', () => {
  render(<Loading />);
  expect(screen.getByTestId('loading')).toHaveTextContent('Cargando...');
});

it('doesnt show text when loading', () => {
  render(<Loading />);
  expect(screen.getByTestId('loading')).not.toHaveTextContent('hola');
});
