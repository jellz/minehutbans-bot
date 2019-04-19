exports.run = async (msg, args) => {
  let m = await msg.channel.send('See "How do I use the bot?" in <#568784397592035348>');
}

exports.meta = {
  aliases: ['help', 'ahh'],
  ownerOnly: false,
  description: 'Help?!',
  usage: ''
}