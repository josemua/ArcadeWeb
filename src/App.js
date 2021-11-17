import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import { LoginButton } from './Componentes/Login';
import { Profile } from './Componentes/Profile';
import { LogoutButton } from './Componentes/Logout';

function App() {
  const {isAuthenticated} = useAuth0();
  return (
      <div className="App">
        <header className="App-header">
          {/* condicion para intercalar boton dependiendo si esta logeado o no */}
          { isAuthenticated ? (
            <> 
            <LogoutButton />
            <Profile />
            </>
          )  : (
          <LoginButton />
          )}
        </header>
      </div>
  );
}

export default App;
