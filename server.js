
const express = require('express');
const app = express();

const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
app.use(cors());

// const NodeCache = require('node-cache');
// const bodyParser = require('body-parser');
// const cache = new NodeCache({ stdTTL: 600 }); //10 minutes

// app.use(bodyParser.urlencoded({ extended: false }));
const PORT = 4000;

const proxy = createProxyMiddleware({
    target: 'http://api:3000', // Target URL where requests will be forwarded
    changeOrigin: true, // Changes the origin of the host header to the target URL
});


app.use('/', proxy);

// //Caching Middleware, will be expanded apon after more data is sent (like error messages)
// app.use('/', (req, res, next) => {
//     console.log("TEST")

//     const key = req.url;
//     const cachedResponse = cache.get(key);

//     console.log("key: " + key);
//     console.log("cachedResponse: " + cachedResponse);
//     console.log("res.body: " + JSON.stringify(res.body));
//     console.log("req.body: " + JSON.stringify(req.body));

//     if (cachedResponse != undefined) {
//         console.log('Cache hit for: ', key);
//         return res.json(cachedResponse);
//     } else {
//         console.log('Cache miss for: ', key)
//         return proxy(req, res, (err) => {
//             if (!err && res.statusCode == 200) {
//                 cache.set(key, res.body);
//             }
//         });
//     }
// });


app.listen(PORT, () => {
    console.log(`Proxy server listening on http://localhost:${PORT}`);
});
