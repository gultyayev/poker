const os = require('os');

module.exports = function() {
  const ifaces = os.networkInterfaces();

  let res = [];

  Object.keys(ifaces).forEach(function(ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function(iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        res.push(ifname + ':' + alias + ' ' + iface.address);
      } else {
        // this interface has only one ipv4 adress
        res.push(ifname + ' ' + iface.address);
      }
      ++alias;
    });
  });

  return res;
};
