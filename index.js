const HTTP = require('http');
const PORT = process.env.PORT || 3030;
const URL = require("url");
let routes = require('./route/route')

const SERVER = HTTP.createServer(function (req, res) {
    let parsedURL = URL.parse(req.url, true);
    let path = parsedURL.pathname;
    let rq = req;
    path = path.replace(/^\/+|\/+$/g, "");


    if (path == "") {
        path = "index";
    } else {
        path = path.split("/")[0]
    }

    let route = typeof routes[path] !== "undefined" ? routes[path] : routes["error"];

    let data = {
        path: path,
        url: parsedURL.pathname,
        dt: rq,
    }
    route(data, res);

});

SERVER.listen(PORT, function () {
    console.log(`Listening on port ${PORT} `);
});