
// Requires:
const express = require('express');
const app = express();

const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cors = require('cors');

const PORT = 4000;

// Responds with code "429, Too many requests" if more than 100 requests are send within 10 minutes
const limiter = rateLimit({
    windowMs: 600000, 
    max: 300, 
});

const proxy = createProxyMiddleware({
    target: 'http://api:3000', // Target URL where requests will be forwarded
    changeOrigin: true, // Changes the origin of the host header to the target URL
});

// Middleware
app.use(limiter);
app.use(compression());
app.use(cors());

//Caching Middleware

// Proxy Middleware
app.use('/', proxy);

app.listen(PORT, () => {
    console.log(`Proxy server listening on http://localhost:${PORT}`);
});







// Caching: 

// const NodeCache = require('node-cache');
// const bodyParser = require('body-parser');
// const cache = new NodeCache({ stdTTL: 600 }); //10 minutes

// app.use(bodyParser.urlencoded({ extended: false }));

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
