module.exports = async () => {
  require('fs').readdir('src/events', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require('../events/' + file);
        let eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventFunction(...args));
    });
  });
}
