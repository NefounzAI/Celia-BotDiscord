const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Displays the avatar of the mentioned user or the command sender.',
    execute(message, args) {
        const user = message.mentions.users.first() || message.author;
        const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

        const avatarEmbed = new EmbedBuilder()
            .setColor('#14e9d6') 
            .setTitle(`${user.username} Avatar`)
            .setImage(avatarURL) 
            .setFooter({ text: `Requested by ${message.author.username}` })
            .setTimestamp();

        message.channel.send({ embeds: [avatarEmbed] });
    }
};
