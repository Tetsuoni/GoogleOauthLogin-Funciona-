import React from 'react';
import logo from './logo.svg';
import './App.css';
import { jwtDecode } from 'jwt-decode';
//import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Capacitor } from '@capacitor/core';
import GoogleButton from 'react-google-button';
import { useState } from 'react';


/*Pasos:
1.  Crear el proyecto, configurar consent screen y credendiales en google Oauth.

2.  Modificar archivos ->capacitor.config.ts e index.html

3.  Código de la APP

4.  Para compatibilidad con IOS (no he probado si funciona, no tengo el emulador y me he centrado en android) crear credencial, descargar el archivo,
    y añadirlo al proyecto desde el emulador de IOS, en la carpeta IOS/App/App/, a la altura de Info. Al añadirlo seleccionar la opción 'copy items if needed', 
    cambiarle el nombre al archivo por GoogleService-Info.plist.
    Dentro del archivo, copiar contenido de 'REVERSE_CLIENT_ID', seleccionar APP, (la carpeta App, padre de otra carpeta App), ir a la pestaña de info, y pegar el código copiado
    en URL Types -> URL Schemes.

5.  Para compatibilidad en Android, ir a Android/App/src/main/java/MainActivity.java y modificarlo.
    La credencial de Android es necesaria (Se necesita SHA 1), a pesar de no usarse como tal, debe relacionarla con la credencial web de forma interna.
    Copiar clave de cliente web y pegarla en Android/App/src/res/values/strings.xml
    
6.  Ya ebería de funcionar la App!!


*/
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
