const express = require('express')
const app = express()
const port = 3000
console.log(process.env)
const token = process.env.TOKEN
const expressip = require('express-ip');
app.use(expressip().getIpInfoMiddleware);
const { Resolver } = require('dns');
const resolver = new Resolver();
resolver.setServers(['8.8.8.8']);



app.use(function (req, res, next) {
  console.log(token)
  if (req.get('x-express-token') == token) {
    next()
  } else {
    res.json({error: 'Ooops...'})
  }
})

app.get('/ping', (req, res) => {
  res.json({
    headers: req.headers,
    userAgent: req.get('user-agent'),
    token: req.get('x-express-token'),
    ipInfo: req.ipInfo
  })
})

app.put('/dns', function (req, res) {
  res.send('Dostałem request typu PUT na /dns')
})

resolver.resolve4('/dns', (err, addresses) => {
  console.log(addresses);
});

resolver.resolveTxt('/dns', (err, addresses) => {
  console.log(addresses);
});

app.listen(port, () => {
  console.log("Example app listening at http://localhost:" + port)
})