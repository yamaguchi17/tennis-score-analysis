import { render } from 'react-dom';
import { App } from './components/App';
import { DisplayTypeProvider } from "./components/providers/DisplayTypeProvider";
import { RuleSettingsProvider } from "./components/providers/RuleSettingsProvider";

const rootElement = document.getElementById("root");
render(
    <DisplayTypeProvider>
        <RuleSettingsProvider>
            <App />
        </RuleSettingsProvider>
    </DisplayTypeProvider>
    , rootElement
);