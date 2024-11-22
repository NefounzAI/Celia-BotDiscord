const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Menampilkan avatar pengguna yang disebutkan atau pengirim perintah.',
    async execute(message, args) {
        let user;
        if (args.length === 1 && !isNaN(args[0])) {
            try {
                user = await message.client.users.fetch(args[0]); 
            } catch (error) {
                return message.channel.send('❌ Pengguna tidak ditemukan!');
            }
        } else {
            user = message.mentions.users.first() || message.author;
        }

        const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

        const avatarEmbed = new EmbedBuilder()
            .setColor('#14e9d6')
            .setTitle(`${user.username}'s Avatar`)
            .setDescription(`Berikut adalah avatar dari **${user.username}**.`)
            .setImage(avatarURL)
            .setFooter({ text: `Diminta oleh ${message.author.username}` })
            .setTimestamp();

        message.channel.send({ embeds: [avatarEmbed] });
    },
};
