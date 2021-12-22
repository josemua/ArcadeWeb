import { useUser } from 'context/user';
import React from 'react';

const AuthorizedRoutes = ({ stateList, children }) => {
  const { userData } = useUser();

  if (stateList.includes(userData.estado)) {
    return children;
  }

  return (
  <div data-testid="authRoutes" className='titulo rutaRestringida'> No estas autorizad@ para acceder a esta página. </div>
  );
  
};

export default AuthorizedRoutes;