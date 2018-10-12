const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame(`${client.user.username}`, "https://twitch.tv//9ivv")
    console.log('')
    console.log('')
    console.log('╔[════════════════════════════════════════════════════════════════]╗')
    console.log(`[Start] ${new Date()}`);
    console.log('╚[═════════════════════════════════════════════════════════════════]╝')
    console.log('')
    console.log('╔[════════════════════════════════════]╗');
    console.log(`Logged i as * [ " ${client.user.username} " ]`);
    console.log('')
    console.log('Informatins :')
    console.log('')
    console.log(`servers! [ " ${client.guilds.size} " ]`);
    console.log(`Users! [ " ${client.users.size} " ]`);
    console.log(`channels! [ " ${client.channels.size} " ]`);
    console.log('╚[════════════════════════════════════]╝')
    console.log('')
    console.log('╔[════════════]╗')
    console.log(' Bot Is Online')
    console.log('╚[════════════]╝')
    console.log('')
    console.log('')
  });



client.on('message', message => {
    let prefix = "-";
    if(message.content.startsWith(prefix + 'new')) {
        let args = message.content.split(' ').slice(1).join(' ');
        var support = message.guild.roles.find("name", "Support Team");
        if(!support) {
            return message.channel.send('**يرجى وجود رتبة `Support Team`**');
        }
        if(args) {
            message.guild.createChannel(`ticket-${message.author.username}`, 'text').then(ticket => {
                ticket.setParent(message.guild.channels.find(a => a.name === 'TICKETS'));
                    let embed = new Discord.RichEmbed()
                        .setTitle('New Ticket.')
                        .addField('Subject:', `${args}`)
                        .addField('Author:', `<@${message.author.id}>`)
                        .addField('Channel:', `${message.channel.name}`)
                        .setColor('#FFD700')
                        .setFooter('United.');

                        ticket.sendEmbed(embed) .then(
                            message.channel.send(`**Your ticket has been successfully created. :white_check_mark: [ ${ticket} ]**`) .then(
                                ticket.overwritePermissions(message.guild.id, {
                                    READ_MESSAGES: false
                                }) .then(ticket.overwritePermissions(message.author.id, {
                                    SEND_MESSAGES: true,
                                    READ_MESSAGES: true
                                })) .then(ticket.overwritePermissions(support.id, {
                                    SEND_MESSAGES: true,
                                    READ_MESSAGES: true
                                }))
                            

                            )
                        )


                        
            })

        } else {
            return message.channel.send('**.يرجى وضع عنوان للتيكت قبل فتحه :ok_hand: **');
        }

    }
});


client.on('message', message => {
    let prefix = '-';
    if (message.content.startsWith(prefix + "close")) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`لا يمكنك استخدام أمر الإغلاق خارج التذاكر.`)
       message.channel.send(`هل أنت متأكد؟ بمجرد تأكيد ، لا يمكنك عكس هذا الإجراء! \ للتأكيد ، اكتب \ "-close \`. سوف ينتهي المهلة خلال 20 ثوانٍ ويتم إلغاؤها.`)
           .then((m) => {
               message.channel.awaitMessages(response => response.content === '-close', {
                       max: 1,
                       time: 20000,
                       errors: ['time'],
                   .then((collected) => {
                       message.channel.delete();
                   .catch(() => {
                       m.edit('انتهى إغلاق التذاكر ، لم يتم إغلاق التذكرة.').then(m2 => {
                           m2.delete();
                       }, 3000);
                   });
           });
   }
 
});




client.login(process.env.BOT_TOKEN);
