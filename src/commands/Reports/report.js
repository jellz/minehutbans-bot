const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

exports.run = async (msg, args) => {
  if (args.length < 2 || args[0].length > 16) {
    msg.delete({ reason: 'invalid report command usage' });
    let m = await client.invalidCommandUsage(msg, exports.meta);
    return m.delete({ timeout: 8000 });
  }

  if (args.slice(1).join(' ').length > 1000) {
    msg.delete({ reason: 'invalid report command usage' });
    let m = await msg.channel.send(process.env.DISCORD_EMOJI_FAIL + ' Your report is too long.');
    return m.delete({ timeout: 5000 });
  }

  let uuidRes = await fetch('https://api.mojang.com/users/profiles/minecraft/' + args[0]);
  if (uuidRes.status == 204) { // not a real player
    msg.delete({ reason: 'invalid report command usage' });
    let m = await msg.channel.send(process.env.DISCORD_EMOJI_FAIL + ' The player you have specified is not real.');
    return m.delete({ timeout: 5000 });
  }
  let json = await uuidRes.json();
  msg.delete({ reason: 'valid report command usage' });

  let blacklistedPlayer = await r.table('blacklisted_players').get(json.id);
  if (blacklistedPlayer) {
    let m = await msg.channel.send(process.env.DISCORD_EMOJI_FAIL + ' This player is already blacklisted.');
    return m.delete({ timeout: 5000 });
  }

  let unresolvedCasesOnPlayer = await r.table('cases').filter({ subject: { id: json.id }, closed: { closed: false } }).run();
  if (unresolvedCasesOnPlayer.length >= 2) {
    let m = await msg.channel.send(process.env.DISCORD_EMOJI_FAIL + ' There are already pending reports on this player.');
    return m.delete({ timeout: 5000 });
  }

  let id = (await r.table('cases').count()) + 1;
  await r.table('cases').insert({
    id,
    type: 'REPORT',
    at: Date.now(),
    subject: {
      name: json.name,
      id: json.id
    },
    reason: args.slice(1).join(' '),
    message: null,
    submittedBy: {
      id: msg.author.id,
      tag: msg.author.tag
    },
    closed: {
      closed: false,
      at: null,
      by: {
        id: null,
        tag: null
      },
      reason: null
    }
  }).run();

  let channel = client.channels.get(process.env.DISCORD_CHANNEL_REPORTS);
  let embed = new MessageEmbed();

  embed.setTitle(json.name);
  embed.setDescription(`A report was filed for **${json.name}** by **${msg.author.tag}**.\nStaff can use **\`!close ${id} <reason>\`** to close this report.`);
  embed.setColor('GREEN');
  embed.addField('Description', args.slice(1).join(' '), true);
  embed.setThumbnail(`https://visage.surgeplay.com/full/${json.id}?tilt=0`);
  embed.setTimestamp();
  embed.setFooter(`Case #${id}`);

  let reportMessage = await channel.send(embed);

  await r.table('cases').get(id).update({ message: reportMessage.id });

  let m = await msg.channel.send(process.env.DISCORD_EMOJI_SUCCESS);
  return m.delete({ timeout: 5000 });
}

exports.meta = {
  aliases: ['report'],
  ownerOnly: false,
  description: 'Report a player',
  usage: '<player> <evidence + offence>'
}