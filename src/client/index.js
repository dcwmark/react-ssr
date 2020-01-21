// src/client/index.js

import React from 'react';
import ReactDOM from 'react-dom';

import App from '../shared/App';

ReactDOM.hydrate(
    <App data="Client" />,
    document.getElementById('app')
);
