import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Landing from './pages/Landing';
import {store} from './redux/store';
import { Provider } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import App from './pages/App';

const router = createBrowserRouter([
  {
    path: "/landing",
    element: <Landing/>,
  },
  {
    path:"/",
    element:<ProtectedRoute><App/></ProtectedRoute>
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
