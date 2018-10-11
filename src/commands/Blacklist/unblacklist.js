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
    let m = await msg.channel.send(`**ERROR**: \`${json.errors[0]}\``);
    m.delete({ timeout: 10000 });
    msg.delete();
  } else {
    let m = await msg.channel.send(':ok_hand:');
    m.delete({ timeout: 10000 });
    msg.delete();
  }
}

const meta = module.exports.meta = {
  aliases: ['unblacklist', 'unbl', 'remove'],
  ownerOnly: false,
  description: 'Unblacklist a uuid',
  usage: '<uuid>'
}