import { useUser } from 'context/user';
import React from 'react';

const AuthorizedRoutes = ({ stateList, children }) => {
  const { userData } = useUser();

  if (stateList.includes(userData.estado)) {
    return children;
  }

  return (console.log(userData), <div className='titulo'>Aun no has sido autorizado para acceder.</div>);
  
};

export default AuthorizedRoutes;