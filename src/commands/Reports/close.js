exports.run = async (msg, args) => {
  if (!msg.member.roles.some(r => r.id == process.env.DISCORD_ROLE_STAFF)) return;
  if (args.length < 2) return await client.invalidCommandUsage(msg, exports.meta);
  let $case = await r.table('cases').get(parseInt(args[0], 10)).run();
  if (!$case) return msg.channel.send('🚫 invalid case ID');
  if ($case.closed.closed) return msg.channel.send('🚫 this case has already been resolved');
  let closeReason = args.slice(1).join(' ');
  $case.closed.closed = true;
  $case.closed.at = Date.now();
  $case.closed.by = { id: msg.author.id, tag: msg.author.tag };
  $case.closed.reason = closeReason;
  await r.table('cases').get(parseInt(args[0], 10)).update($case).run();
  let message = client.channels.get(process.env.DISCORD_CHANNEL_REPORTS).messages.get($case.message);
  message.delete('Case closed');
  let submittedBy = client.users.get($case.submittedBy.id);
  try {
    submittedBy.send(`${process.env.DISCORD_EMOJI_SUCCESS} Your case, **#${$case.id}** (${$case.type}: ${$case.subject}), was closed by ${msg.author.tag}, with reason \`${closeReason}\`.`);
  } catch (err) { throw err; }
  await msg.channel.send(`:ok_hand: closed **#${$case.id}**`);
}

exports.meta = {
  aliases: ['close', 'resolve'],
  ownerOnly: false,
  description: 'Close a case',
  usage: '<id> <reason>'
}
