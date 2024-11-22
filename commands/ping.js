const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Menampilkan sinyal (latensi) dari bot dan API.',
    async execute(message, args, client) {
        const sentMessage = await message.channel.send('Menghitung latensi...');

        // Menghitung latensi dari pesan bot dan API
        const latency = sentMessage.createdTimestamp - message.createdTimestamp;
        const apiLatency = Math.round(client.ws.ping);

        // Membuat embed dengan desain yang lebih rapi dan informatif
        const embed = new EmbedBuilder()
            .setColor('#00b0f4') // Warna biru cerah
            .setTitle('🏓 Pong! Latensi Bot dan API')
            .setDescription('Berikut adalah informasi latensi saat ini:')
            .addFields(
                { name: '⏱️ Latensi Bot', value: `**${latency}ms**`, inline: true },
                { name: '🌐 Latensi API Discord', value: `**${apiLatency}ms**`, inline: true }
            )
            .setFooter({ text: 'Nikmati pengalaman chat Anda! 💖' })
            .setTimestamp()
            .setThumbnail(client.user.avatarURL()) // Thumbnail bot
            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() });

        // Mengirim embed
        await message.channel.send({ embeds: [embed] });
    }
};
