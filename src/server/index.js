// src/server/index.js 

import express from "express";
import cors from "cors";

import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../shared/App";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.static('public'));

app.get('*', (req, res) => {
    const markup = ReactDOMServer.renderToString(<App data="Server" />);

    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>React SSR</title>
                <script src="/bundle.js" defer></script>
            </head>
            <body>
                <div id="app">
                    ${markup}
                </div>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

