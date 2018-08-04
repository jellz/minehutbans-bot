const run = module.exports = async () => {
    require('fs').readdir('src/events', (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            const eventFunction = require('../events/' + file);
            const eventName = file.split('.')[0];
            client.on(eventName, (...args) => eventFunction(...args));
        });
    });
}
