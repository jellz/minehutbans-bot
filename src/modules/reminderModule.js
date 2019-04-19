module.exports = async (msg) => {
  setInterval(async () => {
    if (process.env.MS_REMINDER_INTERVAL == -1) return;
    let unresolved = await r.table('cases').filter({ closed: { closed: false } }).run();
    if (unresolved.length < 1) return;
    let channel = client.channels.get(process.env.DISCORD_CHANNEL_REPORTS);
    channel.send(`⚠ This is a courtesy reminder for <@&${process.env.DISCORD_ROLE_STAFF}>; cases ${unresolved.map(c => `**${c.id}**`).join(', ')} are unresolved.`);
  }, process.env.MS_REMINDER_INTERVAL);
}