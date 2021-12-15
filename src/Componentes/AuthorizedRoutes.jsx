import { useUser } from 'context/user';
import React from 'react';

const AuthorizedRoutes = ({ stateList, children }) => {
  const { userData } = useUser();

  if (stateList.includes(userData.estado)) {
    return children;
  }

  return (console.log(userData), 
  <div className='titulo rutaRestringida'> No estas autorizad@ para acceder a esta página. </div>
  );
  
};

export default AuthorizedRoutes;