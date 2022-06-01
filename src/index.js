import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from './Helpers/Context';
import './index.css';
import Navigation from './navigation';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider>
            <Navigation />
        </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
