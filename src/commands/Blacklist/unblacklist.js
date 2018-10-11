const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

const run = module.exports.run = async (msg, args) => {
  if (!msg.member.roles.some(r => r.id == client.config.roles.staff)) return;
  if (!args[0] || args[0].length > 36 || args[0].length < 32) return await client.invalidCommandUsage(msg, meta);
  let res = await fetch(`https://api.minehutbans.xyz/api/blacklisted_players/${args[0]}?access=${client.config.accessToken}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  let json = await res.json();
  if (!json.ok) {
    msg.channel.send(`**ERROR**: \`${json.errors[0]}\``);
  } else {
    msg.channel.send(':ok_hand:');
  }
}

const meta = module.exports.meta = {
  aliases: ['unblacklist', 'unbl', 'remove'],
  ownerOnly: false,
  description: 'Unblacklist a uuid',
  usage: '<uuid>'
}