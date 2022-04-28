import { render } from 'react-dom';
import { App } from './App';
import { DisplayTypeProvider } from "./providers/DisplayTypeProvider";
import { RuleSettingsProvider } from "./providers/RuleSettingsProvider";
import { GlobalStateProvider } from "./providers/GlobalStateProvider";

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