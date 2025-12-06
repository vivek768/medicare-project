import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import env from "react-dotenv";
//import { ClerkProvider } from '@clerk/clerk-react';

//const publishableKey = env.VITE_CLERK_PUBLISHABLE_KEY;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<ClerkProvider publishableKey={publishableKey}>
    <App />
  //</ClerkProvider>
);