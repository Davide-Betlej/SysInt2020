const { Resolver } = require('dns');
const resolver = new Resolver();
resolver.setServers(['8.8.8.8']);

resolver.resolve4('bard.sh', (err, addresses) => {
  console.log(addresses);
});

resolver.resolveMx('bard.sh', (err, addresses) => {
  console.log(addresses);
});