import { useUser } from 'context/user';
import React from 'react';

const PrivateRoutes = ({ roleList, children }) => {
  const { userData } = useUser();

  if (roleList.includes(userData.rol)) {
    return children;
  }

  return (<div data-testid="privateRoutes" className='titulo'>No estás autorizado para ver este sitio.</div>);
  
};

export default PrivateRoutes;
