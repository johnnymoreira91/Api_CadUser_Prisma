import app from './server/server'

require('dotenv').config({  
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

const os = require('os');
const ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface: { family: string; internal: boolean; address: any; }) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});

const PORT = process.env.PORT

app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'dev'){
    console.log('Dev ambient')
    console.log('Server running on port: ', PORT)
  } else if (process.env.NODE_ENV === 'test') {
    console.log('Test ambient')
    console.log('Server running on port: ', PORT)
  } else {
    console.log('Production ambient')
    console.log('Server running on port: ', PORT)
  }
})

