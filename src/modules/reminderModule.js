const run = module.exports = async (msg) => {
  setInterval(async () => {
    if (client.config.reminder.interval == -1) return;
    let unresolved = await r.table('cases').filter({ closed: { closed: false } }).run();
    if (unresolved.length < 1) return;
    let channel = client.channels.get(client.config.channels.report);
    channel.send(`⚠ This is a courtesy reminder for <@&${client.config.roles.staff}>; cases ${unresolved.map(c => `**${c.id}**`).join(', ')} are unresolved.`);
  }, client.config.reminder.interval);
}