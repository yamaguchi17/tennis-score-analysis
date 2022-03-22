import { render } from 'react-dom';
import { App } from './components/App';
import { DisplayTypeProvider } from "./components/providers/DisplayTypeProvider";

const rootElement = document.getElementById("root");
render(
    <DisplayTypeProvider>
        <App />
    </DisplayTypeProvider>
    , rootElement
);