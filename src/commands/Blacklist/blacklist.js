const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

const run = module.exports.run = async (msg, args) => {
  if (!msg.member.roles.some(r => r.id == client.config.roles.staff)) return;
  if (!args[0] || !args[1] || args[0].length > 16) return await client.invalidCommandUsage(msg, meta);
  let res = await fetch('https://api.minehutbans.xyz/api/blacklisted_players?access=' + client.config.accessToken, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: args[0],
        reason: args.slice(1).join(' ')
    })
  });
  let json = await res.json();
  if (!json.ok) {
    msg.channel.send(`**ERROR**: \`${json.errors[0]}\``);
  } else {
    msg.channel.send(':ok_hand:');
  }
}

const meta = module.exports.meta = {
  aliases: ['blacklist', 'bl', 'add'],
  ownerOnly: false,
  description: 'Blacklist a player',
  usage: '<player> <reason + evidence>'
}