import React from 'react'
import ReactDOM from 'react-dom';
import App from './App.tsx'
import './index.css'
import fbconfig from './Firebase/firebase_config.ts'
import { initializeApp } from 'firebase/app'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { Login } from './Routes/login.tsx'
import { ErrorPage } from './Routes/error_page.tsx'
import { Cadastro } from './Routes/cadastro.tsx'
import { HomePage } from './Routes/homePage.tsx'
import { AuthContextProvider } from './Context/authContext.tsx'
import { Protected } from './Routes/protectRoutes.tsx';
import { getAuth } from 'firebase/auth';

const app = initializeApp(fbconfig)
export const auth = getAuth(app)

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/homepage",
    element: <Protected><HomePage /></Protected>,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
