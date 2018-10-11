const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const mcapi = require('mcapi');

const run = module.exports.run = async (msg, args) => {
  if (!args[0] || args[0].length > 16) return await client.invalidCommandUsage(msg, meta);
  let res = await fetch('https://api.minehutbans.xyz/api/blacklisted_players/' + await mcapi.usernameToUUID(args[0]));
  let json = await res.json();
  if (!json.ok) {
    let m = await msg.channel.send(`**ERROR**: \`${json.errors[0]}\``);
    m.delete({ timeout: 10000 });
    msg.delete();
  } else {
    let embed = new MessageEmbed()
      .setTitle(json.player.username)
      .setThumbnail(`https://visage.surgeplay.com/full/${json.player.id}?tilt=0`)
      .setColor('RED')
      .addField('UUID', json.player.id, true)
      .addField('Blacklisted?', json.blacklisted ? 'Yes' : 'No', true)
      .addField('Reason', json.player.reason, true)
      .addField('When?', new Date(json.player.createdAt).toUTCString());
    let m = await msg.channel.send(embed);
    m.delete({ timeout: 15000 });
    msg.delete();
  }
}

const meta = module.exports.meta = {
  aliases: ['check', 'lookup', 'lu'],
  ownerOnly: false,
  description: 'Check if a player is blacklisted',
  usage: '<player>'
}