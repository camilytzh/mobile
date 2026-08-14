import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ExpenseProvider } from './contexts/ExpenseContext';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <ExpenseProvider>
      <App />
    </ExpenseProvider>
  </React.StrictMode>
);