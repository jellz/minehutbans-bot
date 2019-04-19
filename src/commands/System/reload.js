const { MessageEmbed } = require('discord.js');

exports.run = async (msg, args) => {
  if (!args[0]) return client.invalidCommandUsage(msg, exports.meta);
  delete require.cache[require.resolve(`../${args[0]}.js`)];
  msg.channel.send({ embed: new MessageEmbed()
    .setDescription(`Reloaded command **${args[0]}**`)
    .setColor('GREEN')
  });
}

exports.meta = {
  aliases: ['reload', 'rl'],
  ownerOnly: true,
  description: 'Reload commands.',
  usage: '<command>'
}