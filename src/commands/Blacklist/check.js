const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const mcapi = require('mcapi');

exports.run = async (msg, args) => {
  if (!args[0] || args[0].length > 16) return await client.invalidCommandUsage(msg, exports.meta);

  let uuidRes = await fetch('https://api.mojang.com/users/profiles/minecraft/' + args[0]);
  if (uuidRes.status == 204) { // not a real player
    let m = await msg.channel.send(process.env.DISCORD_EMOJI_FAIL + ' The player you have specified is not real.');
  }
  let uuidResJson = await uuidRes.json();

  let res = await fetch(`${process.env.API_BASE}/api/blacklisted_players/` + uuidResJson.id);
  let json = await res.json();

  if (!json.ok) {
    let m = await msg.channel.send(`**ERROR**: \`${json.error}\``);
    m.delete({ timeout: 10000 });
    return msg.delete();
  }

  if (json.blacklisted) {
    let embed = new MessageEmbed()
      .setTitle(json.player.username)
      .setThumbnail(`https://visage.surgeplay.com/full/${json.player.id}?tilt=0`)
      .setColor('RED')
      .addField('UUID', json.player.id, true)
      .addField('Blacklisted?', 'Yes', true)
      .addField('Reason', json.player.reason, true)
      .addField('When?', new Date(json.player.createdAt).toUTCString());
    let m = await msg.channel.send(embed);
  } else {
    let embed = new MessageEmbed()
      .setTitle(uuidResJson.name)
      .setThumbnail(`https://visage.surgeplay.com/full/${json.player.id}?tilt=0`)
      .setColor('GREEN')
      .addField('UUID', uuidResJson.id, true)
      .addField('Blacklisted?', 'No', true)
    let m = await msg.channel.send(embed);
  }
}

exports.meta = {
  aliases: ['check', 'lookup', 'lu'],
  ownerOnly: false,
  description: 'Check if a player is blacklisted',
  usage: '<player\'s IGN>'
}
