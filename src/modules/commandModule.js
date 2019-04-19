const read = require('fs-readdir-recursive');

module.exports = async (msg) => {
  let handled = false;
  let args = msg.content.trim().slice(process.env.DISCORD_PREFIX.length).split(' ');
  let reqCmd = args.shift().toLowerCase();
  try {
    let files = read('src/commands');
    files.forEach(file => {
      if (!file.includes('category.json')) {
        let meta = require('../commands/' + file).meta;
        if (meta.aliases.map(c => c.toLowerCase()).includes(reqCmd)) {
          if (meta.ownerOnly == true && msg.author.id !== process.env.DISCORD_USER_OWNER) {
            return handled = true;
          }
          handled = true;
          return require('../commands/' + file).run(msg, args);
        }
      }
    })
  } catch (err) {
    msg.channel.send('An error occurred.');
    console.error(err);
  }
}