const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const mcapi = require('mcapi');

exports.run = async (msg, args) => {
  if (!args[0] || args[0].length > 16) return await client.invalidCommandUsage(msg, meta);
  let uuid = await mcapi.usernameToUUID(args[0]);
  let m = await msg.channel.send(uuid == 'fail' ? 'Invalid username' : uuid);
}

exports.meta = {
  aliases: ['uuid'],
  ownerOnly: false,
  description: 'Get player UUID',
  usage: '<player>'
}