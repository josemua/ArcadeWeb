import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginButton from './Componentes/Login';
import { Profile } from './Componentes/Profile';
import LogoutButton from './Componentes/Logout';

import AdminUsuarios from './Pages/AdminUsuarios';
import Navegacion from './Pages/Navegacion';
import GesProyecto from './Pages/GesProyecto';

function App() {
  const {isAuthenticated} = useAuth0();
  
  return (

    <div className="App">
      {/* condicion para intercalar boton dependiendo si esta logeado o no */}
      { isAuthenticated ? (
        <> 
        <LogoutButton />
        <Profile />
        </>
      )  : (
      <LoginButton />
    )}
      {/* rutas para navegar entre paginas*/}
      <Router>
        <Navegacion>
          <Route path="/admin" exact component={AdminUsuarios}/>     
          <Route path="/proyecto" exact component={GesProyecto}/>
        </Navegacion>
      </Router>
    </div> 
  );
}

export default App;
