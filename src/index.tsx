import { render } from 'react-dom';
import { App } from './components/App';
import { DisplayTypeProvider } from "./components/providers/DisplayTypeProvider";
import { RuleSettingsProvider } from "./components/providers/RuleSettingsProvider";
import { GlobalStateProvider } from "./components/providers/GlobalStateProvider";

const rootElement = document.getElementById("root");

render( 
    <GlobalStateProvider>
        <DisplayTypeProvider>
            <RuleSettingsProvider>
                <App />
            </RuleSettingsProvider>
        </DisplayTypeProvider>
    </GlobalStateProvider>
    , rootElement
);