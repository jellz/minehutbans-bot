const fetch = require('node-fetch');

exports.run = async (msg, args) => {
  if (!msg.member.roles.some(r => r.id == client.config.roles.staff)) return;
  if (!args[0] || args[0].length > 36 || args[0].length < 32) return await client.invalidCommandUsage(msg, meta);
  let res = await fetch(`https://api.minehutbans.xyz/api/blacklisted_players/${args[0]}?access=${client.config.accessToken}`, {
    method: 'DELETE'
  });
  let json = await res.json();
  if (!json.ok) {
    let m = await msg.channel.send(`**ERROR**: \`${json.errors[0]}\``);
  } else {
    let m = await msg.channel.send(':ok_hand:');
    await client.channels.get('499912390125682691').send(
      `**${msg.author.tag}** un-blacklisted **\`${args[0]}\`**`
    );
  }
}

exports.meta = {
  aliases: ['unblacklist', 'unbl', 'remove'],
  ownerOnly: false,
  description: 'Unblacklist a uuid',
  usage: '<uuid>'
}