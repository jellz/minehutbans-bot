module.exports = async () => {
  console.log('Logged in as ' + client.user.tag + '!');
  require('../modules/reminderModule.js')();
}
