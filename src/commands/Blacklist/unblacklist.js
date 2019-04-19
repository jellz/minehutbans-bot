const fetch = require('node-fetch');

exports.run = async (msg, args) => {
  if (!msg.member.roles.some(r => r.id == process.env.DISCORD_ROLE_STAFF)) return;
  if (!args[0] || args[0].length > 36 || args[0].length < 32) return await client.invalidCommandUsage(msg, exports.meta);
  let res = await fetch(`${process.env.API_BASE}/api/blacklisted_players/${args[0]}?access=${process.env.ACCESS_TOKEN}`, {
    method: 'DELETE'
  });
  let json = await res.json();
  if (!json.ok) {
    let m = await msg.channel.send(`**ERROR**: \`${json.error}\``);
  } else {
    let m = await msg.channel.send(':ok_hand:');
    await client.channels.get(process.env.DISCORD_CHANNEL_LOG).send(
      `**${msg.author.tag}** unblacklisted **\`${args[0]}\`**`
    );
  }
}

exports.meta = {
  aliases: ['unblacklist', 'unbl', 'remove'],
  ownerOnly: false,
  description: 'Unblacklist a uuid',
  usage: '<player\'s uuid>'
}