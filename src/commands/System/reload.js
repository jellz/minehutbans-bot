const { MessageEmbed } = require('discord.js');

const run = module.exports.run = async (msg, args) => {
  if (!args[0]) return client.invalidCommandUsage(msg, meta);
  delete require.cache[require.resolve(`../${args[0]}.js`)];
  msg.channel.send({ embed: new MessageEmbed()
    .setDescription(`Reloaded command **${args[0]}**`)
    .setColor('GREEN')
  });
}

const meta = module.exports.meta = {
  aliases: ['reload', 'rl'],
  ownerOnly: true,
  description: 'Reload commands.',
  usage: '<command>'
}