
// Entry point of the React application
// Responsible for rendering the root App component and setting up the root render method
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
