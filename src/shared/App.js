// shared/App.js

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from './routes';
import NavBar from './NavBar';
import NoMatch from './NoMatch';

const App = props => {
    return (
        <div>
            <NavBar />

            <Switch>
                {routes.map(({ path, exact, component: C, ...rest }) => (
                    <Route
                        key={ path }
                        path={ path }
                        exact={ exact }
                        render={(props) => (
                        <C { ...props } { ...rest } />
                        )}
                    />
                ))}
                <Route render={(props) => <NoMatch {...props} />} />
            </Switch>
        </div>
    );
};
 
export default App;
