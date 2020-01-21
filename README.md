# react-ssr

[https://tylermcginnis.com/react-router-server-rendering/](https://tylermcginnis.com/react-router-server-rendering/)

[git source](https://github.com/tylermcginnis/rrssr)

```
> npm i webpack webpack-cli webpack-node-externals html-webpack-plugin html-loader -D
> npm i @babel/core babel-loader @babel/preset-env @babel/preset-react -D
> npm i react react-dom prop-types
> npm i nodemon -D
> npm i cors express
```

---

.babelrc

---

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

---

webpack.config.js

---

```javascript
module.exports = {
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
    }, {
      test: /\.html$/,
      use: [
        {
          loader: "html-loader"
        }
      ]
    }]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```
