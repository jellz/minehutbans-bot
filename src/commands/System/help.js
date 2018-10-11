const run = module.exports.run = async (msg, args) => {
  let m = await msg.channel.send('See "How do I use the bot?" in <#499606237521117184>');
  m.delete({ timeout: 5000 });
  msg.delete();
}

const meta = module.exports.meta = {
  aliases: ['help', 'ahh'],
  ownerOnly: false,
  description: 'Help?!',
  usage: ''
}