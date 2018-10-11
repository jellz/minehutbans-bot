const run = module.exports.run = async (msg, args) => {
  if (!msg.member.roles.some(r => r.id == client.config.roles.staff)) return;
  if (args.length < 2) return await client.invalidCommandUsage(msg, meta);
  let $case = await r.table('cases').get(parseInt(args[0], 10)).run();
  if (!$case) return msg.channel.send('🚫 invalid case ID');
  if ($case.closed.closed) return msg.channel.send('🚫 this case has already been resolved');
  let closeReason = args.slice(1).join(' ');
  $case.closed.closed = true;
  $case.closed.at = Date.now();
  $case.closed.by = { id: msg.author.id, tag: msg.author.tag };
  $case.closed.reason = closeReason;
  await r.table('cases').get(parseInt(args[0], 10)).update($case).run();
  let message = client.channels.get(client.config.channels.report).messages.get($case.message);
  let embed = message.embeds[0];
  if ($case.type == 'REPORT') {
    embed.setDescription(`A report was filed for **${$case.subject}** by **${$case.submittedBy.tag}**.\nThis report was marked as resolved by ${msg.author.tag} at ${Date()}.`);
    embed.setColor('0xffffff');
    embed.addField('Resolve reason', closeReason, true);
    message.edit({ embed: embed });
    msg.channel.send(client.config.emoji.success);
  }
  let submittedBy = client.users.get($case.submittedBy.id);
  try {
    submittedBy.send(`${client.config.emoji.success} Your case, **#${$case.id}** (${$case.type}: ${$case.subject}), was marked as resolved by ${msg.author.tag}, with reason \`${closeReason}\`.`);
  } catch (err) { }
}

const meta = module.exports.meta = {
  aliases: ['close', 'resolve'],
  ownerOnly: false,
  description: 'Close a case',
  usage: '<id> <reason>'
}