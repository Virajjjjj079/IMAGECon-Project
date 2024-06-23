import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import ImageConvert from './components/ImageConvert';
import ImageToPdf from './components/ImageToPdf';
import './index.css';
import reportWebVitals from './reportWebVitals';
const router = createBrowserRouter([
{
path:'/',
element:<App/>,
},
{
  path:'/image-type-converter',
  element:<ImageConvert/>,
  },
  {
    path:'/image-to-pdf',
    element:<ImageToPdf/>,
    }

]);
ReactDOM.createRoot(document.getElementById('root'))

.render(
  <React.StrictMode>
    
      <RouterProvider router={router}/>
    
  </React.StrictMode>
);

reportWebVitals();
