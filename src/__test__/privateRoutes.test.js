import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserContext } from 'context/user';
import PrivateRoutes from '../Componentes/PrivateRoutes'

it('renders not authorized if the roles dont match', () => {
  render(
    <UserContext.Provider value={{ userData: { rol: 'LIDER' } }}>
      <PrivateRoutes roleList={['ADMINISTRADOR']}>
        <div>Este es el children</div>
      </PrivateRoutes>
    </UserContext.Provider>
  );
  expect(screen.getByTestId('privateRoutes')).toHaveTextContent(
    'No estás autorizado para ver este sitio.'
  );
});

it('renders the children if the user role is in the roleList', () => {
  render(
    <UserContext.Provider value={{ userData: { rol: 'ADMINISTRADOR' } }}>
      <PrivateRoutes roleList={['ADMINISTRADOR']}>
        <div data-testid='children'>Este es el children</div>
      </PrivateRoutes>
    </UserContext.Provider>
  );
  expect(screen.getByTestId('children')).toBeInTheDocument();
});
