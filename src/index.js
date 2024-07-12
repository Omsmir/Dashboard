import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/css/index.css';
import "../src/css/media.css"
import App from './App';
import { PrimeReactProvider } from 'primereact/api';

const body = ReactDOM.createRoot(document.querySelector('#container'));
body.render(

    <PrimeReactProvider>
    <App />
    </PrimeReactProvider>
);

