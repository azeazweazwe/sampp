const { Client, Discord } = require('discord.js')
const { MessageEmbed } = require("discord.js")
const SAMP = require('samp-query');
const color = "color id"
const options = {
    host: 'IP'
}


const client = new Client({
    disableEveryone: true
})

client.once('ready', () => {
    client.user.setActivity('PoWeer' , ({type: "LISTENING"}))
    console.log('Ready!');

const autoupdate = client.channels.cache.get('Channel'); 
autoupdate.bulkDelete(50)
 .catch(err => console.log(err))

 let statsMessage;
        let embed1;
        let embed2;
        let embed3;
        let deleted = false;
        let testVal = 0;
        let sampUpdater = setInterval(() => {
            SAMP(options, function (error, response) {
                if(error)
                    console.log(error)
                else 
                {
                    let dt = new Date();
                    let embed = new MessageEmbed()
                    .setColor(color)
                    .setAuthor('Text..', 'PNG')
                    .setThumbnail('PNG')
                    .addField('Server:', response.hostname)
                    .addField('Online players:', response.online, true)
                    .addField('Last statistics update:', dt.toUTCString(), true);
                    let embed50 = new MessageEmbed()
                        .setColor(color)
                        .setDescription(`Players: 0-25`);
                    let embed75 = new MessageEmbed()
                        .setColor(color)
                        .setDescription(`Players: 25-50`);
                    let embed100 = new MessageEmbed()
                        .setColor(color)
                        .setDescription(`Players: 50-75`);
        
                    if(!statsMessage)
                    {
                        statsMessage = autoupdate.send({embed});
                        embed1 = autoupdate.send(embed50);
                        embed2 = autoupdate.send(embed75);
                        embed3 = autoupdate.send(embed100);
                    }
                    else if(!deleted)
                    {
                        function deleteAllEmbeds()
                        {
                            deleted = true;
                            statsMessage
                                .then( (msg) => {
                                    if(msg.channel.messages.cache.some(_msg => _msg.id == msg.id))
                                        msg.delete();
                                    
                                    statsMessage = false;
                                })
                                .catch(err => console.log(err));
                            embed1
                                .then( (msg) => {
                                    if(msg.channel.messages.cache.some(_msg => _msg.id == msg.id))
                                        msg.delete();
                                    
                                    embed1 = false;
                                })
                                .catch(err => console.log(err));
                            embed2
                                .then( (msg) => {
                                    if(msg.channel.messages.cache.some(_msg => _msg.id == msg.id))
                                        msg.delete();
                                    embed2 = false;
                                })
                                .catch(err => console.log(err));
                            embed3
                                .then( (msg) => {
                                    if(msg.channel.messages.cache.some(_msg => _msg.id == msg.id))
                                        msg.delete();
                                    embed3 = false;
                                })
                                .catch(err => console.log(err));
                            
                            clearInterval(sampUpdater);
                        }
                        statsMessage
                            .then( (msg) => {
                                if(msg.channel.messages.cache.some(_msg => _msg.id == msg.id))
                                {
                                    msg.edit(embed);
                                }
                                else
                                {
                                    deleteAllEmbeds();
                                }
                            })
                            .catch(err => console.log(err));
                        
                        testVal = testVal + 1;
                        players = response.players;
                        let foreachCount = 0;
                        tempEmbed1 = new MessageEmbed();
                        tempEmbed1.setColor(color);
                        tempEmbed1.setDescription(`Players`);
                        
                        players.every(player => {
                            if(foreachCount <= 25)
                            {
                                tempEmbed1.addField(player.name + '(' + player.id + ')', `Score: ${player.score}`, true);
                                foreachCount++;
                                return true;
                            }
                            else
                                return false;
                        });
                        
                        embed1
                            .then( (msg) => {
                                if(!deleted)
                                {
                                    if(msg.channel.messages.cache.some(_msg => _msg.id == msg.id))
                                    {
                                        msg.edit(tempEmbed1);
                                    }
                                    else
                                    {
                                        deleteAllEmbeds();
                                    }
                                }
                            })
                            .catch(err => console.log(err));
                        tempEmbed2 = new MessageEmbed();
                        tempEmbed2.setColor(color);
                        tempEmbed2.setDescription(`----------`);
                        
                        foreachCount = 0;
                        if(players.length > 25)
                        {
                            tempEmbed2.setDescription(` `);
                            players.every(player => {
                                if(foreachCount >= 25 && foreachCount <= 50)
                                {
                                    tempEmbed2.addField(player.name + '(' + player.id + ')', `Score: ${player.score}`, true);
                                    foreachCount++;
                                    return true;
                                }
                                else
                                {
                                    if(foreachCount <= 25)
                                    {
                                        foreachCount++;
                                        return true;
                                    }
                                    else
                                        return false;
                                }
                            });
                        }
                        embed2
                            .then( (msg) => {
                                if(!deleted)
                                {
                                    if(msg.channel.messages.cache.some(_msg => _msg.id == msg.id))
                                    {
                                        msg.edit(tempEmbed2);
                                    }
                                    else
                                    {
                                        deleteAllEmbeds();
                                    }
                                }
                            })
                            .catch(err => console.log(err));
                        tempEmbed3 = new MessageEmbed();
                        tempEmbed3.setColor(color);
                        tempEmbed3.setDescription(`----------\n\n\n\n\ By. **! PoWeer#9999**`);
                        foreachCount = 0;
                        if(players.length > 50)
                        {
                            tempEmbed3.setDescription(` `);
                            players.every(player => {
                                if(foreachCount >= 50 && foreachCount <= 75)
                                {
                                    tempEmbed3.addField(player.name + '(' + player.id + ')', `Score: ${player.score}`, true);
                                    foreachCount++;
                                    return true;
                                }
                                else
                                {
                                    if(foreachCount <= 50)
                                    {
                                        foreachCount++;
                                        return true;
                                    }
                                    else
                                        return false;
                                }
                            });
                        }
                        embed3
                            .then( (msg) => {
                                if(!deleted)
                                    {
                                    if(msg.channel.messages.cache.some(_msg => _msg.id == msg.id))
                                    {
                                        msg.edit(tempEmbed3);
                                    }
                                    else
                                    {
                                        deleteAllEmbeds();
                                    }
                                }
                            })
                            .catch(err => console.log(err));
                    }
                }
            })
        }, 15000);
});

client.login("token")