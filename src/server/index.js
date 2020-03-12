// src/server/index.js 

import express from 'express';
import cors from 'cors';
import serialize from 'serialize-javascript';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';

import { fetchPopularRepos } from '../shared/api';
import App from '../shared/App';
import routes from '../shared/routes';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.static('public'));

app.get('*', (req, res, next) => {
    // activeRoute will be the route of whatever page the user was requesting
    // (req.url).
    const activeRoute = routes.find(
        (route) => matchPath(req.url, route)
    ) || {};

    // Check to see if that route requires any data.
    // If the activeRoute has a fetchInitialData property. 
    //   (see shared/routes.js)
    // If it does, invokes it passing it the current path,
    // if it doesn’t, just continue on.
    const promise = activeRoute.fetchInitialData
                  ? activeRoute.fetchInitialData(req.path)
                  : Promise.resolve();
    
    promise.then( data => {
        const context = { data };

        const markup = ReactDOMServer.renderToString(
            // Anything that is passed onto the `context`, can be accessed
            // by any component as `props.staticContext`.
            <StaticRouter location={ req.url } context={ context }>
                <App />
            </StaticRouter>
        );

        res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>React SSR</title>
                    <script src="/bundle.js" defer></script>
                    <!--
                        React expects that the rendered content is identical 
                        between the server and the client.

                        If the app just renders a component with no data,
                        it’s not difficult to have the 
                        server-rendered and client-rendered content be identical.

                        However, when the initial rendering from server contains
                        generated data, the situation becomes complex.

                        With that in mind, in order to make sure 
                        the server and the client are the same, there is a need
                        to figure out how to get the same data that originated
                        on the server, down to the client.
                        
                        There’s a pretty “old school” solution that works
                        perfectly -- window global namespace.
                    -->
                    <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
                </head>
                <body>
                    <div id="app">${markup}</div>
                </body>
            </html>
        `);
    }).catch( next );
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
