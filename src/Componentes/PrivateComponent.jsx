import { useUser } from 'context/user';
import React from 'react';

const PrivateComponent = ({ roleList, children }) => {
  const { userData } = useUser();

  if (roleList.includes(userData.rol)) {
    return children;
  }

  return <div data-testid="privateComponent"></div>;
};

export default PrivateComponent;
