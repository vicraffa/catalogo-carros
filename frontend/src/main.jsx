import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import globalStyles from './css/Global.module.css'

const rootElement = document.getElementById('root');
rootElement.className = globalStyles.root;

createRoot(rootElement).render(
    <App />
)
