import React from 'react';
import {hydrateRoot,createRoot} from 'react-dom/client';
import App from './App.jsx';
import './style.css';
const root=document.getElementById('root');
const props=window.__PAGE__ || {path:'/'};
if(root.querySelector('main')) hydrateRoot(root,<App {...props}/>); else createRoot(root).render(<App {...props}/>);
