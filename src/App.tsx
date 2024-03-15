import React from 'react';
import logo from './logo.svg';
import './App.css';
import { jwtDecode } from 'jwt-decode';
//import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Capacitor } from '@capacitor/core';
import GoogleButton from 'react-google-button';
import { useState } from 'react';

function App() {

  interface User {
    nombre: string,
    imageUrl: string;
  }

  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    if (Capacitor.getPlatform() === 'web') {
      GoogleAuth.initialize();
    }
  }, []);


  const signIn = async () => {
    var userData = await GoogleAuth.signIn();
    setUser({nombre: userData.name, imageUrl: userData.imageUrl});
    console.log(userData);
  };

  //Esta función da error y no se muy bien cuando llamarla.
  const refresh = async () => {
    const authCode = await GoogleAuth.refresh();
    console.log(authCode);
  };

  const signOut = async () => {
    await GoogleAuth.signOut();
    setUser(null);
  };

  return(
    <div>
      {!user &&
        //<button onClick={signIn}>Iniciar sesión</button>
        
        /*<button onClick={signIn}>
          <img src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png" alt="Iniciar sesión" />
        </button>*/

        <GoogleButton label='Iniciar sesión' onClick={signIn}/>
      }

      {user &&
        <button onClick={signOut}>Cerrar sesión</button>
      } 
      <div>{JSON.stringify(user?.nombre)}</div>
      <img src={user?.imageUrl}></img>
      
  </div>

  );
  
}
export default App;
