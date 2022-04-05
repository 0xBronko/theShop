import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';


import ReactDOMClient from "react-dom/client";
import { UserProvider } from './context/user.context';
import { PrductsProvider } from './context/products.context';
import { CartProvider } from './context/cart.context';

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <PrductsProvider>
          <CartProvider>
            <App /> 
          </CartProvider>
        </PrductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
