// shared/App.js

import React from 'react';
import Grid from './Grid';

const App = (props) => {
    return (
        <div>
            <Grid data={ props.data } />
        </div>
    );
}
 
export default App;
