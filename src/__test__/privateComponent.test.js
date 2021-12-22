import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserContext } from 'context/user';
import PrivateComponent from '../Componentes/PrivateComponent'

it('renders not authorized if the roles dont match', () => {
  render(
    <UserContext.Provider value={{ userData: { rol: 'LIDER' } }}>
      <PrivateComponent roleList={['ADMINISTRADOR']}>
        <div>Este es el children</div>
      </PrivateComponent>
    </UserContext.Provider>
  );
  expect(screen.getByTestId('privateComponent')).toHaveTextContent('');
});

it('renders the children if the user role is in the roleList', () => {
  render(
    <UserContext.Provider value={{ userData: { rol: 'ADMINISTRADOR' } }}>
      <PrivateComponent roleList={['ADMINISTRADOR']}>
        <div data-testid='children1'>Este es el children</div>
      </PrivateComponent>
    </UserContext.Provider>
  );
  expect(screen.getByTestId('children1')).toBeInTheDocument();
});
